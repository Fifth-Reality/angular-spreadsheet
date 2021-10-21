import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SheetV1Component } from './sheet-v1/sheet.component';
import { SheetV2Component } from './sheet-v2/sheet.component';



@NgModule({
  declarations: [
    AppComponent,
    SheetV1Component,
    SheetV2Component
  ],
  imports: [
    BrowserModule, CommonModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
