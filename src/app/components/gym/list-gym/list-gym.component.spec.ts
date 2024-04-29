import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGymComponent } from './list-gym.component';

describe('ListGymComponent', () => {
  let component: ListGymComponent;
  let fixture: ComponentFixture<ListGymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGymComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListGymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
