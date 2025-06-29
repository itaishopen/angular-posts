import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { of, throwError, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { PostsEffects } from './posts.effects';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure
} from './posts.actions';

describe('PostsEffects', () => {
  let actions$: Subject<any>;
  let effects: PostsEffects;
  let http: jest.Mocked<HttpClient>;

  beforeEach(() => {
    actions$ = new Subject();

    const httpMock = {
      get: jest.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        provideMockActions(() => actions$),
        provideMockStore(),
        { provide: HttpClient, useValue: httpMock }
      ]
    });

    effects = TestBed.inject(PostsEffects);
    http = TestBed.inject(HttpClient) as jest.Mocked<HttpClient>;
  });

  afterEach(() => {
    actions$.complete();
  });

  it('should dispatch loadPostsSuccess on successful HTTP call', (done) => {
    const mockPosts = [{ id: 1, title: 'Post', userId: 1, body: '...' }];
    http.get.mockReturnValue(of(mockPosts));

    effects.loadPosts$.subscribe(action => {
      expect(action).toEqual(loadPostsSuccess({ posts: mockPosts }));
      done();
    });

    actions$.next(loadPosts());
  });

  it('should dispatch loadPostsFailure on HTTP error', (done) => {
    const error = new Error('HTTP Error');
    http.get.mockReturnValue(throwError(() => error));

    effects.loadPosts$.subscribe(action => {
      expect(action).toEqual(loadPostsFailure({ error }));
      done();
    });

    actions$.next(loadPosts());
  });
});
