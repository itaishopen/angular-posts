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
  isSpinning = false;

  currentIdx = signal(0);
  private store = inject(Store);

  /**
   * Indicates whether the current post is selected.
   *
   * @returns `true` if the post's ID matches the selected ID; otherwise, `false`.
   */
  get isSelected() { return this.post.id === this.selectedId; }

  /**
   * Retrieves the current content to display from the post, based on the current index.
   *
   * Cycles through the post's `title`, `userId`, `id`, and `body` properties,
   * returning the value at the index specified by `currentIdx()`.
   *
   * @returns The selected content field of the post.
   */
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
   * Handles the click event on a post square.
   *
   *  Triggers a spin animation by setting `isSpinning` to `true` for 600ms.
   *  If the post is not currently selected, dispatches a `selectPost` action
   *   with the post's ID and resets the content index to 1.
   *  If the post is already selected, cycles the `currentIdx` to show the next
   *   property in the post (`title`, `userId`, `id`, `body`).
   */
  handleClick() {
    this.isSpinning = true;
    setTimeout(() => {
      this.isSpinning = false;
    }, 600);
    if (!this.isSelected) {
      this.store.dispatch(selectPost({id: this.post.id}));
      this.currentIdx.set(1);
      return;
    }
    this.currentIdx.update(i => (i + 1) % 4);
  }
}
