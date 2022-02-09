import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialContainerComponent } from './partial-container.component';

describe('PartialContainerComponent', () => {
  let component: PartialContainerComponent;
  let fixture: ComponentFixture<PartialContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PartialContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
