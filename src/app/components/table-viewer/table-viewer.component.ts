import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SongPlatform } from 'chelys';
import { DataManagerService, DataSong } from 'src/app/services/data-manager.service';

const COLUMNS_ORDER = ["id", "title", "author", "user", "cstName", "date", "platform", "url"];

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.scss']
})
export class TableViewerComponent implements AfterViewInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<DataSong>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dataManager: DataManagerService) {
    this.displayedColumns = COLUMNS_ORDER;

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataManager.songs);
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

  platformToString(platform: SongPlatform): string {
    switch (platform) {
      case SongPlatform.YOUTUBE:
        return "Youtube"
    
      default:
        return "Unknown"
    }
  }
}
