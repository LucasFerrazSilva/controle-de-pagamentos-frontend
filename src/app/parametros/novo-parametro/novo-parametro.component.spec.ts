import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoParametroComponent } from './novo-parametro.component';

describe('NovoParametroComponent', () => {
  let component: NovoParametroComponent;
  let fixture: ComponentFixture<NovoParametroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoParametroComponent]
    });
    fixture = TestBed.createComponent(NovoParametroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
