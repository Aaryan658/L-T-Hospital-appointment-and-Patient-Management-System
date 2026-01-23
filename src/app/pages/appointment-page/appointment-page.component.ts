import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AppointmentFormComponent } from '../../components/appointment-form/appointment-form.component';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-appointment-page',
  standalone: true,
  imports: [CommonModule, AppointmentFormComponent],
  template: `
    <div class="page-container">
      <app-appointment-form [doctors]="doctors" [selectedDoctorId]="selectedDoctorId"></app-appointment-form>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; display: flex; justify-content: center; }
  `]
})
export class AppointmentPageComponent implements OnInit {
  doctors: Doctor[] = [];
  selectedDoctorId: number | null = null;

  constructor(private route: ActivatedRoute, private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });

    this.route.queryParams.subscribe(params => {
      if (params['doctorId']) {
        this.selectedDoctorId = Number(params['doctorId']);
      }
    });
  }
}
