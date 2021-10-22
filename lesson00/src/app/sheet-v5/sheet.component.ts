import { Component, Input, OnInit } from '@angular/core';

// import sample data
import { sampleData } from '../data/sampleData';
import { sampleLookups } from '../data/sampleLookups';
import { sampleColumnConfig } from '../data/sampleColumns';
import { sampleConfig } from '../data/sampleConfig';

@Component({
  selector: 'excel-sheet-v5',
  templateUrl: './sheet.component.html',
  styleUrls: ['../style/sheet.scss']
})
export class SheetV5Component implements OnInit {

  constructor() { }
  /** ngOnInit() - called before render*/
  ngOnInit(): void {
    // init columns
   
    for (let i = 0; i < 10; i++) {
      this.data = this.data.concat(sampleData)
    }

    this.setupColumns()

  }
  // region lesson00
  // input properties
  // ** data list input **/
  @Input() data: any = sampleData;
  // ** pass all lookups as "dict of dict"
  @Input() lookups: any = sampleLookups;
  // v3 - passing columns with dropdown 
  @Input() columns: any = sampleColumnConfig;
  // extra config
  @Input() config: any;


  // endregion lesson00

  // region lesson00A
  //colNames only in array

  colNames: any = []
  /** setup columns if columns paramertes are not set based on data */
  setupColumns() {
    if (!this.data || this.data.length === 0)
      return
    if (this.columns && this.columns.length > 0)
      return
    const item = this.data[0]
    this.columns = []
    for (const prop in item) {
      const colDef = { name: prop }
      this.columns.push(colDef)
      this.colNames.push(prop)
    }


  }
  /** return data which can be displayed */
  displayData() {
    return this.data;
  }
  /** */
  displayColumns() {
    return this.columns;
  }

  // endregion lesson00A

  // region lesson02

  currentRow: number = -1
  currentCol: number = -1
  /**
   * 
   * @param i
   * @param j
   */
  isCellEdit(i: number, j: number) {
    return i == this.currentRow && j == this.currentCol
  }
  /**
   * 
   * @param i
   * @param j
   */
  selectSingleCell(i: number, j: number) {
    this.currentRow = i
    this.currentCol = j
  }

  // region dropdown

  /**
 * return column lookup 
 * @param column
 */
  getDropdown(column: any) {
    return this.lookups[column.lookup];
  }


  /**
   * check if the column is dropdow
   * @param column
   */
  isDropdown(column: any) {
    return column.type === 'dropdown' && (!!column.lookup) && this.lookups[column.lookup];
  }

  /**
   * Display the cell value.
   * For dropdown get label from dropdown dict
   * @param column
   * @param val
   */
  getDisplayValue(column: any, val: any) {
    if (this.isDropdown(column)) {
      let dropdown = this.getDropdown(column);
      if (dropdown) {
        return dropdown[val] || val;
      }
    }
    else {
      return val
    }
  }
  // endregion dropdown


  //////////////////////////////////////////////
  ////  Mouse and Selection

  //region mouse selection


  selection = {
    startRow: -1,
    startCol: -1,
    endRow: -1,
    endCol: -1,
    isSelecting: false,
    editing: false
  }
  /**
   * onStartSelection 
   * @param i
   * @param j
   */
  onStartSelection(i:number, j:number) {
    this.selection.startRow = i;
    this.selection.startCol = j;
    this.selection.endRow = i;
    this.selection.endCol = j;
    this.selection.isSelecting = true;

  }
  /**
   * onEndSelection
   * @param i
   * @param j
   */
  onEndSelection(i:number, j:number) {
    if (i > this.selection.startRow) {
      this.selection.endRow = i
    }
    else {
      this.selection.startRow = i
    }

    if (j > this.selection.startCol) {
      this.selection.endCol = j
    }
    else {
      this.selection.startCol = j
    }
    // console.log("selection", this.selection)

  }
  /**
   * Mouse Event Handler - Down
   * @param i
   * @param j
   */
  onDataCellMouseDown(i:number, j:number) {
    this.onStartSelection(i, j)
  }
  /**
   * Mouse Event Handler- Up
   * @param i
   * @param j
   */
  onDataCellMouseUp(i:number, j:number) {
    this.onEndSelection(i, j)

  }

  onDataCellMouseMove(i:number, j:number) {
    const oldRow = this.selection.endRow;
    const oldCol = this.selection.endCol;

    if (this.selection.isSelecting && (oldRow !== i || oldCol !== j)) {
      this.onEndSelection(i, j)

      if (oldRow != i && oldRow > 6 && i > oldRow) {
        //this.win.scrollBy(0, 50)
      }
      if (oldRow != i && oldRow > 6 && i < oldRow) {
        //this.win.scrollBy(0, -50)
      }

    }

  }
  /**
   * isTopSelectedCell for css highlight
   * @param i
   * @param j
   */
  isTopSelectedCell(i:number, j:number) {
    return (i === this.selection.startRow)
  }
  /**
   * isBottomSelectedCell for css highlight
   * @param i
   * @param j
   */
  isBottomSelectedCell(i:number, j:number) {
    return (i === this.selection.endRow)
  }
  /**
   * isLeftMostSelectedCell for css highlight
   * @param i
   * @param j
   */
  isLeftMostSelectedCell(i:number, j:number) {
    return (i === this.selection.startRow)
  }
  /**
   * isRightMostSelectedCell for css highlight
   * @param i
   * @param j
   */
  isRightMostSelectedCell(i:number, j:number) {
    return (i === this.selection.endRow)
  }
  /**
   * isSelectedCell is css highlight
   * @param i
   * @param j
   */
  isSelectedCell(i:number, j:number) {
    return (i >= this.selection.startRow &&
      i <= this.selection.endRow &&
      j >= this.selection.startCol &&
      j <= this.selection.endCol
    )
  }

  /**
   * isOnlySelectedCell is css highlight anf for cell edit
   * @param i
   * @param j
   */
  isOnlySelectedCell(i:number, j:number) {
    return (i === this.selection.startRow &&
      i === this.selection.endRow &&
      j === this.selection.startCol &&
      j === this.selection.endCol

    )
  }
  /**
   * selectOneCell for edit
   * @param i
   * @param j
   */
  selectOneCell(i:number, j:number) {
    this.selection.startRow = i
    this.selection.endRow = i
    this.selection.startCol = j
    this.selection.endCol = j
    this.selection.editing = true;

  }

 // end region mouse selection
















  /////////////////////////////////////////////////////////













  /**
   * onKeyEvent
   * @param $event
   * @param src
   * @param type
   */
  onKeyEvent($event: KeyboardEvent, src = '', type = '') {

  }
  //endregion lesson02



}
