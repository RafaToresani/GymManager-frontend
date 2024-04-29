import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMembershipComponent } from './create-membership.component';

describe('CreateMembershipComponent', () => {
  let component: CreateMembershipComponent;
  let fixture: ComponentFixture<CreateMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateMembershipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
