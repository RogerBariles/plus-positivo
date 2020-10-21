import { Injectable } from "@angular/core";
import {
    HttpClient,
    HttpHeaderResponse,
    HttpHeaders,
    HttpParams,
} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { take } from "rxjs/operators";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "@nativescript/core";
import { People } from "../models/people";

@Injectable()
export class PersonsService {
    constructor(private http: HttpClient) {}

    getAllPersonas(contains: string) {
        const param = new HttpParams().append(
            "apellidosPrs.contains",
            contains
        );

        return this.http
            .get(
                environment.apiUrl +
                    'api/personas?apellidosPrs.contains=' +
                    contains
            )
            .pipe(take(1));
    }

    getPeopleById(id: number) {
        return this.http
            .get(environment.apiUrl + 'api/personas/' + id)
            .pipe(take(1));
    }
}
