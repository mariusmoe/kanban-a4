import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-kanban-main',
  templateUrl: './kanban-main.component.html',
  styleUrls: ['./kanban-main.component.css']
})
export class KanbanMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  inbox = ['make an app']

  icebox = ['Get up']

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  progress = [
  'coding'
  ];

  done = [
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
