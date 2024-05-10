import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHorasExtrasComponent } from './dialog-horas-extras.component';

describe('DialogHorasExtrasComponent', () => {
  let component: DialogHorasExtrasComponent;
  let fixture: ComponentFixture<DialogHorasExtrasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogHorasExtrasComponent]
    });
    fixture = TestBed.createComponent(DialogHorasExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
