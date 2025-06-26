import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import {provideHttpClient} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {postsReducer} from './app/state/posts.reducer';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {loadPosts$} from './app/state/posts.effects';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideStore({ posts: postsReducer }),
    provideEffects({ loadPosts$ }),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
}).catch(console.error);
