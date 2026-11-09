import { Component, ElementRef, computed, inject, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { getCharacterCount, getWordsCount } from './text.methods';
import { SynonymsService } from './synonyms/synonyms.service';

@Component({
  imports: [FormsModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private readonly synonymsService = inject(SynonymsService);

  text = signal('');
  copied = signal(false);
  noSelection = signal(false);
  textRange = signal<{ start: number; end: number; value: string } | null>(null);
  query = signal<string | undefined>(undefined);
  synonyms = this.synonymsService.synonymsResource(this.query);
  characterCount = computed(() => getCharacterCount(this.text()));
  wordsCount = computed(() => getWordsCount(this.text()));

  private readonly textarea = viewChild.required<ElementRef<HTMLTextAreaElement>>('ta');

  private selection() {
    const { selectionStart, selectionEnd } = this.textarea().nativeElement;
    return { start: selectionStart, raw: this.text().slice(selectionStart, selectionEnd) };
  }

  async copyText() {
    try {
      await navigator.clipboard.writeText(this.selection().raw || this.text());
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 1000);
    } catch (error) {
      console.error('Copy error:', error);
    }
  }

  findSynonyms() {
    const { start: selectionStart, raw } = this.selection();
    const value = raw.trim();
    this.noSelection.set(!value);

    if (!value) {
      this.textRange.set(null);
      return;
    }

    const start = selectionStart + raw.length - raw.trimStart().length;
    this.textRange.set({ start, end: start + value.length, value });
    this.query.set(value);
  }

  replace(word: string) {
    const range = this.textRange();
    const text = this.text();
    if (!range || text.slice(range.start, range.end) !== range.value) {
      this.textRange.set(null);
      return;
    }
    this.text.set(text.slice(0, range.start) + word + text.slice(range.end));
    this.textRange.set({ start: range.start, end: range.start + word.length, value: word });
  }
}
