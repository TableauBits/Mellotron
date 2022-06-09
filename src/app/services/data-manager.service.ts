import { Injectable } from '@angular/core';
import { EMPTY_SONG, Song } from 'chelys';
import { ALL_CONSTITUTIONS_DATA, DataConstitution } from '../constants/constitutions';

export interface DataSong extends Song {
  constitution: string;
  date: string;
}

export const EMPTY_DATA_SONG: DataSong = {
  ...EMPTY_SONG,
  constitution: "",
  date: ""
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
    // Sort constitutions by date
    this.constitutions = this.constitutions.sort();

    let i = 0;  // Song counter (also generate unique id)

    // Add all the songs in the array
    this.constitutions.forEach((constitution) => {
      this.songs = this.songs.concat(constitution.songs.map((song) => {
        i++;
        return {
          ...song,
          id: i,
          constitution: constitution.cstName,
          date: constitution.date,
        }
      }));
    })
  }
}
