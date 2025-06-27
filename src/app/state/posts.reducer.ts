import {createReducer, on} from '@ngrx/store';

import {loadPostsSuccess, selectPost, clearSelection, loadPosts, loadDarkMode} from './posts.actions';
import {initialState} from './initial-state.model';


export const postsReducer = createReducer(
  initialState,
  on(loadPosts, state => ({ ...state, loading: true, error: undefined })),
  on(loadPostsSuccess, (state, { posts }) => ({ ...state, posts, loading: false })),
  on(selectPost, (state, { id }) => ({ ...state, selectedId: id })),
  on(clearSelection, (state) => ({ ...state, selectedId: 0 })),
  on(loadDarkMode, state => ({ ...state}))
);
