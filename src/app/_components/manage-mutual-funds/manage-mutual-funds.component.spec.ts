import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageMutualFundsComponent } from './manage-mutual-funds.component';

describe('ManageMutualFundsComponent', () => {
  let component: ManageMutualFundsComponent;
  let fixture: ComponentFixture<ManageMutualFundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageMutualFundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageMutualFundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
