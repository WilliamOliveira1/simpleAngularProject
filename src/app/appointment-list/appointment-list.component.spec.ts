import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppointmentListComponent } from './appointment-list.component';

describe('AppointmentListComponent', () => {
  let component: AppointmentListComponent;
  let fixture: ComponentFixture<AppointmentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentListComponent ],
      imports: [FormsModule] // Include FormsModule in imports
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListComponent);
    component = fixture.componentInstance;
    component.newAppointmentTitle = '';
    component.newAppointmentDate = new Date();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new appointment', () => {
    component.newAppointmentTitle = 'Test Appointment';
    component.newAppointmentDate = new Date();
    component.addAppointment();
    expect(component.appointments.length).toBe(1);
  });

  it('should initialize appointments from localStorage', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{ id: 1, title: 'Test', date: new Date() }]);
    });
    component.ngOnInit();
    expect(component.appointments.length).toBe(1);
  });  

  it('should not add a new appointment with empty title', () => {
    component.newAppointmentTitle = '';
    component.newAppointmentDate = new Date();    
    component.addAppointment();
    expect(component.appointments.length).toBe(0);
  });

  it('should delete an appointment', () => {
    component.appointments = [{ id: 1, title: 'Test', date: new Date() }];
    component.deleteAppointment(0);
    expect(component.appointments.length).toBe(0);
  });
});
