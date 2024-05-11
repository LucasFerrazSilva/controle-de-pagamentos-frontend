import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestadoresComponent } from './prestadores.component';

describe('PrestadoresComponent', () => {
  let component: PrestadoresComponent;
  let fixture: ComponentFixture<PrestadoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrestadoresComponent]
    });
    fixture = TestBed.createComponent(PrestadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
