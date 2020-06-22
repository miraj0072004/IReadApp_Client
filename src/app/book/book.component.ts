import { Component, OnInit, Input } from '@angular/core';
import { VolumeInfo, Item } from '../_models/book';
import { BooksService } from '../_services/books.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() item: Item;
  isRead: boolean;
  isReadColor: string;
  isToReadColor: string;
  constructor(private booksService: BooksService) { }

  ngOnInit() {
    this.isRead = this.booksService.existsInMyList(this.item.id);

    if (this.isRead === true) {
      this.isReadColor = "green";
      this.isToReadColor = "black";
    } else if (this.isRead === false) {
      this.isToReadColor = "green";
      this.isReadColor = "black";
    }

  }

  onRead()
  {
    this.isReadColor = "green";
    this.isToReadColor = "black";
    this.booksService.addToMyBooks({id: this.item.id,
                                    read: true,
                                    title: this.item.volumeInfo.title,
                                    description: this.item.volumeInfo.description,
                                    img: this.item.volumeInfo.imageLinks.smallThumbnail});
    
  }

  onWish()
  {
    this.isToReadColor = "green";
    this.isReadColor = "black"; 
    this.booksService.addToMyBooks({id: this.item.id,
                                    read: false,
                                    title: this.item.volumeInfo.title,
                                    description: this.item.volumeInfo.description,
                                    img: this.item.volumeInfo.imageLinks.smallThumbnail});

    
  }

  // getReadColor()
  // {
  //   return this.isRead === true?'green':'black';
  // }

  // getNotReadColor()
  // {
  //   return this.isRead === false?'green':'black';
  // }

}
