import { HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs/operators';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
    console.log(`[HTTP Request] ${req.method} ${req.url}`);

    return next(req).pipe(
        tap({
            next: (event) => {
                // Can log response events here if needed
            },
            error: (error) => {
                console.error('[HTTP Error]', error);
            }
        })
    );
};
