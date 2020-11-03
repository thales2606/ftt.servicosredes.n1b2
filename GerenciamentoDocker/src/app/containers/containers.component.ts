import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../app.service';
import { ContainerModel } from '../models/container.model';
import { PortModel } from '../models/port.model';
import { CreateContainerComponent } from './create-container/create-container.component';

@Component({
  selector: 'app-containers',
  templateUrl: './containers.component.html',
  styleUrls: ['./containers.component.css']
})
export class ContainersComponent implements OnInit {
  containers: ContainerModel[] = [];
  displayedColumns: string[] = ['CONTAINER_ID', 'IMAGE', 'COMMAND', 'State', 'STATUS', 'PORTS', 'NAMES', 'actions'];
  constructor(private appService: AppService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.preencherContainers();
  }
  preencherContainers() {
    this.appService.getAllContainers()
      .subscribe(result => {
        this.containers = result;
      });
  }
  joinArrayPorts(portas: PortModel[]) {
    return portas.map(function (elem) {
      return elem.IP + ':' + elem.PublicPort + '->' + elem.PrivatePort + '/' + elem.Type;
    }).join(";");
  }
  criarContainer() {
    const dialogRef = this.dialog.open(CreateContainerComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.preencherContainers()
    });
  }
  deleteContainer(id: string) {
    this.appService.deleteContainer(id)
      .subscribe(result => {
        this.preencherContainers();
      }, err => {
        console.error(err);
        this._snackBar.open("Não foi possivel excluir esse container!", "X", {
          duration: 5000,
        })
      })
  }
  deleteContainersParados() {
    this.appService.deleteContainersParados()
      .subscribe(result => {
        this.preencherContainers();
      }, err => {
        console.error(err);
        this._snackBar.open("Não foi possivel excluir containers!", "X", {
          duration: 5000,
        })
      })
  }
}
