import {postsReducer} from './posts.reducer';
import {
  loadPosts,
  loadPostsSuccess,
  selectPost,
  clearSelection
} from './posts.actions';
import {Post, PostsState} from './post.model';
import {initialState} from './initial-state.model';
import {mockPost1, mockPost2} from './mock-posts';



describe('postsReducer', () => {
  it('should return initialState when sending an UNKNOWN', () => {
    const state = postsReducer(undefined, { type: 'UNKNOWN' } as any);
    expect(state).toBe(initialState);
  });

  it('should change loading to true when loadPosts is called', () => {
    const action = loadPosts();
    const state = postsReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeUndefined();
  });

  it('should get post and change loading to false loadPostsSuccess', () => {
    const mockPosts: Post[] = [
      mockPost1,
      mockPost2
    ];
    const action = loadPostsSuccess({ posts: mockPosts });
    const state = postsReducer(
      { ...initialState, loading: true },
      action
    );
    expect(state.posts).toEqual(mockPosts);
    expect(state.loading).toBe(false);
  });

  describe('selectPost', () => {
      it('should set selectedId on selectPost', () => {
        const prevState: PostsState = {
          ...initialState,
          posts: [mockPost1],
          loading: false
        };
        const action = selectPost({ id: 5 });
        const state = postsReducer(prevState, action);
        expect(state.selectedId).toBe(5);
      });

    it('should not remove posts and loading when selecting post', () => {
      const prevState: PostsState = {
        posts: [mockPost1],
        loading: false,
        selectedId: 0
      };
      const action = selectPost({ id: 10 });
      const state = postsReducer(prevState, action);
      expect(state.posts).toBe(prevState.posts);
      expect(state.loading).toBe(prevState.loading);
    });
  })

  it('should clear selectedId on clearSelection', () => {
    const prevState: PostsState = {
      ...initialState,
      selectedId: 1,
      posts: [mockPost2],
      loading: false
    };
    const action = clearSelection();
    const state = postsReducer(prevState, action);
    expect(state.selectedId).toBe(0);
  });


});
