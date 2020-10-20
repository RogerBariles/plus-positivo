import { environment } from '../../environments/environment'
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { take } from "rxjs/operators";

@Injectable()
export class AuthenticationService {

    idToken: any;

    constructor(private http: HttpClient) {
    }

    loguin(user) {
        const header = new HttpHeaders().append(
            "Content-Type",
            "application/json"
        );

        const body = {
            password: user.get("password").value,
            rememberMe: true,
            username: user.get("username").value,
        };

        return this.http
            .post(environment.apiUrl + "api/authenticate", JSON.stringify(body), {
                headers: header,
            })
            .pipe(take(1));
    }
}
