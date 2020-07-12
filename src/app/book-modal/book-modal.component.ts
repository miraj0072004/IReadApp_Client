import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Item } from '../_models/book';
import { BooksService } from '../_services/books.service';



@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {

  isReadColor: string;
  isToReadColor: string;
  item: Item;
  rate:number;
  

  @Output() onWishEmitter = new EventEmitter();
  @Output() onReadEmitter = new EventEmitter();
  @Output() onRateChangedEmitter = new EventEmitter();

  constructor(public bsModalRef: BsModalRef,private booksService: BooksService) { }

  ngOnInit() {
  }

  onWish()
  {
    this.isToReadColor = "green";
    this.isReadColor = "black"; 
    this.onWishEmitter.emit(this.rate);
  }

  onRead()
  {
    this.isReadColor = "green";
    this.isToReadColor = "black";
    this.onReadEmitter.emit(this.rate);
    
  }

  onRateChanged(newRate)
  {
    this.onRateChangedEmitter.emit(newRate);
  }

}
