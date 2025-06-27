import {TestBed, ComponentFixture} from '@angular/core/testing';
import {provideMockStore} from '@ngrx/store/testing';

import {App} from './app';
import {initialState} from './state/initial-state.model';


describe('App (standalone)', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideMockStore({ initialState: initialState }),
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the App component', () => {
    expect(component).toBeTruthy();
  });
});
