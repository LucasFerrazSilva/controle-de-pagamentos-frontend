import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDisplayerComponent } from './message-displayer.component';

describe('MessageDisplayerComponent', () => {
  let component: MessageDisplayerComponent;
  let fixture: ComponentFixture<MessageDisplayerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageDisplayerComponent]
    });
    fixture = TestBed.createComponent(MessageDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
