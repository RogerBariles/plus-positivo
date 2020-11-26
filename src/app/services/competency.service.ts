import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.dev';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class CompetencyService {

    endpoint = "api/competencia-opinions";

    page = 0;
    size = 1;

    constructor(
        private http: HttpClient
    ) { }


    getAllCompetenciaOpinions() {

        const param = new HttpParams()
            .append("page", this.page.toString())
            .append("size", this.size.toString());

        return this.http.get(environment.apiUrl + this.endpoint, { params: param }).pipe(take(1));
    }

    getAllVigentes() {
        return this.http.get(environment.apiUrl + this.endpoint + '/vigentes').pipe(take(1));
    }

}