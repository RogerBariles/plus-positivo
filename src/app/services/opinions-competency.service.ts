import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment.dev';
import { take } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class OpinionsCompetencyService {

    endpoint = "api/opinion-competencias";

    constructor(
        private http: HttpClient
    ) { }

    updateOpinionCompetencias(body) {
        return this.http.put(environment.apiUrl + this.endpoint, body).pipe(take(1));
    }

}