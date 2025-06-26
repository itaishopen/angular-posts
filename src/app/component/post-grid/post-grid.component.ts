import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {PostSquareComponent} from '../post-square/post-square.component';
import {selectAllPosts, selectCurrentPostId, selectLoading} from '../../state/posts.selectors';
import {loadPosts} from '../../state/posts.actions';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';



@Component({
  selector: 'app-post-grid',
  imports: [
    PostSquareComponent,
    AsyncPipe,
    NgIf,
    NgForOf
  ],
  templateUrl: './post-grid.component.html',
  styleUrl: './post-grid.component.scss',
  standalone: true
})
export class PostGridComponent{
  posts$;
  selectedId$;
  loading$
  constructor(private store: Store) {
    this.store.dispatch(loadPosts());
    this.posts$ = this.store.select(selectAllPosts);
    this.selectedId$ = this.store.select(selectCurrentPostId);
    this.loading$ = this.store.select(selectLoading);
  }

  trackById(_: number, post: any) { return post.id; }
}
