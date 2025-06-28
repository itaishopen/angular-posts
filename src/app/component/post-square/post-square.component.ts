import {Component, Input, signal, inject, OnChanges, SimpleChanges, numberAttribute} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import {selectPost} from '../../state/posts.actions';
import {Post} from '../../state/post.model';

@Component({
  selector: 'app-post-square',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post-square.component.html',
  styleUrls: ['./post-square.component.scss']
})
export class PostSquareComponent implements OnChanges {
  @Input() post!: Post;
  @Input({transform: numberAttribute}) selectedId?: number;

  currentIdx = signal(0);
  private store = inject(Store);

  get isSelected() { return this.post.id === this.selectedId; }

  get content() {
    const postLoop = [this.post.title, this.post.userId, this.post.id, this.post.body];
    return postLoop[this.currentIdx()];
  }

  ngOnChanges(changePost: SimpleChanges) {
    if (changePost['selectedId'] && !this.isSelected) {
      this.currentIdx.set(0);
    }
  }

  /**
   * Handles user clicks on the post square.
   *
   * If the square was not selected,
   *   it dispatches an NgRx action to select the post and
   *   immediately advances the displayed field to the next one.
   * If the square is selected, it cycles
   *   to the next field in the sequence (title → userId → id → body).
   */
  handleClick() {
    if (!this.isSelected) {
      this.store.dispatch(selectPost({id: this.post.id}));
      this.currentIdx.set(1);
      return;
    }
    this.currentIdx.update(i => (i + 1) % 4);
  }
}
