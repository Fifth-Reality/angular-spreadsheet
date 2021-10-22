import { Component, Input, OnInit } from '@angular/core';

// import sample data
import { sampleData } from '../data/sampleData';
import { sampleLookups } from '../data/sampleLookups';
import { sampleColumnConfig } from '../data/sampleColumns';
import { sampleConfig } from '../data/sampleConfig';





@Component({
  selector: 'excel-sheet-v3',
  templateUrl: './sheet.component.html',
  styleUrls: ['../style/sheet.scss']
})
export class SheetV3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // init columns
    this.setupColumns()

  }
  // region lesson00
  // input properties
  
  @Input() data :any = sampleData;
  @Input() lookups:any = sampleLookups;
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

  // region lesson02

  currentRow:number= -1
  currentCol:number= -1

  isCellEdit(i: number, j: number) {
    return i == this.currentRow && j == this.currentCol
  }

  selectSingleCell(i: number, j: number) {
      this.currentRow=i      
      this.currentCol =j
  }

  getDropdown(column:any) {
    
    return this.lookups [column.lookup];
  }

  isDropdown(column:any) {

    return false;
  }


  getDisplayValue(column:any, v:any) {

    if (this.isDropdown(column)) {

      let dd = this.getDropdown(column);
      if (dd) {        
        return dd[v] || v;
      }
    }
    else {
      return v
    }
  }

  onKeyEvent($event:KeyboardEvent, src = '',type='') {

  }
  //endregion lesson02

}
