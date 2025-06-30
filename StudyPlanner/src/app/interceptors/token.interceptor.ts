/*import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const newReq = req.clone({
    setHeaders: {
      Authorization: `token ${token}`
    }
  })
  return next(newReq);
};
*/