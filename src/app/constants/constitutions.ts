// To add a new constitution :
// 1. Create the JSON file in assets/constitutions
// 2. Import the data in JSON in this file
// 3. Add the imported object in ALL_CONSTITUIONS_DATA

import { Song } from 'chelys';
import X7 from '../../assets/constitutions/X7.json';

export type DataConstitution = {
  cstName: string;
  date: string;
  songs: Song[];
}

// Legend :
//  * C ==> Constitution
//  * X ==> Xenocratie

export const ALL_CONSTITUTIONS_DATA: DataConstitution[] = [X7]
