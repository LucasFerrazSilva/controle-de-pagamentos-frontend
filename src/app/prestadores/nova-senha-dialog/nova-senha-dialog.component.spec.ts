import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaSenhaDialogComponent } from './nova-senha-dialog.component';

describe('NovaSenhaDialogComponent', () => {
  let component: NovaSenhaDialogComponent;
  let fixture: ComponentFixture<NovaSenhaDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovaSenhaDialogComponent]
    });
    fixture = TestBed.createComponent(NovaSenhaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
