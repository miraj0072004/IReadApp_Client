import { Component, OnInit, Input } from '@angular/core';
import { VolumeInfo, Item } from '../_models/book';
import { BooksService } from '../_services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() item: Item;
  constructor(private booksService: BooksService) { }

  ngOnInit() {
  }

  onRead()
  {
    this.booksService.addToMyBooks({id: this.item.id, read: true});
  }

  onWish()
  {
    this.booksService.addToMyBooks({id: this.item.id, read: false});
  }

}
