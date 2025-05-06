import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConfigComponent } from './form-config.component';

describe('FormConfigComponent', () => {
  let component: FormConfigComponent;
  let fixture: ComponentFixture<FormConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormConfigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
