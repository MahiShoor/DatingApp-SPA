import { UserService } from './../../_services/user.service';
import { AuthService } from './../../_services/auth.service';
import { environment } from './../../../environments/environment';

import { Photo } from './../../_Models/photo';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { FileUploader } from 'ng2-file-upload';
import { AlerifyService } from 'src/app/_services/alerify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
@Input() photos: Photo[];
@Output() getMemberPhotoChange = new EventEmitter<string>();
uploader: FileUploader;
hasBaseDropZoneOver = false;
baseUrl = environment.apiUrl;
currentMain: Photo;

  constructor( private authService: AuthService, private userService: UserService , private alertify: AlerifyService) { }

  ngOnInit() {
    this.intializeUploader();
  }

   fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
intializeUploader() {
  this.uploader = new FileUploader({
 url: this.baseUrl + 'users/' + this.authService.decoddedToken.nameid + '/photos',
 authToken: 'Bearer ' + localStorage.getItem('token'),
 allowedFileType: ['image'],
 removeAfterUpload: true,
 autoUpload: false,
 maxFileSize: 10 * 1024 * 1024

  });
  this.uploader.onAfterAddingFile = (file) => {
    file.withCredentials = false;
  };

  this.uploader.onSuccessItem = (item, response, status, headers) => {
if (response) {
const res: Photo  = JSON.parse(response);
const photo = {
  id: res.id,
  url : res.url,
  dateAdded: res.dateAdded,
  description: res.description,
isMain: res.isMain,
isApproved: res.isApproved
};
this.photos.push(photo);
if (photo.isMain) {
  this.authService.changeMemberPhoto(photo.url);
// to persist the changed phot url
  this.authService.currentUser.photoUrl = photo.url;
  localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
}
}

  };
  console.log(this.uploader);

}

setMainPhoto(photo: Photo) {
this.userService.setMainPhoto(this.authService.decoddedToken.nameid, photo.id).subscribe(() => {
this.currentMain = this.photos.filter(p => p.isMain === true)[0];
this.currentMain.isMain = false;
photo.isMain = true;
this.authService.changeMemberPhoto(photo.url);
// to persist the changed phot url
this.authService.currentUser.photoUrl = photo.url;
localStorage.setItem('user', JSON.stringify(this.authService.currentUser));

},  error => {
this.alertify.error(error);
});
}

deletePhoto(id: number) {
this.alertify.confirm('Are you sure you want to delete this photo' , () => {
  this.userService.deletePhoto(this.authService.decoddedToken.nameid, id).subscribe(() => {
    this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
    this.alertify.success('Photo deleted successfullly');
  } , error => {
    this.alertify.error('Failed to delete photo');
  });
}
);
}

}
