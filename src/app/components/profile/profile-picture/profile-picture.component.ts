import { Component, OnInit, Input } from '@angular/core';
import { UploadedFile, FancyImageUploaderOptions } from 'ng2-fancy-image-uploader';

@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {
  @Input() picture: String;
  options: FancyImageUploaderOptions = {
    thumbnailHeight: 200,
    thumbnailWidth: 200,
    uploadUrl: 'http://fancy-image-uploader-demo.azurewebsites.net/api/demo/upload',
    allowedImageTypes: ['image/png', 'image/jpeg'],
    maxImageSize: 3
};

response: string;

onUpload(file: UploadedFile) {
  this.response = file.response;
}

  constructor() { }

  ngOnInit() {
  }

}
