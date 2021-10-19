import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CustomWindowComponent } from './custom-window/custom-window.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { TableComponent } from './table/table.component';
import { MatTableModule } from '@angular/material/table';
import { UserFormComponent } from './user-form/user-form.component';
import { MatInputModule } from '@angular/material/input';
import { AccordionComponent } from './accordion/accordion.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { TabsComponent } from './tabs/tabs.component';
import { MatTabsModule } from '@angular/material/tabs';
import { SmartWindowLibModule } from 'smart-window-lib';



@NgModule({
  declarations: [
    AppComponent,
    CustomWindowComponent,
    TaskbarComponent,
    TableComponent,
    UserFormComponent,
    AccordionComponent,
    TabsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatInputModule,
    MatExpansionModule,
    MatTabsModule,
    SmartWindowLibModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
