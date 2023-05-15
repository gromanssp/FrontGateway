import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GatewayModel } from 'src/app/models/gateway.model';
import { GatewayService } from 'src/app/services/gateway.service';

@Component({
  selector: 'app-new-gateway',
  templateUrl: './new-gateway.component.html',
  styleUrls: ['./new-gateway.component.scss']
})
export class NewGatewayComponent {
    gateway: GatewayModel = new GatewayModel(0,'', '');

    constructor(
      private _gatewayService: GatewayService,
      private activateRoute: ActivatedRoute,
      private router: Router
    ){
      this.activateRoute.params.subscribe( params => {
        const id = params['id'];
        if ( id !== 'new' ) {
          this.loadGateway( id );
        }
      });
    }

    addGateway( f: NgForm ) {
      if ( f.invalid ) {
        return;
      }
      const formData: GatewayModel = {
        fullName: f.value.fullName,
        ipv4Address: f.value.ipv4Address,
        serialNumber: f.value.serialNumber,
      };
      this._gatewayService.addGateway$(formData)
          .subscribe( response => {
            console.log(response);
            this.router.navigate(['/gateways']);
          });
    }

    loadGateway(gatewayId: number){
      this._gatewayService.loadGateway$(gatewayId)
      .subscribe( response => {
            if(response.gateways !== undefined){
              this.gateway = response.gateways[0];
            }
      });
    }
}
