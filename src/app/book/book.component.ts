import { Component, OnInit, Input } from '@angular/core';
import { VolumeInfo, Item } from '../_models/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() item: Item;
  constructor() { }

  ngOnInit() {
  }

}
