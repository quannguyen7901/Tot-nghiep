import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThueComponent } from './thue.component';

describe('ThueComponent', () => {
  let component: ThueComponent;
  let fixture: ComponentFixture<ThueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
