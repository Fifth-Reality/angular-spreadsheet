import { Component, Input, OnInit } from '@angular/core';

// import sample data
import { sampleData } from '../data/sampleData';
import { sampleLookups } from '../data/sampleLookups';
import { sampleColumnConfig } from '../data/sampleColumns';
import { sampleConfig } from '../data/sampleConfig';





@Component({
  selector: 'excel-sheet-v1',
  templateUrl: './sheet.component.html',
  styleUrls: ['../style/sheet.scss']
})
export class SheetV1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // init columns
    this.setupColumns()

  }
  // region lesson00
  // input properties
  
  @Input() data :any = sampleData;
  @Input() lookups: any;
  @Input() columns: any;
  @Input() config: any;


  // endregion lesson00

  // region lesson00A
  //colNames only in array

  colNames: any = []

  setupColumns() {
    if (!this.data || this.data.length === 0)
      return
    if (this.columns && this.columns.length > 0)
      return
    const item = this.data[0]
    this.columns=[]
    for (const prop in item) {
      const colDef = { name: prop }
      this.columns.push(colDef)
      this.colNames.push(prop)
    }


  }

  displayData() {
    return this.data;
  }

  displayColumns() {
    return this.columns;
  }

  // endregion lesson00A

}
