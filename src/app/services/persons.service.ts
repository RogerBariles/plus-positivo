import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { take } from "rxjs/operators";
import { People } from "../models/people";

@Injectable()
export class PersonsService {
    constructor(private http: HttpClient) {}

    getAllPersonas(contains: string) {
        return this.http
            .get(
                environment.apiUrl +
                    "api/personas?apellidosPrs.contains=" +
                    contains
            )
            .pipe(take(1));
    }

    getPeopleById(id: number) {
        return this.http
            .get(environment.apiUrl + "api/personas/" + id)
            .pipe(take(1));
    }

    updateOpinionPeople(OpinionsPeople) {
        const header = new HttpHeaders().append(
            "Content-Type",
            "application/json"
        );

        return this.http
            .post(environment.apiUrl + "api/opinions/nueva", JSON.stringify(OpinionsPeople), {
                headers: header,
            })
            .pipe(take(1));
    }

    getAllConetext() {
        return this.http.get(environment.apiUrl + 'api/contextos').pipe(take(1));
    }
}
