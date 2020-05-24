import { UserService } from './../../_services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AlerifyService } from 'src/app/_services/alerify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_Models/user';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { TabsetComponent } from 'ngx-bootstrap/tabs';


@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
@ViewChild('memberTabs', {static: true}) memberTabs: TabsetComponent;
  user: User;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private userService: UserService, private alertifyService: AlerifyService,
              private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
    });
    this.route.queryParams.subscribe(params => {
  const selectedTab = params.tab;
  this.memberTabs.tabs[selectedTab > 0 ? selectedTab : 0].active = true;

});

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false

    }

];
    this.galleryImages = [];
    this.galleryImages = this.getImages();
  }
 getImages() {
  const imageUrls = [];
  for (const photo of this.user.photos) {
imageUrls.push({
  small: photo.url,
  medium: photo.url,
  big: photo.url,
  description: photo.description
});
  }
  return imageUrls;
 }

//   loadUser() {
//     this.userService.getUser(+this.route.snapshot.params.id).subscribe((user: User) => {
//  this.user = user;
//     }, error => {
//       this.alertifyService.error(error);
//     });
//   }

selectTab(tabId: number) {
this.memberTabs.tabs[tabId].active = true;
}

}
