/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faker } from '@faker-js/faker';

import { BookDetailComponent } from './book-detail.component';
import { BookDetail } from '../bookDetail';
import { Editorial } from '../../editorial/editorial';
import { Author } from '../../author/author';

describe('BookDetailComponent', () => {
  let component: BookDetailComponent;
  let fixture: ComponentFixture<BookDetailComponent>;
  let debug: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [BookDetailComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailComponent);
    component = fixture.componentInstance;

    const editorial = new Editorial(
      faker.number.int(),
      faker.lorem.sentence()
    );

    const authors: Author[] = [];
    for (let i = 0; i < 3; i++) {
      authors.push(new Author(
        faker.number.int(),
        faker.lorem.sentence(),
        faker.date.past(),
        faker.image.url(),
        faker.lorem.sentence(),
      ));
    }

    component.bookDetail = new BookDetail(
      faker.number.int(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.lorem.sentence(),
      faker.image.url(),
      faker.date.past(),
      editorial,
      authors,
      []
    );

    fixture.detectChanges();
    debug = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the book name in the title', () => {
    const title = debug.query(By.css('p.h3')).nativeElement.textContent;
    expect(title).toContain(component.bookDetail.name);
  });

  it('should render the book image with correct src and alt', () => {
    const img = debug.query(By.css('img.img-fluid'));
    expect(img.attributes['src']).toEqual(component.bookDetail.image);
    expect(img.attributes['alt']).toEqual(component.bookDetail.name);
  });

  it('should render 3 author names', () => {
    const authorElements = debug.queryAll(By.css('dd.caption'));
    const authorNames = authorElements.slice(0, 3);
    expect(authorNames).toHaveSize(3);
    authorNames.forEach((dd, i) => {
      expect(dd.nativeElement.textContent).toContain(component.bookDetail.authors[i].name);
    });
  });

  it('should render the editorial name', () => {
    const editorialDd = debug.queryAll(By.css('dd.caption')).pop()!;
    expect(editorialDd.nativeElement.textContent).toContain(component.bookDetail.editorial.name);
  });

  it('should render the isbn', () => {
    const allDds = debug.queryAll(By.css('dd'));
    const isbnDd = allDds.find(dd => dd.nativeElement.textContent.trim() === component.bookDetail.isbn);
    expect(isbnDd).toBeTruthy();
  });

  it('should render the description', () => {
    const allDds = debug.queryAll(By.css('dd'));
    const descDd = allDds.find(dd => dd.nativeElement.textContent.trim() === component.bookDetail.description);
    expect(descDd).toBeTruthy();
  });
});
