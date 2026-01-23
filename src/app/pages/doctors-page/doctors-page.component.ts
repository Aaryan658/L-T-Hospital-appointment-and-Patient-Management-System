import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DoctorListComponent } from '../../components/doctor-list/doctor-list.component';
import { DoctorService } from '../../services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctors-page',
  standalone: true,
  imports: [CommonModule, DoctorListComponent],
  template: `
    <div class="page-container">
      <app-doctor-list [doctors]="doctors" (bookDoctor)="onBook($event)"></app-doctor-list>
    </div>
  `,
  styles: [`
    .page-container { padding: 20px; }
  `]
})
export class DoctorsPageComponent implements OnInit {
  doctors: Doctor[] = [];

  constructor(private router: Router, private doctorService: DoctorService) { }

  ngOnInit() {
    this.doctorService.getDoctors().subscribe(data => {
      this.doctors = data;
    });
  }

  onBook(doctor: Doctor) {
    this.router.navigate(['/appointments'], { queryParams: { doctorId: doctor.id } });
  }
}
