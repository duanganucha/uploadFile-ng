import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';

import { AngularFirestore } from '../../../node_modules/angularfire2/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {

  url;
  randomId = Math.random().toString(36).substring(2);
  filePath = '/upload/to/this-path' + this.randomId;

  constructor(private afStorage: AngularFireStorage) { }

  upload(event) {
    console.log(event)
    console.log(Date.now())

    // const file = event.item(0)
    const task = this.afStorage.upload(this.filePath, event.target.files[0]).then(() => {
      const ref = this.afStorage.ref(this.filePath);
      const downloadURL = ref.getDownloadURL().subscribe(url => {
        const Url = url; // for ts
        this.url = url // with this you can use it in the html
        console.log(Url);
        console.log(this.filePath)
        console.log(Date.now())
      })
    })


  }

  onSave(){

  }
}


