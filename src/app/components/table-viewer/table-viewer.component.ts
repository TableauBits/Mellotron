import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatPaginatorIntl, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SongPlatform } from 'chelys';
import { LocalStorageKey } from 'src/app/constants/local-storage';
import { COLUMN_NAMES_MAP, DEFAULT_COLUMNS_ORDER, filterPredicateFunction, getRangeLabel } from 'src/app/constants/table';
import { DataManagerService, DataSong } from 'src/app/services/data-manager.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { HelpWindowComponent } from '../help-window/help-window.component';

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
    public localStorage: LocalStorageService,
    private dialog: MatDialog,
    private paginatorIntl: MatPaginatorIntl
  ) {
    this.paginatorIntl.itemsPerPageLabel = "Nombre de chansons par page:"
    this.paginatorIntl.getRangeLabel = getRangeLabel;

    const localColumnOrder = JSON.parse(this.localStorage.get(LocalStorageKey.TABLE_COLUMN_ORDER)) as string[];
    const localDisplayedColumns = JSON.parse(this.localStorage.get(LocalStorageKey.TABLE_DISPLAYED_COLUMNS)) as string[];

    this.displayedColumns = localColumnOrder.filter((column) => localDisplayedColumns.includes(column))

    this.selectedColumnsList = DEFAULT_COLUMNS_ORDER;
    this.selectedColumns = new FormControl('');
    this.selectedColumns.setValue(localDisplayedColumns);

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(dataManager.songs);

    this.dataSource.filterPredicate = filterPredicateFunction(this.displayedColumns);
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
      case SongPlatform.YOUTUBE: return "Youtube";
      case SongPlatform.SOUNDCLOUD: return "Soundcloud";
      case SongPlatform.PEERTUBE: return "Peertube";
      default: return "Inconnu";
    }
  }

  updateSelection(): void {
    const typedValue = this.selectedColumns.value as string[];
    const currentOrder = JSON.parse(this.localStorage.get(LocalStorageKey.TABLE_COLUMN_ORDER)) as string[];

    this.displayedColumns = currentOrder.filter((column) => typedValue.includes(column));
    this.dataSource.filterPredicate = filterPredicateFunction(this.displayedColumns);
    this.localStorage.set(LocalStorageKey.TABLE_DISPLAYED_COLUMNS, JSON.stringify(this.displayedColumns));
  }

  updatePageSize(event: PageEvent) {
    this.localStorage.set(LocalStorageKey.TABLE_PAGE_SIZE_KEY, event.pageSize.toString());
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
    this.localStorage.set(LocalStorageKey.TABLE_COLUMN_ORDER, JSON.stringify(this.displayedColumns));
  }

  canDrag(): boolean {
    return this.displayedColumns.length === DEFAULT_COLUMNS_ORDER.length;
  }

  toColumnName(name: string): string {
    return COLUMN_NAMES_MAP[name] || "";
  }

  openHelpWindow(): void {
    this.dialog.open(HelpWindowComponent);
  }

}
