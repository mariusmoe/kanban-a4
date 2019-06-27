import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KanbanMainComponent, DialogCardEditor } from './components/kanban/kanban-main/kanban-main.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';


import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { SmallCardComponent } from './components/kanban/small-card/small-card.component';

import { ReactiveFormsModule } from '@angular/forms';
import { AddNewCardComponent } from './components/kanban/add-new-card/add-new-card.component';
import { KeyboardShortcutsModule }     from 'ng-keyboard-shortcuts';  

@NgModule({
  declarations: [
    AppComponent,
    KanbanMainComponent,
    PageNotFoundComponent,
    SmallCardComponent,
    DialogCardEditor,
    AddNewCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    KeyboardShortcutsModule.forRoot()
  ],
  entryComponents: [
    DialogCardEditor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
