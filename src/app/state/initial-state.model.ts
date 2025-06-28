import {Post, PostsState} from './post.model';

export const initialState: PostsState = {
  posts: [] as Post[],
  selectedId: 0,
  loading: false,
  error: null,
  darkMode: false
};
