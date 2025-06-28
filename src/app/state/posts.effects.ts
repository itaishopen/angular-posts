import {createEffect} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {Actions, ofType } from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {of, switchMap, map, catchError, tap} from 'rxjs';

import {
  loadDarkMode,
  loadPosts,
  loadPostsFailure,
  loadPostsSuccess,
  saveDarkMode,
  setDarkMode
} from './posts.actions';
import {Store} from '@ngrx/store';

@Injectable()
export class PostsEffects {
  constructor(private store: Store,
              private http: HttpClient,
              private actions$: Actions) {
  }
 loadPosts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        this.http.get<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=100')
          .pipe(
            map(posts => loadPostsSuccess({ posts })),
            catchError(error =>
              of(loadPostsFailure({ error }))
            )
          )
        )
      )
  );

  saveDarkMode$ = createEffect(() =>
      this.actions$.pipe(
        ofType(saveDarkMode),
        tap((darkMode) => {
          localStorage.setItem('darkMode', JSON.stringify(darkMode.isDarkMode));
          return of(setDarkMode({isDarkMode: JSON.parse(localStorage.getItem('darkMode')!)}));
        })
      ),
    { dispatch: false }
  );

  loadDarkMode$ = createEffect(() =>
      this.actions$.pipe(
        ofType(loadDarkMode),
        tap(() => {
          return of(setDarkMode({isDarkMode: JSON.parse(localStorage.getItem('darkMode')!)}));
        })
      ),
    { dispatch: false }
  );
}


