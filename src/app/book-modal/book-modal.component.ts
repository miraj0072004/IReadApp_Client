import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item, VolumeInfo } from '../_models/book';
import { BooksService } from '../_services/books.service';



@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  isReadColor: string;
  isToReadColor: string;
  book: VolumeInfo;
  rate: number;
  isRead: boolean;
  description: string;
  alreadyAdded: boolean;
  imageUrl: string;
  subtitle: string;

  @Output() onWishEmitter = new EventEmitter();
  @Output() onReadEmitter = new EventEmitter();
  @Output() onRateChangedEmitter = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,private booksService: BooksService) { }

  ngOnInit() {
    if (this.isReadColor === 'green') {
      this.isRead = true;
    }
    else
    {
      this.isRead = null;
    }


    if (this.book.description) {
      this.description = this.book.description;
    } else
    {
      this.description = 'This book doesn\'t contain a description';
    }

    // if(!this.alreadyAdded)
    // {
    //   this.imageUrl = this.book.imageLinks.thumbnail;
    //   this.subtitle = this.book.subtitle;
    // }

    //this.imageUrl = this.book.imageLinks.thumbnail;
    this.subtitle = this.book.subtitle;

    if (this.book.imageLinks)
    {
      this.imageUrl = this.book.imageLinks.thumbnail;
    } else
    {
      this.imageUrl = 'assets/generic_book.png';
    }
  }

  onWish()
  {
    if (this.isRead || this.isRead == null) {
      this.isRead = false;
      this.isToReadColor = "green";
      this.isReadColor = "black";
      this.isRead = false;
      this.rate = 0;
      this.onWishEmitter.emit(this.rate);
    }
    
  }

  onRead(newRate=0)
  {
    if(!this.isRead)
    {
      this.isRead = true;
      this.isReadColor = "green";
      this.isToReadColor = "black";
      
      if(newRate == 0)
      {
        this.rate = 1;        
      }
      else
      {
        this.rate = newRate;
      }  
      

      //let ratingToSend = this.rate != 0?this.rate:1;
      
      this.onReadEmitter.emit(this.rate);
    }   
    
  }

  onRateChanged(newRate)
  {

    if (this.isRead) {
      this.onRateChangedEmitter.emit(newRate);
    } else
    {
      this.onRead(newRate);
    }

    
  }

}
