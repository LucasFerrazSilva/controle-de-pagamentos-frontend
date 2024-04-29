import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcluirParametroComponent } from './excluir-parametro.component';

describe('ExcluirParametroComponent', () => {
  let component: ExcluirParametroComponent;
  let fixture: ComponentFixture<ExcluirParametroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExcluirParametroComponent]
    });
    fixture = TestBed.createComponent(ExcluirParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
