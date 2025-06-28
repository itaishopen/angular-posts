import { TestBed } from '@angular/core/testing';
import { PostsEffects } from './posts.effects';
import { HttpClient } from '@angular/common/http';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ActionsSubject } from '@ngrx/store';
import {of, take, throwError} from 'rxjs';
import {
  loadPosts,
  loadPostsSuccess,
  loadPostsFailure,
  saveDarkMode,
  loadDarkMode
} from './posts.actions';
import { selectDarkMode } from './posts.selectors';
import {mockPost1} from './mock-posts';

describe('PostsEffects', () => {
  let actions$ = new ActionsSubject();
  let effects: PostsEffects;
  let http: jest.Mocked<HttpClient>;
  let store: MockStore;

  beforeEach(() => {
    http = { get: jest.fn() } as any;
    TestBed.configureTestingModule({
      providers: [
        PostsEffects,
        { provide: HttpClient, useValue: http },
        provideMockStore({ selectors: [{ selector: selectDarkMode, value: true }] }),
        provideMockActions(() => actions$),  // Provides ActionsSubject internally
      ],
    });

    effects = TestBed.inject(PostsEffects);
    store = TestBed.inject(MockStore);
  });
  describe('#loadPosts$', () => {
    it('loadPosts$ dispatches loadPostsSuccess on HTTP success', done => {
      const mockPosts = [mockPost1];
      http.get.mockReturnValue(of(mockPosts));

      effects.loadPosts$.subscribe(action => {
        expect(action).toEqual(loadPostsSuccess({ posts: mockPosts }));
        done();
      });

      actions$.next(loadPosts());
    });

    it('should start loadPostsFailure when it gets error in  loadPosts$', done => {
      const err = new Error('fail');
      http.get.mockReturnValue(throwError(() => err));

      effects.loadPosts$
        .pipe(take(1)) // ensure only the first emission triggers the test
        .subscribe(action => {
          expect(action).toEqual(loadPostsFailure({ error: err }));
          done();
        });

      actions$.next(loadPosts());
    });
  })

  it('saveDarkMode$ writes to localStorage without dispatching', done => {
    localStorage.removeItem('darkMode');
    effects.saveDarkMode$.subscribe(() => {
      expect(localStorage.getItem('darkMode')).toBe(JSON.stringify(true));
      done();
    });
    actions$.next(saveDarkMode({ isDarkMode: true }));
  });

  it('loadDarkMode$ reads from localStorage without dispatching', done => {
    localStorage.setItem('darkMode', JSON.stringify(false));
    effects.loadDarkMode$.subscribe(() => {
      expect(localStorage.getItem('darkMode')).toBe(JSON.stringify(false));
      done();
    });
    actions$.next(loadDarkMode());
  });
});
