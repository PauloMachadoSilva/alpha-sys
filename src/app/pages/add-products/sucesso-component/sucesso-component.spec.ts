import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucessoComponentComponent } from './sucesso-component.component';

describe('SucessoComponentComponent', () => {
  let component: SucessoComponentComponent;
  let fixture: ComponentFixture<SucessoComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SucessoComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SucessoComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
