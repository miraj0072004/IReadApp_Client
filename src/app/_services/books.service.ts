import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksRoot, MyBook } from '../_models/book';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

bookUrl = 'https://www.googleapis.com/books/v1/volumes';

myRepo: MyBook[] = [];
myRepoBooksUpdated = new Subject<MyBook[]>();
booksRoot: BooksRoot;
searchTerm: string;

constructor(private http: HttpClient) { }

getBooks(searchTerm: string) {
  this.searchTerm = searchTerm;
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

removeMyBook(bookId: string)
{  
  const bookToRemove = this.myRepo.find(b => b.id === bookId);
  this.myRepo.splice(this.myRepo.findIndex(b => b.id === bookToRemove.id),1);
  this.myRepoBooksUpdated.next(this.getMyBooks(bookToRemove.read));
}

changeMyBookGroup(myBook: MyBook) {
  // let indexOfItemToChange = this.myRepo.findIndex(b => b == myBook);
  // this.myRepo[indexOfItemToChange].read = !this.myRepo[indexOfItemToChange].read;
  const readStatusToReturn = myBook.read;
  myBook.read = !myBook.read;
  this.myRepoBooksUpdated.next(this.getMyBooks(readStatusToReturn));
}

existsInMyList(bookId: string) {
  const bookToFind = this.myRepo.find(b => b.id === bookId);

  if (bookToFind == null) {
    return null;
  } else {
    return bookToFind.read;
  }
}

}
