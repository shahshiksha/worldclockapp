import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmemeberComponent } from './addmemeber.component';

describe('AddmemeberComponent', () => {
  let component: AddmemeberComponent;
  let fixture: ComponentFixture<AddmemeberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddmemeberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddmemeberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
