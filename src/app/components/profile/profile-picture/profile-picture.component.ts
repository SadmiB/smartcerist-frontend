import { Component, OnInit, Input } from '@angular/core';
import { FileSelectDirective, FileUploader} from 'ng2-file-upload';
import { AuthService } from '../../../services/auth.service';
const uri = 'http://localhost:3000/upload';
@Component({
  selector: 'app-profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss']
})
export class ProfilePictureComponent implements OnInit {

  uploader:FileUploader = new FileUploader({url:uri});

    attachmentList:any = [];

    constructor(){

        this.uploader.onCompleteItem = (item:any, response:any , status:any, headers:any) => {
            this.attachmentList.push(JSON.parse(response));
        }
      }

  ngOnInit() {
  }

}
