import {
  loadPosts,
  loadPostsSuccess,
  selectPost,
  clearSelection,
  loadPostsFailure
} from './posts.actions';
import { Post } from './post.model';
import {mockPost1} from './mock-posts';

describe('Posts Actions', () => {
  it('should create loadPosts action', () => {
    const action = loadPosts();
    expect(action.type).toBe('[Posts] Load Posts');
    expect((action as any).posts).toBeUndefined();
  });

  it('should create loadPostsSuccess action with posts', () => {
    const mockPosts: Post[] = [mockPost1];
    const action = loadPostsSuccess({ posts: mockPosts });
    expect(action.type).toBe('[Posts] Load Posts Success');
    expect(action.posts).toEqual(mockPosts);
  });

  it('should create selectPost action with id', () => {
    const action = selectPost({ id: 42 });
    expect(action.type).toBe('[id] Select Post');
    expect(action.id).toBe(42);
  });

  it('should create clearSelection action', () => {
    const action = clearSelection();
    expect(action.type).toBe('[Posts] Clear Selection');
  });

  it('should create loadPostsFailure action with error', () => {
    const mockError = { message: 'fail' };
    const action = loadPostsFailure({ error: mockError });
    expect(action.type).toBe('[error] Load Posts Failure');
    expect(action.error).toEqual(mockError);
  });
});
