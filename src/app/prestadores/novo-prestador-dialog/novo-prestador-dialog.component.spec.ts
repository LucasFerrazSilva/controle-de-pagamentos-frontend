import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoPrestadorDialogComponent } from './novo-prestador-dialog.component';

describe('NovoPrestadorDialogComponent', () => {
  let component: NovoPrestadorDialogComponent;
  let fixture: ComponentFixture<NovoPrestadorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovoPrestadorDialogComponent]
    });
    fixture = TestBed.createComponent(NovoPrestadorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
