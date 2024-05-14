import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EMPTY, Observable } from "rxjs";
import { LoginService } from "../login/login.service";
import { TokenService } from "./token.service";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService,
        private loginService: LoginService,
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        
        if (token) {
            if (this.loginService.checkTokenExpired()) {
                return EMPTY;
            }

            req = req.clone({
                setHeaders: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }

        return next.handle(req);
    }

}