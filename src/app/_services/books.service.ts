import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksRoot } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

bookUrl = 'https://www.googleapis.com/books/v1/volumes';

constructor(private http: HttpClient) { }

getBooks(searchTerm: string)
{
  return this.http.get<BooksRoot>(this.bookUrl + '/?q=' + searchTerm + "&printType=books");
}

}
