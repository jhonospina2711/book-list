import { Component, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../book.service';
import { BookDetail } from '../bookDetail';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  constructor(private bookService: BookService) { }
  books: Array<BookDetail> = [];
  selectedBook!: BookDetail;
  selected: Boolean = false;
  onSelected(book: BookDetail): void {
    this.selected = true;
    this.selectedBook = book;
  }

  getBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (books) => {
        // console.log('Libros recibidos desde la API:', books);
        this.books = books;
      },
      error: (e) => {
        // console.error('Error al obtener los libros:', e);
      }
    });
  }

  ngOnInit() {
    this.getBooks();
  }

}
