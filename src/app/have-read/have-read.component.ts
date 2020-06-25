import { Component, OnInit } from '@angular/core';
import { BooksService } from '../_services/books.service';
import { MyBook } from '../_models/book';
import { Pagination } from '../_models/pagination';

@Component({
  selector: 'app-have-read',
  templateUrl: './have-read.component.html',
  styleUrls: ['./have-read.component.css']
})
export class HaveReadComponent implements OnInit {

  searchTerm: string;  
  booksHaveRead: MyBook[];
  pagination: Pagination = {itemsPerPage:5, totalItems: 30, currentPage:1, totalPages:0 };

  constructor(private booksService: BooksService) { }
  
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.searchMyBooks();
    //console.log(this.pagination.currentPage);
  }

  searchMyBooks() {
    var result = this.booksService.getMyBooks(true, this.pagination.currentPage, this.pagination.itemsPerPage);
    this.booksHaveRead = result.paginatedBooks;
    this.pagination.totalItems = result.totalCount;
  }

  ngOnInit() {
    this.searchMyBooks();
    this.booksService.myRepoBooksUpdated.subscribe((updatedBooks) =>
    {
      this.booksHaveRead = updatedBooks;
    });
  }

}
