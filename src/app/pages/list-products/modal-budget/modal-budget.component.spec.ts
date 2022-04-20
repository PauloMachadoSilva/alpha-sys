import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBudgetComponent } from './modal-budget.component';

describe('ModalBudgetComponent', () => {
  let component: ModalBudgetComponent;
  let fixture: ComponentFixture<ModalBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
