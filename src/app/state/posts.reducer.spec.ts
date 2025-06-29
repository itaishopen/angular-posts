import { postsReducer } from './posts.reducer';
import { initialState } from './initial-state.model';
import { loadPosts, loadPostsSuccess, selectPost, clearSelection } from './posts.actions';
import {mockPost1, mockPost2} from './mock-posts';

describe('postsReducer', () => {
  it('should set loading true on loadPosts', () => {
    const newState = postsReducer(initialState, loadPosts());
    expect(newState).toEqual({
      ...initialState,
      loading: true,
      error: undefined,
    });
  });

  it('should set posts and loading false on loadPostsSuccess', () => {
    const posts = [mockPost1, mockPost2];
    const newState = postsReducer(
      { ...initialState, loading: true },
      loadPostsSuccess({ posts })
    );
    expect(newState).toEqual({
      ...initialState,
      posts,
      loading: false,
    });
  });

  it('should set selectedId on selectPost', () => {
    const newState = postsReducer(initialState, selectPost({ id: 7 }));
    expect(newState.selectedId).toBe(7);
  });

  it('should reset selectedId to 0 on clearSelection', () => {
    const stateWithSelected = { ...initialState, selectedId: 7 };
    const newState = postsReducer(stateWithSelected, clearSelection());
    expect(newState.selectedId).toBe(0);
  });
});
