import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../models/doctor.model';

@Pipe({
    name: 'doctorFilter',
    standalone: true
})
export class DoctorFilterPipe implements PipeTransform {

    transform(doctors: Doctor[], specialization: string, status: string, searchText: string = ''): Doctor[] {
        if (!doctors) return [];

        return doctors.filter(doctor => {
            const matchesSpec = specialization ? doctor.specialization === specialization : true;
            const matchesStatus = status ? doctor.status === status : true;

            const searchLower = searchText.toLowerCase();
            const matchesSearch = !searchText ||
                doctor.name.toLowerCase().includes(searchLower) ||
                doctor.specialization.toLowerCase().includes(searchLower);

            return matchesSpec && matchesStatus && matchesSearch;
        });
    }

}
