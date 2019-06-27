import { Component, OnInit, Input } from '@angular/core';
import { Card } from 'src/app/_models/card';

@Component({
  selector: 'app-small-card',
  templateUrl: './small-card.component.html',
  styleUrls: ['./small-card.component.css']
})
export class SmallCardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Input() cardData: Card;

}
