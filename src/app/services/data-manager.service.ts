import { Injectable } from '@angular/core';
import { EMPTY_SONG, Song, SongPlatform } from 'chelys';
import { ALL_CONSTITUTIONS_DATA, DataConstitution } from '../constants/constitutions';
import names from '../../assets/names.json'

export interface DataSong extends Song {
  cstName: string;
  date: string;
  isWinner: boolean;
}

export const EMPTY_DATA_SONG: DataSong = {
  ...EMPTY_SONG,
  cstName: "",
  date: "",
  isWinner: false,
}

function sortConstitutionByDateASC(c1: DataConstitution, c2: DataConstitution): number {
  if (c1.date < c2.date) return -1;
  if (c1.date > c2.date) return 1;
  return 0;
}

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  constitutions: DataConstitution[];
  songs: DataSong[];
  uidToName: Record<string, string>;

  constructor() {
    this.constitutions = ALL_CONSTITUTIONS_DATA;
    this.songs = [];
    this.uidToName = names;

    this.init();
  }

  private init() {
    // Sort constitutions by date, the oldest first
    this.constitutions.sort(sortConstitutionByDateASC);

    // Song counter (also generate unique id)
    let i = 0;

    // Add all the songs in the array
    this.constitutions.forEach((constitution) => {
      this.songs = this.songs.concat(constitution.songs.map((song) => {
        i++;
        return {
          ...song,
          id: i,
          cstName: constitution.cstName,
          date: new Date(constitution.date).toISOString().slice(0, 10),
          isWinner: constitution.winner === song.id,
          user: this.uidToName[song.user] || "Utilisateur Inconnu",
        }
      }));
    })

    // Display most recent songs first
    this.songs.reverse();
  }
}
