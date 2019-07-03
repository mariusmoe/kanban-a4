import { Component, OnInit, Inject, NgZone, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/_models/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,  Validators, FormGroup, FormControl } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-kanban-main',
  templateUrl: './kanban-main.component.html',
  styleUrls: ['./kanban-main.component.css']
})
export class KanbanMainComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    // TODO: Load kanban cards
  }



  icebox: Card[] = [
    {
      id: 'asdasdasd',
      title: 'skriv koode',
      description: 'Skriv all den koden som ikke har blitt skrevet hitttil og ikke noe aso asdoa sasd'
    },
    {
      id: 'sggfgfdgdfg',
      title: 'vak opp!',
      dueDate: null,
      estimatedTime: null,
      tags: null,
      description: 'Alle tallerkner må vaskes opp grundig'
    }
  ]


  todo: Card[] = [
    {
      id: 'asdadadadfggsf',
      title: 'Get to work',
      description: 'Skriv Get to workawd asdasd aasdasdasd'
    },
    {
      id: 'asdadadadfggsf',
      title: 'Gjør noe',
      description: 'Skriv Get to et eller annet workawd asdasd aasdasdasd'
    }
   
  ];

  progress: Card[] = [
    {
      id: 'asdadadadfggsf',
      title: 'work!',
      description: 'Skriv Get to workawd asdasd aasdasdasd'
    },
    {
      id: 'asdadadadfggsf',
      title: 'Gjør noe',
      description: 'Skriv Get to et eller annet workawd asdasd aasdasdasd'
    }
  ];

  done : Card[] = [
    {
      id: 'asdadadadfggsf',
      title: 'work!',
      description: 'Skriv Get to workawd asdasd aasdasdasd'
    },
    {
      id: 'asdadadadfggsf',
      title: 'Gjør noe',
      description: 'Skriv Get to et eller annet workawd asdasd aasdasdasd'
    }
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Same container -> only change index
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // New container and index -> change all the stuff!!!
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

  /**
   * Opens a dialog and saves the result upon successfull callback
   * @param card the clicked card
   */
  itemClicked(card: Card, i: number, list: Card[]): void {
    console.log("Clicked!");
    console.log(card);

    const dialogRef = this.dialog.open(DialogCardEditor, {
      width: '400px',
      data: card,
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        console.log('The dialog was closed');
        list[i] = result;
      }
      // TODO: Save the newly changed card
    });
  }


}

@Component({
  selector: 'dialog-card-editor',
  templateUrl: 'dialog-card-editor.html',
  styleUrls: ['./kanban-main.component.css']
})
export class DialogCardEditor {

  cardForm = this.fb.group({
    id: null,
    title: ['', Validators.required],
    description: '',
    // todoList?: Todo[]; // <-- TODO
    dueDate: null,
    estimatedTime: 1,
    tags: ''
  });

  constructor(
    private _ngZone: NgZone,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogCardEditor>,
    @Inject(MAT_DIALOG_DATA) public data: Card) {
      this.cardForm.patchValue(this.createForm(this.data).value)
    }
    @ViewChild('autosize', {static: false}) autosize: CdkTextareaAutosize;

    triggerResize() {
      // Wait for changes to be applied, then trigger textarea resize.
      this._ngZone.onStable.pipe(take(1))
          .subscribe(() => this.autosize.resizeToFitContent(true));
    }
    
  /**
   * Abort -> do not save
   */
  onNoClick(): void {
    this.dialogRef.close();
  }

  /**
   * Get form value as Card type
   */
  get formValue() {
    return this.cardForm.value as Card;
  }

  /**
   * Create the form from a previous card
   * @param model Card model to instantiate from
   */
  private createForm(model: Card): FormGroup {
    return this.fb.group(model);
  }

  /**
   * Change the form
   * @param model the updated Card model
   * @deprecated Since version 0. Modal should close, 
   * therefore no need for update
   */
  private updateForm(model: Partial<Card>): void {
    console.warn("Calling deprecated function!");
    this.cardForm.patchValue(model)
  }

  onSubmit() {
    console.log(this.formValue);
    
  }

}
