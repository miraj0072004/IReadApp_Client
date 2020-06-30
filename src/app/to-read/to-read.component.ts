import { Component, OnInit } from '@angular/core';
import { MyBook } from '../_models/book';
import { BooksService } from '../_services/books.service';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-to-read',
  templateUrl: './to-read.component.html',
  styleUrls: ['./to-read.component.css']
})
export class ToReadComponent implements OnInit {

  searchTerm: string;  
  booksToRead: MyBook[];
  pagination: Pagination = {itemsPerPage:5, totalItems: 30, currentPage:1, totalPages:0 };

  constructor(private booksService: BooksService) { }
  
  ngOnInit() {
    this.searchMyBooks();
    //this.booksToRead = this.booksService.getMyBooks(false).paginatedBooks;
    this.booksService.myRepoBooksUpdated.subscribe((updatedBooks) =>
    {      
      this.booksToRead = updatedBooks;
      this.searchMyBooks();
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.searchMyBooks();
    //console.log(this.pagination.currentPage);
  }

  searchMyBooks() {
    var result = this.booksService.getMyBooks(false, this.pagination.currentPage, this.pagination.itemsPerPage);
    this.booksToRead = result.paginatedBooks;
    this.pagination.totalItems = result.totalCount;
  }

}
