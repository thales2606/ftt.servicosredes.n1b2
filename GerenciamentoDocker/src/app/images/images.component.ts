import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from '../app.service';
import { ImageModel } from '../models/image.model';
import { PullImageComponent } from './pull-image/pull-image.component';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css']
})
export class ImagesComponent implements OnInit {
  images: ImageModel[];
  displayedColumns: string[] = ['REPOSITORY', 'IMAGE_ID', 'SIZE', 'actions'];
  constructor(private appService: AppService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.preencherImages();
  }
  preencherImages() {
    this.appService.getAllImages()
      .subscribe(result => {
        this.images = result;
      });
  }
  pullImage() {
    const dialogRef = this.dialog.open(PullImageComponent, {
      width: '350px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.preencherImages()
    });
  }
  deleteImage(imageId: string) {
    this.appService.deleteImage(imageId)
      .subscribe(result => {
        this.preencherImages()
      });
  }
  deleteImagesUnused() {
    this.appService.deleteImagesUnused()
      .subscribe(result => {
        this.preencherImages()
      });
  }
}
