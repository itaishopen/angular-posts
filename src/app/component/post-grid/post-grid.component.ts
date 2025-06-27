import {Component, effect, signal} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { Store } from '@ngrx/store';

import {PostSquareComponent} from '../post-square/post-square.component';
import {selectAllPosts, selectCurrentPostId, selectLoading} from '../../state/posts.selectors';
import {loadPosts} from '../../state/posts.actions';


@Component({
  selector: 'app-post-grid',
  imports: [
    PostSquareComponent,
    AsyncPipe
  ],
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss',
  standalone: true
})
export class PostGridComponent {
  posts$;
  selectedId$;
  loading$
  readonly isDarkMode = signal<boolean>(JSON.parse(localStorage.getItem('darkMode') ?? 'false'));
  constructor(private store: Store) {
    this.store.dispatch(loadPosts());
    this.posts$ = this.store.select(selectAllPosts);
    this.selectedId$ = this.store.select(selectCurrentPostId);
    this.loading$ = this.store.select(selectLoading);
    effect(() => {
      document.body.classList.toggle('dark-theme', this.isDarkMode());
      localStorage.setItem('darkMode', JSON.stringify(this.isDarkMode()));
    });
  }

  toggle() {
    this.isDarkMode.update(isDark => !isDark);
  }
}
