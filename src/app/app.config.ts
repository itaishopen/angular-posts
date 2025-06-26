import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import {provideStore} from '@ngrx/store';
import {postsReducer} from './state/posts.reducer';
import {provideHttpClient} from '@angular/common/http';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {loadPosts$} from './state/posts.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideStore({ posts: postsReducer }),
    provideEffects({ loadPosts$ }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes)
  ]
};
