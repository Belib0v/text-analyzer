import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { App } from './app';

describe('App', () => {
  let app: App;
  let textarea: HTMLTextAreaElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideHttpClient(), provideHttpClientTesting()], // no real requests
    });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // render the template
    app = fixture.componentInstance;
    textarea = fixture.nativeElement.querySelector('textarea');
  });

  function select(text: string, start: number, end: number) {
    textarea.value = text;
    textarea.dispatchEvent(new Event('input'));
    textarea.setSelectionRange(start, end);
  }

  it('should search synonyms for selected word', () => {
    select('I am happy', 5, 10);
    app.findSynonyms();
    expect(app.query()).toBe('happy');
  });

  it('should show hint when nothing is selected', () => {
    select('I am happy', 0, 0);
    app.findSynonyms();
    expect(app.noSelection()).toBe(true);
  });

  it('should replace selected word', () => {
    select('I am happy', 5, 10);
    app.findSynonyms();
    app.replace('glad');
    expect(app.text()).toBe('I am glad');
  });

  it('should keep spaces around replaced word', () => {
    select('I am happy today', 4, 11); // " happy " with spaces
    app.findSynonyms();
    app.replace('glad');
    expect(app.text()).toBe('I am glad today');
  });
});
