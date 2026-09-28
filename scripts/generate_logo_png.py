import struct
import zlib
import math

def generate_png():
    width = 1000
    height = 1000
    
    # We will sample each pixel (with 2x supersampling for ultra smooth anti-aliased edges)
    # Colors: gradient from (0, 196, 255) at y=55 to (60, 26, 153) at y=985
    def get_color(y):
        t = max(0.0, min(1.0, (y - 55.0) / (985.0 - 55.0)))
        # Multi-stop gradient:
        # 0.0:  #00C4FF -> (0, 196, 255)
        # 0.28: #009BF5 -> (0, 155, 245)
        # 0.55: #1B60E0 -> (27, 96, 224)
        # 0.80: #283BC2 -> (40, 59, 194)
        # 1.0:  #3C1A99 -> (60, 26, 153)
        stops = [
            (0.00, (0, 196, 255)),
            (0.28, (0, 155, 245)),
            (0.55, (27, 96, 224)),
            (0.80, (40, 59, 194)),
            (1.00, (60, 26, 153))
        ]
        for i in range(len(stops) - 1):
            s0, c0 = stops[i]
            s1, c1 = stops[i+1]
            if s0 <= t <= s1:
                factor = (t - s0) / (s1 - s0)
                r = int(c0[0] + factor * (c1[0] - c0[0]))
                g = int(c0[1] + factor * (c1[1] - c0[1]))
                b = int(c0[2] + factor * (c1[2] - c0[2]))
                return (r, g, b)
        return (60, 26, 153)

    # Polygons:
    # 1. Top bar: [152, 55] to [848, 165]
    def in_top_bar(x, y):
        return 152 <= x <= 848 and 55 <= y <= 165

    # Point in polygon test (ray casting)
    def point_in_poly(x, y, poly):
        n = len(poly)
        inside = False
        p1x, p1y = poly[0]
        for i in range(n + 1):
            p2x, p2y = poly[i % n]
            if y > min(p1y, p2y):
                if y <= max(p1y, p2y):
                    if x <= max(p1x, p2x):
                        if p1y != p2y:
                            xinters = (y - p1y) * (p2x - p1x) / (p2y - p1y) + p1x
                        if p1x == p2x or x <= xinters:
                            inside = not inside
            p1x, p1y = p2x, p2y
        return inside

    poly_c = [
        (152, 200),
        (484, 200),
        (484, 470),
        (384, 425),
        (384, 310),
        (298, 310),
        (298, 630),
        (384, 670),
        (484, 625),
        (484, 985),
        (152, 755)
    ]

    poly_s = [
        (516, 200),
        (848, 200),
        (848, 405),
        (624, 405),
        (742, 465),
        (848, 520),
        (848, 755),
        (516, 985),
        (516, 565),
        (722, 465),
        (620, 412),
        (516, 412)
    ]

    raw_data = bytearray()
    for y in range(height):
        raw_data.append(0) # filter type 0 (None)
        c = get_color(y)
        for x in range(width):
            # 2x2 subpixel sampling for smooth anti-aliased vector look
            samples = 0
            for sy in (0.25, 0.75):
                for sx in (0.25, 0.75):
                    px = x + sx
                    py = y + sy
                    if in_top_bar(px, py) or point_in_poly(px, py, poly_c) or point_in_poly(px, py, poly_s):
                        samples += 1
            if samples > 0:
                alpha = int((samples / 4.0) * 255)
                raw_data.extend([c[0], c[1], c[2], alpha])
            else:
                raw_data.extend([0, 0, 0, 0])

    # Construct PNG binary
    def make_chunk(chunk_type, data):
        return struct.pack('>I', len(data)) + chunk_type + data + struct.pack('>I', zlib.crc32(chunk_type + data) & 0xffffffff)

    png_header = b'\x89PNG\r\n\x1a\n'
    ihdr_data = struct.pack('>IIBBBBB', width, height, 8, 6, 0, 0, 0)
    ihdr_chunk = make_chunk(b'IHDR', ihdr_data)
    idat_chunk = make_chunk(b'IDAT', zlib.compress(bytes(raw_data), 9))
    iend_chunk = make_chunk(b'IEND', b'')

    png_bytes = png_header + ihdr_chunk + idat_chunk + iend_chunk

    with open('/public/assets/cyber-symphony-logo.png', 'wb') as f:
        f.write(png_bytes)
    print("PNG generated successfully: /public/assets/cyber-symphony-logo.png")

if __name__ == '__main__':
    generate_png()
