import { createEffect } from '@ngrx/effects';
import { inject } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import {switchMap, map, catchError} from 'rxjs/operators';
import {loadPosts, loadPostsFailure, loadPostsSuccess} from './posts.actions';
import {of} from 'rxjs';

export const loadPosts$ = createEffect(
  (
    actions$ = inject(Actions),
    http = inject(HttpClient)
  ) =>
    actions$.pipe(
      ofType(loadPosts),
      switchMap(() =>
        http
          .get<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=100')
          .pipe(
            map(posts => loadPostsSuccess({ posts })),
            catchError(error =>
              of(loadPostsFailure({ error }))  // Dispatch failure action
            )
          )
      )
    ),
  { functional: true }
);
