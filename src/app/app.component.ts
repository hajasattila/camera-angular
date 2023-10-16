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

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public handleImage(webcamImage: WebcamImage): void {
    this.webcamImage = webcamImage;
    this.captureImage = webcamImage.imageAsDataUrl;
    console.info('received webcam image');
    this.downloadImage();
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  private downloadImage(): void {
    if (this.captureImage) {
      // Hozz létre egy blob-ot a képből
      const blob = this.dataURItoBlob(this.captureImage);

      // Hozz létre egy fájlnevet a mai dátummal
      const today = new Date();
      const fileName = `Fenykep_${today.toISOString()}.png`;

      // Állítsd be a link attribútumait és a letölthető fájlt
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
}
