import { Injectable } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Card } from 'src/app/_models/card';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class KanbanService {
  weeks: any[] = [
    {
      id: "Icebox",
      weeklist: [
        {
          id: "qqqqqqqqqqqqqq",
          title: "Write more code now!",
          dueDate: null,
          estimatedTime: null,
          tags: null,
          description: "All kode burde testes"
        }
      ]
    },
    {
      id: "Todo",
      weeklist: [
        {
          id: "asdadadadfggsf",
          title: "Get to work",
          description: "Skriv Get to workawd asdasd aasdasdasd"
        },
        {
          id: "asdadadadfggsf",
          title: "Gjør noe",
          description: "Skriv Get to et eller annet workawd asdasd aasdasdasd"
        }
      ]
    },
    {
      id: "Progress",
      weeklist: [
        {
          id: "asdadadadfggsf",
          title: "work!",
          description: "Skriv Get to workawd asdasd aasdasdasd"
        },
        {
          id: "asdadadadfggsf",
          title: "Gjør noe",
          description: "Skriv Get to et eller annet workawd asdasd aasdasdasd"
        }
      ]
    },
    {
      id: "Done",
      weeklist: [
        {
          id: "asdadadadfggsf",
          title: "work!",
          description: "Skriv Get to workawd asdasd aasdasdasd"
        },
        {
          id: "asdadadadfggsf",
          title: "Gjør noe",
          description: "Skriv Get to et eller annet workawd asdasd aasdasdasd"
        }
      ]
    }
  ];

  masterList: Observable<string[]> = of(["Icebox", "Todo", "Progress", "Done"]);
  subject: Subject<object[]> = new Subject();
  _proposals: object[] = [];

  get proposals() {
    return this.subject.asObservable();
  }

  constructor() {
    this._proposals = this.weeks;
    // this.subject.next(Object.assign({}, this._proposals));
  }

  /**
   * Force cards to load
   */
  loadCards() {
    this.subject.next(this._proposals);
  }

  /**
   * Create a new card and braodcast the result
   * @param card the new card
   */
  createNewCard(card: Card) {
    console.log("service received card: ", card);
    const list: any = this._proposals.find((obj: any) => {
      return obj.id === "Icebox";
    });
    console.log("list: ", list);

    console.log("_proposals: ", this._proposals);

    // this._proposals =
    list.weeklist.push(card);
    console.log(this._proposals);
    console.log(list);

    this.subject.next(this._proposals); // emit completely new value
  }

  // https://stackoverflow.com/questions/49289971/how-to-store-a-sorted-list-in-google-firestore

  // TODO: https://www.freakyjolly.com/angular-7-drag-and-drop-across-multi-lists-in-angular-material-7/

  changeCard(card: Card, i: number, listId) {
    console.log('The service was called!');

    console.log(card, listId);
    const list = this.weeks.find(obj => {
      return obj.id === listId;
    });
    console.log(list, i);
    list.weeklist[i] = card;
  }

  serviceDrop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // Same container -> only change index
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // New container and index -> change all the stuff!!!
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}
