import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SmartWindowLibComponent } from './smart-window-lib.component';
import { TaskbarLibComponent } from './taskbar/taskbar.component';



@NgModule({
  declarations: [
    SmartWindowLibComponent,
    TaskbarLibComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
  ],
  exports: [
    SmartWindowLibComponent,
    TaskbarLibComponent
  ]
})
export class SmartWindowLibModule { }
