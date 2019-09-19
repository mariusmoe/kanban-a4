import { Component, OnInit, Inject, NgZone, ViewChild } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/_models/card';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,  Validators, FormGroup, FormControl } from '@angular/forms';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';
import { KanbanService } from 'src/app/_services/kanban.service';

@Component({
  selector: 'app-kanban-main',
  templateUrl: './kanban-main.component.html',
  styleUrls: ['./kanban-main.component.css']
})
export class KanbanMainComponent implements OnInit {


    // Hva med å bygge denne listen fra collections i firestore?

    constructor(public dialog: MatDialog,
                private kanbanService: KanbanService) {


    }

  icebox: Card[] = [];
  todo: Card[] = [];
  progress: Card[] = [];
  done: Card[] = [];

  masterList = [];
  weeks = [];
  connectedTo = [];


 // constructor() { }

  ngOnInit() {

    this.kanbanService.masterList.subscribe(masterListItem => {
      this.masterList = masterListItem;
    });
    this.kanbanService.subject.subscribe(weekItem => {
      this.weeks = weekItem;
      for (const week of this.weeks) {
        this.connectedTo.push(week.id);
      }
    });
    for (const week of this.weeks) {
      this.connectedTo.push(week.id);
    }

    // Force the damn cards to load
    this.kanbanService.loadCards();

  }

    drop(event: CdkDragDrop<string[]>) {
    //   if (event.previousContainer === event.container) {
    //   moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    //   console.log('container data: ', event.container.data, ' prev index: ',
    //               event.previousIndex, 'current index: ', event.currentIndex);

    // } else {
    //   transferArrayItem(event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex);
    //   console.log('prev container: ', event.previousContainer.data, 'container data: ',
    //                 event.container.data, ' prev index: ', event.previousIndex, 'current index: ',
    //                 event.currentIndex);
    //   console.log('prev container: ', event.previousContainer.id, 'container data: ',
    //                 event.container.id, ' prev index: ', event.previousIndex, 'current index: ',
    //                 event.currentIndex);
    // }
      this.kanbanService.serviceDrop(event);
  }

  /**
   * Opens a dialog and saves the result upon successfull callback
   * @param card the clicked card
   */
  itemClicked(card: Card, i: number, listId): void {
    console.log('Clicked!');
    console.log(card);
    const dialogRef = this.dialog.open(DialogCardEditor, {
      width: '400px',
      data: card,
      autoFocus: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.kanbanService.changeCard(result, i, listId);
      }
    });
  }

}









@Component({
  selector: "dialog-card-editor",
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
    @Inject(MAT_DIALOG_DATA) public data: Card
  ) {
    this.cardForm.patchValue(this.createForm(this.data).value);
  }
  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
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
   */
  private updateForm(model: Partial<Card>): void {
    this.cardForm.patchValue(model);
  }
  tryToClose(event) {
    event.preventDefault();
    event.stopPropagation();
    console.log(event, event.keyCode, event.keyIdentifier);
    if (event.ctrlKey && event.keyCode === 13) {
      console.log('control man');
      this.dialogRef.close(this.formValue);
    }
  }

  onSubmit() {
    console.log(this.formValue);
  }
}
