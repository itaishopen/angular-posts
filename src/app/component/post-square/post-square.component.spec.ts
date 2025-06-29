import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import { PostSquareComponent } from './post-square.component';
import { selectPost } from '../../state/posts.actions';
import {mockPost2} from '../../state/mock-posts';

describe('PostSquareComponent', () => {
  let component: PostSquareComponent;
  let fixture: ComponentFixture<PostSquareComponent>;
  let store: MockStore;
  let dispatchSpy: jest.SpyInstance;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostSquareComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(PostSquareComponent);
    component = fixture.componentInstance;

    store = TestBed.inject(Store) as MockStore;
    dispatchSpy = jest.spyOn(store, 'dispatch');

    component.post = mockPost2;
  });

  it('should determine selection correctly', () => {
    component.selectedId = 1;
    expect(component.isSelected).toBe(true);

    component.selectedId = 2;
    expect(component.isSelected).toBe(false);
  });

  describe('currentIdx', () => {
    it('should return content based on currentIdx', () => {
      const postCycle = [mockPost2.title, mockPost2.userId, mockPost2.id, mockPost2.body];

      for (let i = 0; i < postCycle.length; i++) {
        component.currentIdx.set(i);
        expect(component.content).toBe(postCycle[i]);
      }
    });

    it('should reset currentIdx to 0 on ngOnChanges if not selected', () => {
      component.currentIdx.set(3);
      component.selectedId = 2;
      component.ngOnChanges({
        selectedId: {
          currentValue: 2,
          previousValue: 1,
          firstChange: false,
          isFirstChange: () => false
        }
      });
      expect(component.currentIdx()).toBe(0);
    });
    it('should dispatch selectPost and set currentIdx to 1 if not selected', fakeAsync(() => {
      component.selectedId = 15;
      component.handleClick();

      expect(dispatchSpy).toHaveBeenCalledWith(selectPost({ id: 1 }));
      expect(component.currentIdx()).toBe(1);

      expect(component.isSpinning).toBe(true);
      tick(600);
      expect(component.isSpinning).toBe(false);
    }));

    it('should set currentIdx if post is selected', fakeAsync(() => {
      component.selectedId = 1;
      component.currentIdx.set(1);
      component.handleClick();

      expect(dispatchSpy).not.toHaveBeenCalled();
      expect(component.currentIdx()).toBe(2);

      tick(600);
      expect(component.isSpinning).toBe(false);
    }));

    it('should cycle back to 0 when currentIdx is 3 and selected', () => {
      component.selectedId = 1;
      component.currentIdx.set(3);
      component.handleClick();
      expect(component.currentIdx()).toBe(0);
    });
  })
});
