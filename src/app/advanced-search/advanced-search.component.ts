import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public rules: any = [
    {
      filtered_category: '',
      filtered_value: '',
      filtered_not: false,
    },
  ]

  addRule(event: any) {
    this.rules.push({
      filtered_category: '',
      filtered_value: '',
      filtered_not: false,
    });
  }
  removeRule(event: any) {
    this.rules.splice(event, 1);
  }
}
