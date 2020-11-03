import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-pull-image',
  templateUrl: './pull-image.component.html',
  styleUrls: ['./pull-image.component.css']
})
export class PullImageComponent implements OnInit {
  fromImage: string = "";
  versao: string = "";
  constructor(private appService: AppService,
    public dialogRef: MatDialogRef<PullImageComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }
  Cadastrar() {
    this.appService.pullImage(this.fromImage, this.versao)
      .subscribe(result => {
        this.dialogRef.close(true);
      }, err => {
        if (err.status != 200) {
          console.error(err);
          this._snackBar.open("Não foi possivel realizar o Pull!", "X", {
            duration: 5000,
          });
        }
        else
          this.dialogRef.close(true);
      });
  }
}
