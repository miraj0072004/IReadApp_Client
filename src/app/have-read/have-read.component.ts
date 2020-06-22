import { Component, OnInit } from '@angular/core';
import { BooksService } from '../_services/books.service';
import { MyBook } from '../_models/book';

@Component({
  selector: 'app-have-read',
  templateUrl: './have-read.component.html',
  styleUrls: ['./have-read.component.css']
})
export class HaveReadComponent implements OnInit {

  searchTerm: string;  
  booksHaveRead: MyBook[];

  constructor(private booksService: BooksService) { }
  
  ngOnInit() {
    this.booksHaveRead = this.booksService.getMyBooks(true);
    this.booksService.myRepoBooksUpdated.subscribe((updatedBooks) =>
    {      this.booksHaveRead = updatedBooks;
    });
  }

}
