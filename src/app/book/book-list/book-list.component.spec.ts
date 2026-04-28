/* tslint:disable:no-unused-variable */
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { faker } from '@faker-js/faker';
import { of } from 'rxjs';

import { Editorial } from '../../editorial/editorial';
import { BookService } from '../book.service';
import { BookListComponent } from './book-list.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BookDetail } from '../bookDetail';

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let debug: DebugElement;
  let books: BookDetail[];

  beforeEach(waitForAsync(() => {
    const editorial = new Editorial(
      faker.number.int(),
      faker.lorem.sentence()
    );

    books = [];
    for(let i = 0; i < 10; i++) {
     const book = new BookDetail(
       faker.number.int(),
       faker.lorem.sentence(),
       faker.lorem.sentence(),
       faker.lorem.sentence(),
       faker.image.url(),
       faker.date.past(),
       editorial,
       [],
       []
     );
     books.push(book);
   }

    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [BookListComponent, BookDetailComponent],
      providers: [
        {
          provide: BookService,
          useValue: {
            getBooks: () => of(books)
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 10 <div.col.mb-2> elements', () => {
    expect(debug.queryAll(By.css('div.col.mb-2'))).toHaveSize(10);
  });

  it('should have 10 <card.p-2> elements', () => {
    expect(debug.queryAll(By.css('div.card.p-2'))).toHaveSize(10);
  });

  it('should have 10 <img> elements', () => {
    expect(debug.queryAll(By.css('img'))).toHaveSize(10);
  });

  it('should have 10 <div.card-body> elements', () => {
    expect(debug.queryAll(By.css('div.card-body'))).toHaveSize(10);
  });

  it('should have the corresponding src to the book image and alt to the book name', () => {
    debug.queryAll(By.css('img')).forEach((img, i) => {
      expect(img.attributes['src']).toEqual(component.books[i].image);
      expect(img.attributes['alt']).toEqual(component.books[i].name);
    });
  });

  it('should have h5 tag with the book.name', () => {
    debug.queryAll(By.css('h5.card-title')).forEach((h5, i) => {
      expect(h5.nativeElement.textContent).toContain(component.books[i].name);
    });
  });

  it('should have p tag with the book.editorial.name', () => {
    debug.queryAll(By.css('p.card-text')).forEach((p, i) => {
      expect(p.nativeElement.textContent).toContain(component.books[i].editorial.name);
    });
  });

  it('should have 9 <div.col.mb-2> elements and the deleted book should not exist', () => {
    const book = component.books.pop()!;
    fixture.detectChanges();

    expect(debug.queryAll(By.css('div.col.mb-2'))).toHaveSize(9);
    debug.queryAll(By.css('div.col.mb-2')).forEach((selector) => {
      expect(selector.nativeElement.textContent).not.toContain(book.name);
    });
  });
});
