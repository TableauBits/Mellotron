import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SongPlatform } from 'chelys';
import { LocalStorageKey } from 'src/app/constants/local-storage';
import { COLUMN_NAMES_MAP, DEFAULT_COLUMNS_ORDER, NON_FILTER_KEYS } from 'src/app/constants/table';
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

    // From the default implementation of filterPredicate
    this.dataSource.filterPredicate = (data: DataSong, filter: string): boolean => {
      // Transform the data into a lowercase string of all property values.
      const dataStr = Object.keys(data).filter((value) => !NON_FILTER_KEYS.includes(value))
        .reduce((currentTerm: string, key: string) => {
          // Use an obscure Unicode character to delimit the words in the concatenated string.
          // This avoids matches where the values of two columns combined will match the user's query
          // (e.g. `Flute` and `Stop` will match `Test`). The character is intended to be something
          // that has a very low chance of being typed in by somebody in a text field. This one in
          // particular is "White up-pointing triangle with dot" from
          // https://en.wikipedia.org/wiki/List_of_Unicode_characters
          return currentTerm + (data as {[key: string]: any})[key] + '◬';
        }, '')
        .toLowerCase();
  
      // Transform the filter by converting it to lowercase and removing whitespace.
      const transformedFilter = filter.trim().toLowerCase();
  
      return dataStr.indexOf(transformedFilter) != -1;
    };
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

  toColumnName(name: string): string {
    return COLUMN_NAMES_MAP[name] || "";
  }

}
