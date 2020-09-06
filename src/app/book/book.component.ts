import { Component, OnInit, Input } from '@angular/core';
import { VolumeInfo, Item, MyBook } from '../_models/book';
import { BooksService } from '../_services/books.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  bsModalRef: BsModalRef;
  @Input() item: Item;
  //isRead: boolean;
  myBook: MyBook;
  //rating: number;
  isReadColor: string;
  isToReadColor: string;
  imagePath: string;
  constructor(private booksService: BooksService, private modalService: BsModalService) { }

  ngOnInit() {
    //this.myBook = this.booksService.existsInMyList(this.item.id);
    this.myBook = this.booksService.existsInMyList(this.item.id);

    if (this.myBook != null) {
      if ( this.myBook.read === true) {
        this.isReadColor = 'green';
        this.isToReadColor = 'black';
      } else if (this.myBook.read === false) {
        this.isToReadColor = 'green';
        this.isReadColor = 'black';
      }
    }

    if (this.item.volumeInfo.imageLinks)
    {
      this.imagePath = this.item.volumeInfo.imageLinks.smallThumbnail;
    } else
    {
      this.imagePath = 'assets/generic_book.png';
    }

    // this.imagePath = 'assets/generic_book.png';

  }

  onRead(rating: number = 1)
  {
    this.isReadColor = 'green';
    this.isToReadColor = 'black';
    this.booksService.addToMyBooks({id: this.item.id,
                                    read: true,
                                    title: this.item.volumeInfo.title,
                                    description: this.item.volumeInfo.description,
                                    rating,
                                    img: this.item.volumeInfo.imageLinks.smallThumbnail});
    
  }

  onWish()
  {
    this.isToReadColor = 'green';
    this.isReadColor = 'black'; 
    this.booksService.addToMyBooks({id: this.item.id,
                                    read: false,
                                    title: this.item.volumeInfo.title,
                                    description: this.item.volumeInfo.description,
                                    rating: 0,
                                    img: this.item.volumeInfo.imageLinks.smallThumbnail});

    
  }

  onBookInfoModal()
  {
    this.myBook = this.booksService.existsInMyList(this.item.id);
    const initialState = {
      book: this.item.volumeInfo,
      isToReadColor: this.isToReadColor,
      isReadColor: this.isReadColor,
      rate: this.myBook != null ? this.myBook.rating : 0
     

    };
    this.bsModalRef = this.modalService.show(BookModalComponent, {initialState});
    this.bsModalRef.content.onReadEmitter.subscribe((rating)=>
    {
      //let ratingToAssign = rating == null ? 0 : rating;
      
      //this.rating = rating;
      this.onRead(rating);
    });
    this.bsModalRef.content.onWishEmitter.subscribe((rating)=>
    {
      
      //this.onWish(rating);
      this.onWish();
    });
    this.bsModalRef.content.onRateChangedEmitter.subscribe((rating)=>
    {
      let existingBook = this.booksService.existsInMyList(this.item.id);

      if (existingBook != null) {
        this.booksService.updateRating(this.item.id, rating);
      }
      else
      {

      }
      
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }


}
