import archiveImg1 from '../assets/images/archiveimg1.png';
import archiveImg2 from '../assets/images/archiveimg2.png';
import archiveImg3 from '../assets/images/archiveimg3.png';
import archive4 from '../assets/images/archive4.png';

export interface ArchivePhoto {
  id: string;
  number: string;
  label: string;
  sublabel: string;
  image: string;
}

export const ARCHIVE_2025: ArchivePhoto[] = [
  {
    id: '01',
    number: '01',
    label: 'ARCHIVE 01',
    sublabel: 'CYBER SYMPHONY 2025',
    image: archiveImg1,
  },
  {
    id: '02',
    number: '02',
    label: 'ARCHIVE 02',
    sublabel: 'CYBER SYMPHONY 2025',
    image: archiveImg2,
  },
  {
    id: '03',
    number: '03',
    label: 'ARCHIVE 03',
    sublabel: 'TWISTTRIADS · 2025',
    image: archiveImg3,
  },
  {
    id: '04',
    number: '04',
    label: 'ARCHIVE 04',
    sublabel: 'CYBER SYMPHONY 2025',
    image: archive4,
  },
];
