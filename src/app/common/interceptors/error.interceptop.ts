import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
export class ErrorIntercept implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
          alert(errorMessage);
        } else {
          errorMessage = `Error Status: ${error.status}\nMessage: ${error.message}`;
          if (error.status === 429) {
            alert('Too many requests');
          } else if (error.status === 500) {
            alert('Internal Server Error');
          }
        }
        console.log(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
