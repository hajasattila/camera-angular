import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  async getPhoto(): Promise<Blob> {
    const constraints = {
      video: {
        width: { ideal: 1280 }, // Állítsd be a kívánt szélességet
        height: { ideal: 720 }   // Állítsd be a kívánt magasságot
      }
    };

    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const mediaRecorder = new MediaRecorder(stream);

      return new Promise((resolve) => {
        mediaRecorder.ondataavailable = (event) => {
          resolve(event.data);
        };
        mediaRecorder.start();
        setTimeout(() => {
          mediaRecorder.stop();
        }, 3000); // 3 seconds of recording
      });
    } catch (error) {
      console.error('Error accessing the camera:', error);
      throw error;
    }
  }
}
