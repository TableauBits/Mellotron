import { Component } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-help-window',
  templateUrl: './help-window.component.html',
  styleUrls: ['./help-window.component.scss']
})
export class HelpWindowComponent {

  constructor(public localStorage: LocalStorageService) { }

  resetLocalStorage(): void {
    this.localStorage.reset();
    window.location.reload();
  }

}
