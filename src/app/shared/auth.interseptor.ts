import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {AuthService} from "../admin/shared/services/auth.service";
import {Router} from "@angular/router";
import {catchError, tap} from "rxjs/operators";

@Injectable()
export class AuthInterseptor implements HttpInterceptor {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthentication()) {
      req = req.clone({
        setParams: {
          auth: this.auth.token
        }
      })
    }

    return next.handle(req)
      .pipe(
        tap(() => {
          console.log('Intersept');
        }),
        catchError((error: HttpErrorResponse) => {
          console.log('[Interseptor Error]: ', error);

          if (error.status === 401) {
            this.auth.logout();
            this.router.navigate(['/admin', 'login'], {
              queryParams: {
                authFailer: true
              }
            });
          }

          return throwError(error);
        })
      )
  }
}
