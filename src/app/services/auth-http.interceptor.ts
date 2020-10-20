import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { getString } from "@nativescript/core/application-settings";
import { Observable } from "rxjs";

export const InterceptorSkipHeader = "";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const token = getString("token");

        //saltea el agregado del token
        if (req.headers.has(InterceptorSkipHeader)) {
            const headers = req.headers.delete(InterceptorSkipHeader);
            return next.handle(req.clone({ headers }));
        }
        console.log("TOKEN:", token);
        console.log("REQUEST:", req);
        // if (!req || !req.url || req.url.startsWith("http")) {
        //     console.log("request vacio o url incorrecta:", req, req.url);
        //     return next.handle(req);
        // } else {
        //     console.log("request correcta:", req);
        // }

        console.log("TOKEN:", token);
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: "Bearer " + token,
                },
            });
        } else {
            console.log("TOKEN VACIO:", req);
        }
        console.log("REQUEST WITH HEADER:", req);
        return next.handle(req);
    }
}
