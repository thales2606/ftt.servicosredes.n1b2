import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';
import { ContainerModel } from 'src/app/models/container.model';
import { HostConfigModel } from 'src/app/models/host-config.model';

@Component({
  selector: 'app-create-container',
  templateUrl: './create-container.component.html',
  styleUrls: ['./create-container.component.css']
})
export class CreateContainerComponent implements OnInit {
  data: ContainerModel = new ContainerModel();
  constructor(private appService: AppService,
    public dialogRef: MatDialogRef<CreateContainerComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  Cadastrar() {
    let jsonExposed = '{"' + this.data.PortaExposta + '/tcp": { }}'
    this.data.ExposedPorts = JSON.parse(jsonExposed);
    let json = '{"' + this.data.Porta + '/tcp": [{ "HostPort": "' + this.data.Porta + '", "HostIp":"" }]}'

    this.data.HostConfig = new HostConfigModel();
    this.data.HostConfig.PortBindings = JSON.parse(json);
    this.data.HostConfig.RestartPolicy = { Name: "always" };


    this.appService.createContainer(this.data)
      .subscribe(result => {
        this.appService.startContainer(this.data)
          .subscribe(result => {
            this.dialogRef.close(true);
          }, err => {
            console.error(err);
            this._snackBar.open("Não foi possivel iniciar o novo container!", "X", {
              duration: 5000,
            })
          })
      }, err => {
        console.error(err);
        this._snackBar.open("Não foi possivel criar um novo container!", "X", {
          duration: 5000,
        });
      });
  }
}
