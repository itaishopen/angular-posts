import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PostsState} from './post.model';

const getPostsState = createFeatureSelector<PostsState>('posts');
export const selectAllPosts = createSelector(getPostsState, state => state.posts);
export const selectCurrentPostId = createSelector(getPostsState, state => state.selectedId);
export const selectLoading = createSelector(getPostsState, state => state.loading);
export const selectDarkMode = createSelector(getPostsState, state => state.darkMode);
