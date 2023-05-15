import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceModel, DeviceStatus } from 'src/app/models/device.model';
import { GatewayModel } from 'src/app/models/gateway.model';
import { DeviceService } from 'src/app/services/device.service';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.scss']
})
export class NewDeviceComponent implements OnInit {
  device: DeviceModel = new DeviceModel(0, DeviceStatus.Offline, '', '');
  gateway: GatewayModel = new GatewayModel(0, '', '');
  gatewayId: any;

  constructor(
    private _deviceService: DeviceService,
    private _gatewayService: GatewayService,
    private activateRoute: ActivatedRoute,
    private _datePipe: DatePipe,
    private router: Router
  ){ }

  ngOnInit(): void {
    this.activateRoute.params.subscribe( params => {
      this.gatewayId = params['gatewayId'];
      const deviceId = params['deviceId'];
      if ( deviceId !== 'new' ) {
        this.loadGateway( this.gatewayId );
      }
    });
  }

  addDevice( f: NgForm ) {
    if ( f.invalid ) {
      return;
    }
    const currentDate = new Date();
    const formattedDate = this._datePipe.transform(currentDate, 'yyyy-MM-ddTHH:mm:ss.SSSZ');
    const formData: DeviceModel = {
      uid: f.value.uid,
      vendor: f.value.vendor,
      date: formattedDate!,
      status: f.value.status
    };
    this._deviceService.addDeviceForGateway$(this.gatewayId, formData)
        .subscribe( response => {
          console.log(response);
          this.router.navigate([`/devices/${this.gatewayId}`]);
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

}
