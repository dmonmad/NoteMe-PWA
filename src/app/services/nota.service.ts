import { Injectable } from '@angular/core';
import { Camera, CameraOptions, CameraPopoverOptions, DestinationType, Direction, PictureSourceType } from '@ionic-native/camera/ngx';

@Injectable({
  providedIn: 'root'
})
export class NotaService {

  constructor(private camera: Camera) { }

  getBase64Image(source: PictureSourceType) {    
    console.log("getBase64Image")

    let camOpt: CameraOptions = {
      quality: 80,
      sourceType: source,
      destinationType: DestinationType.DATA_URL,
      allowEdit: true,
      cameraDirection: Direction.BACK,
      correctOrientation: true,
      saveToPhotoAlbum: true,
    }
    console.log("beforePicture")
    return this.camera.getPicture(camOpt);
  }

}
