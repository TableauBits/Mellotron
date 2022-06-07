import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataManagerService } from 'src/app/services/data-manager.service';

export interface User {
  name: string
}

export interface Constitution {
  name: string
}

export interface Song {
  name: string;
  artist: string;
  addedby: User;
  constitution: Constitution;
}

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.scss']
})
export class TableViewerComponent implements AfterViewInit {

  displayedColumns: string[] = ['title', 'author', 'user', 'constitution'];
  dataSource: MatTableDataSource<Song>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataManager: DataManagerService) {
    const users: Song[] = [
      {
        name: 'A',
        artist: 'B',
        addedby: {
          name: 'C'
        },
        constitution: {
          name: 'D'
        }
      }
    ]

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
