import { TestBed, ComponentFixture } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PostGridComponent } from './post-grid.component';
import { loadPosts } from '../../state/posts.actions';
import {
  selectAllPosts,
  selectCurrentPostId,
  selectLoading
} from '../../state/posts.selectors';
import { PostSquareComponent } from '../post-square/post-square.component';
import {mockPost1} from '../../state/mock-posts';

describe('PostGridComponent', () => {
  let fixture: ComponentFixture<PostGridComponent>;
  let component: PostGridComponent;
  let store: MockStore;

  const mockPosts = [
    mockPost1
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostGridComponent, PostSquareComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllPosts, value: mockPosts },
            { selector: selectCurrentPostId, value: 1 },
            { selector: selectLoading, value: false },
          ]
        }),
      ],
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(PostGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadPosts', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    fixture = TestBed.createComponent(PostGridComponent);
    expect(dispatchSpy).toHaveBeenCalledWith(loadPosts());
  });

  describe('should check loading', () => {
    it('should check that if loading is false the grid is created', () => {
      store.overrideSelector(selectLoading, false);
      store.refreshState();
      fixture.detectChanges();
      const grid = fixture.nativeElement.querySelector('.grid');
      expect(grid).not.toBeNull();
    });

    it('should not render the grid if loading is true', () => {
      store.overrideSelector(selectLoading, true);
      store.refreshState();
      fixture.detectChanges();

      const grid = fixture.nativeElement.querySelector('.grid');
      expect(grid).toBeNull();
    });
  })

  it('should change isDarkMode if toggle is call', () => {
    localStorage.removeItem('darkMode');
    const initial = component.isDarkMode();
    component.toggle();
    expect(component.isDarkMode()).toBe(!initial);
  });
});
