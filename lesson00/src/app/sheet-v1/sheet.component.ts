import { Component, Input, OnInit } from '@angular/core';

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
  @Input() data :any;
  @Input() lookups: any;
  @Input() columns: any;
  @Input() config: any;


  // endregion lesson00

  // region lesson00A
  

  setupColumns() {

  }


  // endregion lesson00A

}
