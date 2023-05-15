import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceModel } from 'src/app/models/device.model';
import { DeviceService } from 'src/app/services/device.service';
import { GatewayService } from 'src/app/services/gateway.service';
import { GatewayModel } from 'src/app/models/gateway.model';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit{
  devices: DeviceModel[] | undefined = [];
  gateway: GatewayModel = new GatewayModel(0, '', '');
  gatewayId: any;

  constructor(
    private _deviceService: DeviceService,
    private _gatewayService: GatewayService,
    private activateRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      const id = params.get('id')!;
      this.gatewayId = id;
      this.loadGateway(id);
      this.loadDevicesForGateway(id);
    });
  }

  getAllDevices() {
    this._deviceService.checkDevices$().subscribe({
      next: (response) => {
        this.devices = response.devices;
      },
      error: (e) => {
        console.error(e),
        throwError(() => e);
      },
      complete: () => { }
    });
  }

  loadDevicesForGateway(gatewayId: any){
    this._deviceService.loadDevicesForGateway$(gatewayId)
    .subscribe( response => {
        this.devices = response;
    });
  }

  loadGateway(gatewayId: any){
    this._gatewayService.loadGateway$(gatewayId)
    .subscribe( response => {
          if(response.gateways !== undefined){
            this.gateway = response.gateways[0];
          }
        });
      }

  deleteDevice(deviceId: any){
    this._deviceService.deleteDevice$(deviceId)
      .subscribe( response => {
        if(response.ok === true){
          this.devices?.filter(device => device._id != deviceId);
          this.cdRef.detectChanges();
          this.getAllDevices();
      }
    });
  }
}
