import { Component, OnInit } from '@angular/core';
import { throwError } from 'rxjs';
import { GatewayModel } from 'src/app/models/gateway.model';
import { DeviceService } from 'src/app/services/device.service';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.component.html',
  styleUrls: ['./gateways.component.scss']
})
export class GatewaysComponent implements OnInit {

  gateways: GatewayModel[] = [];

  constructor(
    private _gatewayService: GatewayService,
  ){}

  ngOnInit(): void {
    this.getAllGateways();
  }

  getAllGateways() {
    this._gatewayService.checkGateways$().subscribe({
      next: (response) => {
        // console.log('Response: '+ JSON.stringify(response.gateways));
        this.gateways = response.gateways!;
      },
      error: (e) => {
        console.error(e),
        throwError(() => e);
      },
      complete: () => { }
    });
  }

  deleteGateway(gatewayId: number){
    this._gatewayService.deleteGateway$(gatewayId)
    .subscribe( response => {
          if(response.ok === true){
            this.getAllGateways();
          }
    });
  }
}
