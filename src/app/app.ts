import { Component } from '@angular/core';
import {PostGridComponent} from './component/post-grid/post-grid.component';

@Component({
  selector: 'app-root',
  imports: [PostGridComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'angular-posts';
}
