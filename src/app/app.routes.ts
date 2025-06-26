import { Routes } from '@angular/router';
import {PostGridComponent} from './component/post-grid/post-grid.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: PostGridComponent },
];
