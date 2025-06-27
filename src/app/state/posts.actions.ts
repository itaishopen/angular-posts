import { createAction, props } from '@ngrx/store';

import {Post} from './post.model';

/**
 * Action to initiate loading of posts.
 */
export const loadPosts = createAction('[Posts] Load Posts');

export const loadDarkMode = createAction('[darkMode] Load Dark Mode');


/**
 * Action dispatched when posts have been successfully loaded from the API.
 *
 * @param posts - Array of loaded Post objects
 */
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: Post[] }>());

/**
 * Action dispatched when there is an error loading posts from the API.
 *
 * @param error - Error object or message describing what went wrong
 */
export const loadPostsFailure = createAction('[error] Load Posts Failure', props<{ error: any }>());

/**
 * Action to select a specific post by its ID.
 *
 * @param id - The unique identifier of the post to select
 */
export const selectPost = createAction('[id] Select Post', props<{ id: number }>());

/**
 * Action to clear the current post selection.
 */
export const clearSelection = createAction('[Posts] Clear Selection');
