import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksRoot, MyBook } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

bookUrl = 'https://www.googleapis.com/books/v1/volumes';

myRepo: MyBook[] = [];

constructor(private http: HttpClient) { }

getBooks(searchTerm: string) {
  return this.http.get<BooksRoot>(this.bookUrl + '/?q=' + searchTerm + "&printType=books");
}

addToMyBooks(myBook: MyBook) {
  const book = this.myRepo.find((bookLookUp) => bookLookUp.id === myBook.id);
  if (book == null) {
   this.myRepo.push(myBook);
  }
  book.read = !book.read;
}

getMyBooks(read: boolean) {
  return this.myRepo.filter(b => b.read === read);
}
}
