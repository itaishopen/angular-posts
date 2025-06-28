import {Component, effect, signal} from '@angular/core';
import {AsyncPipe} from '@angular/common';
import { Store } from '@ngrx/store';

import {PostSquareComponent} from '../post-square/post-square.component';
import {selectAllPosts, selectCurrentPostId, selectDarkMode, selectLoading} from '../../state/posts.selectors';
import {loadDarkMode, loadPosts, saveDarkMode} from '../../state/posts.actions';


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
  isDarkMode$;
  readonly isDarkMode = signal<boolean>(false);
  constructor(private store: Store) {
    this.store.dispatch(loadPosts());
    this.store.dispatch(loadDarkMode());
    this.posts$ = this.store.select(selectAllPosts);
    this.selectedId$ = this.store.select(selectCurrentPostId);
    this.loading$ = this.store.select(selectLoading);
    this.isDarkMode$ = this.store.select(selectDarkMode).subscribe((darkMode) =>
    {this.isDarkMode.set(darkMode)});
    effect(() => {
      document.body.classList.toggle('dark-theme', this.isDarkMode());
      this.store.dispatch(saveDarkMode({isDarkMode: this.isDarkMode()}))
      this.store.select(selectDarkMode).subscribe((darkMode) => console.log(darkMode))
    });
  }

  toggle() {
    this.isDarkMode.update(isDark => !isDark);
  }
}
