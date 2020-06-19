import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      BookComponent,
      HaveReadComponent,
      ToReadComponent,
      MyBookComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      AlertifyService,
      BooksService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
