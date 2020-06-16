import { Component, OnInit } from '@angular/core';
import { BooksService } from '../_services/books.service';
import { BooksRoot } from '../_models/book';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BooksService) { }
  searchTerm: string;
  booksRoot: BooksRoot;  
  ngOnInit() {
  }

  searchBooks()
  {
    const sendTerm = this.searchTerm.replace(' ', '+');
    this.bookService.getBooks(sendTerm).subscribe((result: BooksRoot) =>
    {
     this.booksRoot = result;
    }
    );
  }

}
