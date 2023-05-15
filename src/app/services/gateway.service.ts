import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { GatewayModel } from '../models/gateway.model';
import { AppSettings } from '../app-settings';
import { ResponseModel } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class GatewayService {

  constructor( private http: HttpClient) { }

  checkGateways$(): Observable<ResponseModel> {
    const url = `${AppSettings.BASE_URL}/gateways`;
    return this.http.get<ResponseModel>(url)
    .pipe(tap(console.log), catchError(this.handlerError));
  };

  loadGateway$(gatewayId: number): Observable<ResponseModel> {
    const url = `${AppSettings.BASE_URL}/gateways/${gatewayId}`;
    console.log('service' + url);
    return this.http.get<ResponseModel>(url)
    .pipe(tap(console.log), catchError(this.handlerError));
  };

  addGateway$ = (formData: GatewayModel) =>
    <Observable<ResponseModel>>(
      this.http
        .post<ResponseModel>(
          `${AppSettings.BASE_URL}/gateways`,
          formData
        )
        .pipe(tap(console.log), catchError(this.handlerError))
    );

    private handlerError(error: HttpErrorResponse): Observable<never> {
      console.log(error);
      const err = new Error(`An error corred - Error code: ${error.status}`);
      return throwError(() => err);
    }

    deleteGateway$(gatewayId: number): Observable<ResponseModel> {
      const url = `${AppSettings.BASE_URL}/gateways/${gatewayId}`;
      return this.http.delete<ResponseModel>(url)
      .pipe(tap(console.log), catchError(this.handlerError));
    };
}
