import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BarRatingModule } from 'ngx-bar-rating';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { AlertifyService } from './_services/alertify.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HttpClientModule } from '@angular/common/http';
import { BookComponent } from './book/book.component';
import { BooksService } from './_services/books.service';
import { HaveReadComponent } from './have-read/have-read.component';
import { ToReadComponent } from './to-read/to-read.component';
import { MyBookComponent } from './my-book/my-book.component';
import { BookModalComponent } from './book-modal/book-modal.component';
import { BrowseComponent } from './browse/browse.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      BookComponent,
      HaveReadComponent,
      ToReadComponent,
      MyBookComponent,
      BookModalComponent,
      BookModalComponent,
      BrowseComponent,
      RegisterComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      HttpClientModule,
      BarRatingModule,
      RouterModule.forRoot(appRoutes),
      PaginationModule.forRoot(),
      ModalModule.forRoot()
   ],
   providers: [
      AuthService,
      AlertifyService,
      BooksService
   ],
   entryComponents: [
      BookModalComponent
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
