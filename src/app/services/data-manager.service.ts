import { Injectable } from '@angular/core';
import { Song } from 'chelys';
import { ALL_CONSTITUTIONS_DATA, DataConstitution } from '../constants/constitutions';

export interface DataSong extends Song {
  constitution: string;
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constitutions: DataConstitution[];
  songs: DataSong[];

  constructor() {
    this.constitutions = ALL_CONSTITUTIONS_DATA;
    this.songs = [];

    this.init();
  }

  private init() {
    // Add all the songs in the array
    this.constitutions.forEach((constitution) => {
      this.songs = this.songs.concat(constitution.songs.map((song) => {
        return {
          ...song,
          constitution: constitution.cstName,
          date: constitution.date,
        }
      }));
    })
  }
}
