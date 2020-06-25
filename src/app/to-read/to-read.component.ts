import { Component, OnInit } from '@angular/core';
import { MyBook } from '../_models/book';
import { BooksService } from '../_services/books.service';

@Component({
  selector: 'app-to-read',
  templateUrl: './to-read.component.html',
  styleUrls: ['./to-read.component.css']
})
export class ToReadComponent implements OnInit {

  searchTerm: string;  
  booksToRead: MyBook[];

  constructor(private booksService: BooksService) { }
  
  ngOnInit() {
    this.booksToRead = this.booksService.getMyBooks(false).paginatedBooks;
    this.booksService.myRepoBooksUpdated.subscribe((updatedBooks) =>
    {      this.booksToRead = updatedBooks;
    });
  }

}
