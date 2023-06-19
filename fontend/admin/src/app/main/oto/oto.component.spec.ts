import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtoComponent } from './oto.component';

describe('OtoComponent', () => {
  let component: OtoComponent;
  let fixture: ComponentFixture<OtoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
