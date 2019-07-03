import { Component, AfterViewInit } from '@angular/core';
import { DialogCardEditor } from './components/kanban/kanban-main/kanban-main.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'kanban-client';
  card =     {
    id: '',
    title: '',
    dueDate: null,
    estimatedTime: null,
    tags: null,
    description: ''
  }
  shortcuts: ShortcutInput[] = [];

  showFiller = false;
  dialogOpen = false;
  constructor(public dialog: MatDialog) {}

  ngAfterViewInit() {
    this.shortcuts.push(
      {
        key: ["cmd + enter"],
        label: "Help",
        description: "Cmd + enter: Create new card",
        command: e => this.createNewCard(e),
        preventDefault: true
      }
    );
  }

  createNewCard(e) {
    console.log(e);
    this.dialogOpen = true;
    
    const dialogRef = this.dialog.open(DialogCardEditor, {
      width: '400px',
      data: this.card,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dialogOpen = false;
      if(result){
        console.log('The dialog was closed');
        
      }
      // TODO: Save the newly created card
      // Let the service handle this!
    });
  }
}
