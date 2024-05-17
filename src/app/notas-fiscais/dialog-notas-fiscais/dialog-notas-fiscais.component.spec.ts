import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNotasFiscaisComponent } from './dialog-notas-fiscais.component';

describe('DialogNotasFiscaisComponent', () => {
  let component: DialogNotasFiscaisComponent;
  let fixture: ComponentFixture<DialogNotasFiscaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNotasFiscaisComponent]
    });
    fixture = TestBed.createComponent(DialogNotasFiscaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
