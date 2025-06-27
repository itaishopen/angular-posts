import { bootstrapApplication } from '@angular/platform-browser';
import {provideHttpClient} from '@angular/common/http';
import {provideStore} from '@ngrx/store';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import {provideEffects} from '@ngrx/effects';

import {postsReducer} from './app/state/posts.reducer';
import { App } from './app/app';
import {PostsEffects} from './app/state/posts.effects';

bootstrapApplication(App, {
  providers: [
    provideHttpClient(),
    provideStore({ posts: postsReducer }),
    provideEffects([PostsEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
}).catch(console.error);
