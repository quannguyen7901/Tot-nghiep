import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhComponent } from './kh.component';

describe('KhComponent', () => {
  let component: KhComponent;
  let fixture: ComponentFixture<KhComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KhComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
