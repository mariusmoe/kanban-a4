import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-new-card',
  templateUrl: '../kanban-main/dialog-card-editor.html',
  styleUrls: ['./add-new-card.component.css']
})
export class AddNewCardComponent implements OnInit {

  cardForm = this.fb.group({
    id: null,
    title: ['', Validators.required],
    description: '',
    // todoList?: Todo[]; // <-- TODO
    dueDate: null,
    estimatedTime: 1,
    tags: ''
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

}
