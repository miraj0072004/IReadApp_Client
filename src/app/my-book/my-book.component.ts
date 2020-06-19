import { Component, OnInit, Input } from '@angular/core';
import { MyBook } from '../_models/book';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent implements OnInit {

  constructor() { }
  @Input() book: MyBook;
  ngOnInit() {
  }

}
