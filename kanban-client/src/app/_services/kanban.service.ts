import { Injectable } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/_models/card';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

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

  constructor() { }

  createNewCard() {

  }

  getIcebox(): Observable<Card[]> {
    // TODO: send the message _after_ fetching the heroes
    this.icebox.push(    {
      id: 'qqqqqqqqqqqqqq',
      title: 'Write more code now!',
      dueDate: null,
      estimatedTime: null,
      tags: null,
      description: 'All kode burde testes'
    });
    return of(this.icebox);
  }

  serviceDrop(event: CdkDragDrop<string[]>) {
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


}
