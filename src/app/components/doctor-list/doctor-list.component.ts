import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { Doctor } from '../../models/doctor.model';
import { DoctorFilterPipe } from '../../pipes/doctor-filter.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
    selector: 'app-doctor-list',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        DoctorFilterPipe,
        HighlightDirective,
        MatCardModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatDividerModule
    ],
    templateUrl: './doctor-list.component.html',
    styleUrl: './doctor-list.component.css'
})
export class DoctorListComponent {
    @Input() doctors: Doctor[] = [];
    @Output() bookDoctor = new EventEmitter<Doctor>();

    filterSpec: string = '';
    filterStatus: string = '';
    searchText: string = '';

    get availableDoctorsCount(): number {
        // Dynamic count based on real data status
        return this.doctors.filter(d => d.status === 'Available').length;
    }

    onBook(doctor: Doctor) {
        this.bookDoctor.emit(doctor);
    }
}
