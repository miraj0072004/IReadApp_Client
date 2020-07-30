import { Component, OnInit, Input } from '@angular/core';
import { MyBook } from '../_models/book';
import { BooksService } from '../_services/books.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookModalComponent } from '../book-modal/book-modal.component';

@Component({
  selector: 'app-my-book',
  templateUrl: './my-book.component.html',
  styleUrls: ['./my-book.component.css']
})
export class MyBookComponent implements OnInit {

  constructor(private booksService: BooksService,private modalService: BsModalService) { }
  @Input() book: MyBook;
  @Input() currentPage: number;
  @Input() itemsPerPage: number;

  isReadColor: string;
  isToReadColor: string;
  bsModalRef: BsModalRef;
  

  ngOnInit() {
    if (this.book.read) {
      this.isReadColor = "green";
      this.isToReadColor = "black";
    }else
    {
      this.isReadColor = "black";
      this.isToReadColor = "green";
    }
  }

  onRemove()
  {
    this.booksService.removeMyBook(this.book.id, this.currentPage, this.itemsPerPage);
  }

  onChange()
  {
    this.booksService.changeMyBookGroup(this.book, this.currentPage, this.itemsPerPage);
  }

  onBookInfoModal()
  {
    // this.myBook = this.booksService.existsInMyList(this.item.id);
    const initialState = {
      book: this.book,
      isToReadColor: this.isToReadColor,
      isReadColor: this.isReadColor,
      rate: this.book.read ? this.book.rating : 0,
      alreadyAdded: true,
      imageUrl: this.book.img,
      subtitle: "Book Image"
     

    };
    this.bsModalRef = this.modalService.show(BookModalComponent, {initialState});

    
    this.bsModalRef.content.onRateChangedEmitter.subscribe((rating)=>
    {      

      
        this.booksService.updateRating(this.book.id, rating);
     
      
    });

    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
