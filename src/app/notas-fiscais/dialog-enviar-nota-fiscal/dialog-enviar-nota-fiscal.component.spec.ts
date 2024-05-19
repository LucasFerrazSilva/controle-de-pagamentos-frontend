import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEnviarNotaFiscalComponent } from './dialog-enviar-nota-fiscal.component';

describe('DialogEnviarNotaFiscalComponent', () => {
  let component: DialogEnviarNotaFiscalComponent;
  let fixture: ComponentFixture<DialogEnviarNotaFiscalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogEnviarNotaFiscalComponent]
    });
    fixture = TestBed.createComponent(DialogEnviarNotaFiscalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
