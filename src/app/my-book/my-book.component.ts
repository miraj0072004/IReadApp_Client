import { Component, OnInit, Input } from '@angular/core';
import { MyBook } from '../_models/book';
import { BooksService } from '../_services/books.service';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent implements OnInit {

  constructor(private booksService: BooksService) { }
  @Input() book: MyBook;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;
  ngOnInit() {
    
  }

  onRemove()
  {
    this.booksService.removeMyBook(this.book.id, this.currentPage, this.itemsPerPage);
  }

  onChange()
  {
    this.booksService.changeMyBookGroup(this.book, this.currentPage, this.itemsPerPage);
  }

}
