import { AdminService } from './../../_services/admin.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo-management',
  templateUrl: './photo-management.component.html',
  styleUrls: ['./photo-management.component.css']
})
export class PhotoManagementComponent implements OnInit {
photos: any;
  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getPhotosFroApproval();
  }
getPhotosFroApproval() {
  this.adminService.getPhotosForApproval().subscribe((photos) => {
  this.photos = photos;
  } , error => {
    console.log(error);

  });
}

approvedPhoto(photoId) {
  this.adminService.approvedPhoto(photoId).subscribe(() => {
    this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
  }, error => {
    console.log(error);

  });
}

rejectPhoto(photoId) {
  this.adminService.rejectPhoto(photoId).subscribe(() => {
    this.photos.splice(this.photos.findIndex(p => p.id === photoId), 1);
  }, error => {
    console.log(error);

  });
}
}