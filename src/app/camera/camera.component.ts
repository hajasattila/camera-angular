import { Component, ElementRef, ViewChild } from '@angular/core';
import { CameraService } from '../camera.service';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent {
  photoUrl: string | null;
  @ViewChild('videoElement', { static: true }) videoElement!: ElementRef;

  constructor(private cameraService: CameraService) {
    this.photoUrl = null;

  }

  enableCamera() {
    const videoElement: HTMLVideoElement = this.videoElement.nativeElement; // videoElement inicializálása
    // Most már használhatod a videoElement-et
  }

  async takePhoto() {
    try {
      const photoBlob = await this.cameraService.getPhoto();
      this.displayPhoto(photoBlob);
      this.downloadPhoto(photoBlob);
    } catch (error) {
      console.error('Error taking a photo:', error);
    }
  }

  private downloadPhoto(photoBlob: Blob) {
    const url = URL.createObjectURL(photoBlob);
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 19).replace(/:/g, '-');
    const fileName = `photo_${formattedDate}.png`;

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none'; // Az a elem rejtett
    document.body.appendChild(a); // Adjuk hozzá a dokumentumhoz
    a.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(a); // Távolítsuk el az a elemet
  }

  private displayPhoto(photoBlob: Blob) {
    this.photoUrl = URL.createObjectURL(photoBlob);
  }
}
