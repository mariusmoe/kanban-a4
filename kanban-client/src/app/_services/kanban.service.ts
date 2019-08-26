import { Injectable } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/_models/card';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  icebox:Observable<Card[]> = of([{
    id: 'qqqqqqqqqqqqqq',
    title: 'Write more code now!',
    dueDate: null,
    estimatedTime: null,
    tags: null,
    description: 'All kode burde testes'
  }]);

  todo: Observable<Card[]> = of([
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
  ]);
  
  progress: Observable<Card[]> = of([
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
  ]);
  
  done: Observable<Card[]> = of([
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
  ]);

  constructor() { }

  createNewCard() {

  }

  // TODO: https://www.freakyjolly.com/angular-7-drag-and-drop-across-multi-lists-in-angular-material-7/


  

  // getIcebox(): Observable<Card[]> {
  //   // TODO: send the message _after_ fetching the heroes
  //   this.icebox.push(    {
  //     id: 'qqqqqqqqqqqqqq',
  //     title: 'Write more code now!',
  //     dueDate: null,
  //     estimatedTime: null,
  //     tags: null,
  //     description: 'All kode burde testes'
  //   });
  //   return of(this.icebox);
  // }

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
