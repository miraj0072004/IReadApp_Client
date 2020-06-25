import { Component, OnInit } from '@angular/core';
import { BooksService } from '../_services/books.service';
import { BooksRoot } from '../_models/book';
import { Pagination } from '../_models/pagination';
import { PaginationComponent } from 'ngx-bootstrap/pagination';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private bookService: BooksService) { }
  searchTerm: string;
  booksRoot: BooksRoot = {kind:'', totalItems:0, items:[]};
  pagination: Pagination = {itemsPerPage:5, totalItems: 30, currentPage:1, totalPages:0 };
  searched = false;

  ngOnInit() {
    if (this.bookService.booksRoot != null) {
      this.searchTerm = this.bookService.searchTerm;
      this.booksRoot = this.bookService.booksRoot;
      this.searched = true;
    }

  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.searchBooks();
    console.log(this.pagination.currentPage);
  }

  searchBooks()
  {
    this.searched = true;
    this.booksRoot = null;
    const sendTerm = this.searchTerm.replace(' ', '+');
    this.bookService.getBooks(sendTerm, this.pagination.currentPage, this.pagination.itemsPerPage).subscribe(
        (result: BooksRoot) =>
        {
         this.booksRoot = result;
         this.bookService.booksRoot = this.booksRoot;
         //this.pagination.totalItems = this.booksRoot.totalItems;
         //this.pagination.currentPage +=1; 
         
        }
      );

  }

}
