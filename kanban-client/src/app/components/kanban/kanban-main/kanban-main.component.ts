import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/_models/card';


@Component({
  selector: 'app-kanban-main',
  templateUrl: './kanban-main.component.html',
  styleUrls: ['./kanban-main.component.css']
})
export class KanbanMainComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
      description: 'Alle tallerkner må vaskes opp grundig'
    }
  ]


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
