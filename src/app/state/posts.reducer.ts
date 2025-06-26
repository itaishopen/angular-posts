import { createReducer, on } from '@ngrx/store';
import {loadPostsSuccess, selectPost, clearSelection, loadPosts} from './posts.actions';
import {Post} from './post.model';

export interface PostsState {
  posts: Post[];
  selectedId?: number;
  loading: boolean;
  error?: any;
}
export const initialState: PostsState = {
  posts: [] as Post[],
  selectedId: undefined,
  loading: false
};

export const postsReducer = createReducer(
  initialState,
  on(loadPosts, state => ({ ...state, loading: true, error: undefined })),
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false })),
  on(selectPost, (state, { id }) => ({ ...state, selectedId: id })),
  on(clearSelection, state => ({ ...state, selectedId: undefined }))
);
