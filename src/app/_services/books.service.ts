import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BooksRoot, MyBook } from '../_models/book';
import { Subject } from 'rxjs';
import { Pagination } from '../_models/pagination';

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

getBooks(searchTerm: string, currentPage?, itemsPerPage? ) {
  this.searchTerm = searchTerm;
  let urlToCall = this.bookUrl + '/?q=' + searchTerm + "&printType=books";

  if (currentPage != null && itemsPerPage != null) {
    const startIndex = itemsPerPage * (currentPage-1);
    const maxResult = itemsPerPage;
    urlToCall += "&startIndex=" + startIndex + "&maxResults=" + maxResult;
  }

  return this.http.get<BooksRoot>(urlToCall);
}

addToMyBooks(myBook: MyBook) {
  const book = this.myRepo.find((bookLookUp) => bookLookUp.id === myBook.id);
  if (book == null) {
   this.myRepo.push(myBook);
  }
  else
  {
    book.rating = myBook.rating;
    book.read = !book.read;
  }
  
}

getMyBooks(read: boolean, currentPage?: number, itemsPerPage?: number,  bookParams?) {
  let start = (currentPage-1)*itemsPerPage;
  let end = start + itemsPerPage;
  let myBooks = this.myRepo.filter(b => b.read === read);
  if(bookParams.searchTerm != null)
  {
    myBooks = myBooks.filter( b => b.title.toLowerCase().includes(bookParams.searchTerm.toLowerCase()));

    if (bookParams.orderBy) {
      if (bookParams.orderBy = 'title') {
        myBooks = myBooks.sort((a,b) => {
          if (a.title>b.title) {
            return 1;
          }
          if (b.title>a.title) {
            return -1;
        }
      });
      }

      if (bookParams.orderBy = 'rating') {
        myBooks = myBooks.sort((a,b) => {
          if (a.rating>b.rating) {
            return 1;
          }
          if (b.rating>a.rating) {
            return -1;
        }
      });
      }
      
    }
  }
  let myBooksToReturn = myBooks.slice(start, end);
  let totalReturnCount = myBooks.length;

 if (totalReturnCount != 0 && myBooksToReturn.length == 0) {
  end = start;
  start = start - itemsPerPage;
  myBooksToReturn = this.myRepo.filter(b => b.read === read).slice(start, end);
 }
  return {paginatedBooks: myBooksToReturn, totalCount: totalReturnCount};
}

removeMyBook(bookId: string, currentPage: number, itemsPerPage: number)
{  
  const bookToRemove = this.myRepo.find(b => b.id === bookId);
  this.myRepo.splice(this.myRepo.findIndex(b => b.id === bookToRemove.id),1);
  this.myRepoBooksUpdated.next(this.getMyBooks(bookToRemove.read, currentPage, itemsPerPage).paginatedBooks);
}

changeMyBookGroup(myBook: MyBook, currentPage: number, itemsPerPage: number) {
  // let indexOfItemToChange = this.myRepo.findIndex(b => b == myBook);
  // this.myRepo[indexOfItemToChange].read = !this.myRepo[indexOfItemToChange].read;
  const readStatusToReturn = myBook.read;
  myBook.read = !myBook.read;

  myBook.rating = myBook.read == false?0:1; 
  this.myRepoBooksUpdated.next(this.getMyBooks(readStatusToReturn, currentPage, itemsPerPage).paginatedBooks);
}

existsInMyList(bookId: string) {
  const bookToFind = this.myRepo.find(b => b.id === bookId);

  if (bookToFind == null) {
    return null;
  } else {
    //return bookToFind.read;
    return bookToFind;
  }
}

updateRating(bookId: string, newRating : number)
{ 

  this.myRepo.find(b => b.id === bookId).rating = newRating;  

}

}
