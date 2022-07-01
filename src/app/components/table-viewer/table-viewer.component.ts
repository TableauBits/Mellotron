import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SongPlatform } from 'chelys';
import { DEFAULT_COLUMNS_ORDER, LocalStorageKey } from 'src/app/constants/local-storage';
import { DataManagerService, DataSong } from 'src/app/services/data-manager.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-table-viewer',
  templateUrl: './table-viewer.component.html',
  styleUrls: ['./table-viewer.component.scss']
})
export class TableViewerComponent implements AfterViewInit {

  displayedColumns: string[];
  dataSource: MatTableDataSource<DataSong>;

  selectedColumns: FormControl;
  selectedColumnsList: string[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dataManager: DataManagerService,
    public localStorage: LocalStorageService
  ) {
    this.displayedColumns = JSON.parse(this.localStorage.get(LocalStorageKey.TABLE_COLUMN_ORDER))

    this.selectedColumnsList = DEFAULT_COLUMNS_ORDER;
    this.selectedColumns = new FormControl('');
    this.selectedColumns.setValue(this.selectedColumnsList);
    

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataManager.songs);
  }

  ngAfterViewInit() {
    // Data Source
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Paginator
    const localPageSize = Number(this.localStorage.get(LocalStorageKey.TABLE_PAGE_SIZE_KEY));
    this.paginator._changePageSize(localPageSize);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  platformToString(platform: SongPlatform): string {
    switch (platform) {
      case SongPlatform.YOUTUBE:
        return "Youtube";

      default:
        return "Unknown";
    }
  }

  updateSelection(): void {
    this.displayedColumns = this.selectedColumns.value;

    // this.dataSource.filterPredicate = function(row: DataSong, filter: string): boolean {
    //   return false;
    // }
  }

  updatePageSize(event: PageEvent) {
    this.localStorage.set(LocalStorageKey.TABLE_PAGE_SIZE_KEY, event.pageSize.toString());
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this.localStorage.set(LocalStorageKey.TABLE_COLUMN_ORDER, JSON.stringify(this.displayedColumns));
  }

}
