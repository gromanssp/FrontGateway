import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { ResponseModel } from '../models/response.model';
import { AppSettings } from '../app-settings';
import { DeviceModel } from '../models/device.model';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  constructor( private http: HttpClient ) { }

  checkDevices$(): Observable<ResponseModel> {
    const url = `${AppSettings.BASE_URL}/gateways`;
    return this.http.get<ResponseModel>(url)
    .pipe(tap(console.log), catchError(this.handlerError));
  };

  loadDevicesForGateway$(IdGateway: number): Observable<DeviceModel[]> {
    const url = `${AppSettings.BASE_URL}/devices/${IdGateway}/devices`;
    return this.http.get<DeviceModel[]>(url)
    .pipe(tap(console.log), catchError(this.handlerError));
  };


  addDeviceForGateway$ = (idGateway: any, formData: DeviceModel) =>
    <Observable<ResponseModel>>(
      this.http
        .post<ResponseModel>(
          `${AppSettings.BASE_URL}/devices/${idGateway}/devices`,
          formData
        )
        .pipe(tap(console.log), catchError(this.handlerError))
    );

    private handlerError(error: HttpErrorResponse): Observable<never> {
      console.log(error);
      const err = new Error(`An error corred - Error code: ${error.status}`);
      return throwError(() => err);
    }

    deleteDevice$(deviceId: number): Observable<ResponseModel> {
      const url = `${AppSettings.BASE_URL}/devices/devices/${deviceId}`;
      return this.http.delete<ResponseModel>(url)
      .pipe(tap(console.log), catchError(this.handlerError));
    };
}
