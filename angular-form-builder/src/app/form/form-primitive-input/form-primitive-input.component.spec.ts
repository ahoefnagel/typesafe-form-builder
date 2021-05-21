import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPrimitiveInputComponent } from './form-primitive-input.component';

describe('FormPrimitiveInputComponent', () => {
  let component: FormPrimitiveInputComponent;
  let fixture: ComponentFixture<FormPrimitiveInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPrimitiveInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPrimitiveInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
