import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PostGridComponent } from './post-grid.component';
import { selectAllPosts, selectCurrentPostId, selectLoading } from '../../state/posts.selectors';
import { loadPosts } from '../../state/posts.actions';

describe('PostGridComponent', () => {
  let component: PostGridComponent;
  let fixture: ComponentFixture<PostGridComponent>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostGridComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllPosts, value: [] },
            { selector: selectCurrentPostId, value: 0 },
            { selector: selectLoading, value: false },
          ]
        })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(PostGridComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should dispatch loadPosts on init', () => {
    expect(dispatchSpy).toHaveBeenCalledWith(loadPosts());
  });

  it('should update isDarkMode and toggle dark-theme class', () => {
    const original = component.isDarkMode();
    component.toggle();
    expect(component.isDarkMode()).toBe(!original);
    fixture.detectChanges()
    const hasDark = document.body.classList.contains('dark-theme');
    expect(hasDark).toBe(component.isDarkMode());
  });
});
