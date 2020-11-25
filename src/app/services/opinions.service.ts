import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { take } from "rxjs/operators";
import { environment } from "@environments/environment";

@Injectable({ providedIn: "root" })
export class OpinionsService {

    endPoint = "api/opinions";
    size: number = 5;
    page: number = 0;

    constructor(private http: HttpClient) { }

    getOpinionsPromedioUser(codigoPrs) {
        return this.http
            .get(
                environment.apiUrl +
                this.endPoint +
                "/promedios-user/" +
                codigoPrs
            )
            .pipe(take(1));
    }

    getAllOpinionsByOpinadoId(id) {
        const param = new HttpParams()
            .append("opinadoId.equals", id)
            .append("page", this.page.toString())
            .append("size", this.size.toString())
            .append("sort", "fechaOpi,desc");
        this.page++;

        return this.http
            .get(environment.apiUrl + this.endPoint, { params: param })
            .pipe(take(1));
    }
}
