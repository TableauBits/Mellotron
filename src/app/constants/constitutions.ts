// To add a new constitution :
// 1. Create the JSON file in assets/constitutions
// 2. Import the data in JSON in this file
// 3. Add the imported object in ALL_CONSTITUIONS_DATA

import { Song } from 'chelys';
import C1 from '../../assets/constitutions/C1.json';
import C2 from '../../assets/constitutions/C2.json';
import C3 from '../../assets/constitutions/C3.json';
import C4 from '../../assets/constitutions/C4.json';
import C5 from '../../assets/constitutions/C5.json';
import C6 from '../../assets/constitutions/C6.json';
import C7 from '../../assets/constitutions/C7.json';
import C8 from '../../assets/constitutions/C8.json';
import C9 from '../../assets/constitutions/C9.json';
import C10 from '../../assets/constitutions/C10.json';
import X1 from '../../assets/constitutions/X1.json';
import X2 from '../../assets/constitutions/X2.json';
import X3 from '../../assets/constitutions/X3.json';
import X4 from '../../assets/constitutions/X4.json';
import X5 from '../../assets/constitutions/X5.json';
import X6 from '../../assets/constitutions/X6.json';
import X7 from '../../assets/constitutions/X7.json';
import X8 from '../../assets/constitutions/X8.json';
import XM from '../../assets/constitutions/XM.json';
import X9 from '../../assets/constitutions/X9.json';
import X10 from '../../assets/constitutions/X10.json';
import XM2 from '../../assets/constitutions/XM2.json';
import X11 from '../../assets/constitutions/X11.json';
import X12 from '../../assets/constitutions/X12.json';
import X13 from '../../assets/constitutions/X13.json';
import X14 from '../../assets/constitutions/X14.json';

export type DataConstitution = {
  cstName: string;
  date: string;
  songs: Song[];
  winner: number;
}

// Legend :
//  * C   ==> Constitution
//  * X   ==> Xenocratie
//  * XM  ==> Xenocratie (Mini)

export const ALL_CONSTITUTIONS_DATA: DataConstitution[] = [
  C1, C2, C3, C4, C5, C6, C7, C8, C9, C10,
  X1, X2, X3, X4, X5, X6, X7, X8, X9, X10, X11, X12, X13, X14,
  XM, XM2
]
