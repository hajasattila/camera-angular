import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public trigger: Subject<void> = new Subject<void>();
  public webcamImage!: WebcamImage;
  captureImage = '';
  isCameraOn: boolean = false;

  ngOnInit() {}

  //Képkészítés
  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage.imageAsDataUrl;
    console.info('Mukodik a kamerakep');
    this.downloadImage();

    console.log(this.captureImage);
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  private downloadImage(): void {
    if (this.captureImage) {
      // blob a képből
      const blob = this.dataURItoBlob(this.captureImage);

      // File név a dátum legyen
      const today = new Date();
      const fileName = `Fenykep_${today.toISOString()}.png`;

      //Link attribútumai és a letölhető file
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(a.href);
      document.body.removeChild(a);
    }
  }

  private dataURItoBlob(dataURI: string): Blob {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], { type: 'image/png' });
  }
  public toggleCamera(): void {
    this.isCameraOn = !this.isCameraOn;
  }

  /*   async onFileChange(event:any){
    const file = event.target.files[0]
    if(file){
      console.log(file)
    }
  } */
}
