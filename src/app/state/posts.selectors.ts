import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.reducer';

const getPostsState = createFeatureSelector<PostsState>('posts');
export const selectAllPosts = createSelector(getPostsState, s => s.posts);
export const selectCurrentPostId = createSelector(getPostsState, s => s.selectedId);
export const selectLoading = createSelector(getPostsState, state => state.loading);
