import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

import { PostSquareComponent } from './post-square.component';
import { selectPost } from '../../state/posts.actions';
import {mockPost2} from '../../state/mock-posts';

describe('PostSquareComponent', () => {
  let fixture: ComponentFixture<PostSquareComponent>;
  let component: PostSquareComponent;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSquareComponent],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    jest.spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(PostSquareComponent);
    component = fixture.componentInstance;
    component.post = mockPost2;
    component.selectedId = undefined;
    fixture.detectChanges();
  });

  it('should create component and show the post title', () => {
    const squareEl = fixture.debugElement.query(By.css('.square')).nativeElement;
    expect(component).toBeTruthy();
    expect(squareEl.textContent).toContain(mockPost2.title);
  });

  it('should reset currentIdx to 0 if another id id delected', () => {
    component.selectedId = 5;
    fixture.detectChanges();
    component.handleClick();
    expect(component.currentIdx()).toBe(1);

    component.selectedId = 6;
    component.ngOnChanges({ selectedId: { currentValue: 6 } as any } as any);
    expect(component.currentIdx()).toBe(0);
  });

  describe('#handleClick', () => {
    it('should dispatch selectPost and move to userId on first click', () => {
      component.selectedId = undefined;
      component.handleClick();

      expect(store.dispatch).toHaveBeenCalledWith(selectPost({ id: 1 }));
      expect(component.currentIdx()).toBe(1);
    });

    it('should cycle contents when already selected', () => {
      component.selectedId = 5;
      component.currentIdx.set(1);
      component.handleClick();
      expect(component.currentIdx()).toBe(1);
    });
  })

  it('content getter returns correct values based on currentIdx', () => {
    const values = [mockPost2.title, mockPost2.id, mockPost2.userId, mockPost2.body];
    for (let i = 0; i < values.length; i++) {
      component.currentIdx.set(i);
      expect(component.content).toBe(values[i]);
    }
  });
});
