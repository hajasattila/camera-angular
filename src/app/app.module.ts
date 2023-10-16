import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CameraComponent } from './camera/camera.component';
import { CameraService } from './camera.service';
import { WebcamModule } from 'ngx-webcam';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent, CameraComponent],
  imports: [BrowserModule, WebcamModule],
  providers: [CameraService],
  bootstrap: [AppComponent],
})
export class AppModule {}
