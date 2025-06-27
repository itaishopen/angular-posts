import {
  selectAllPosts,
  selectCurrentPostId,
  selectLoading,
} from './posts.selectors';
import {Post, PostsState} from './post.model';
import {mockPost1} from './mock-posts';

describe('Posts Selectors', () => {
  const createMockState = (overrides: Partial<PostsState> = {}): { posts: PostsState } => ({
    posts: {
      posts: [] as Post[],
      selectedId: 0,
      loading: false,
      ...overrides
    }
  });

  it('should return an array of posts when selectAllPosts is called', () => {
    const mockPosts = [mockPost1] as Post[];
    const state = createMockState({ posts: mockPosts });
    expect(selectAllPosts.projector(state.posts)).toBe(mockPosts);
  });

  it('should return the selectedId when selectCurrentPostId  is called', () => {
    const state = createMockState({ selectedId: 42 });
    expect(selectCurrentPostId.projector(state.posts)).toBe(42);
  });

  it('should return the loading when selectLoading is called', () => {
    const state = createMockState({ loading: true });
    expect(selectLoading.projector(state.posts)).toBe(true);
  });
});
