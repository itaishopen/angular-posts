import {Component} from '@angular/core';
import {PostGridComponent} from './component/post-grid/post-grid.component';

@Component({
  selector: 'app-root',
  imports: [PostGridComponent],
  templateUrl: './app.html',
  standalone: true
})
export class App {
}
