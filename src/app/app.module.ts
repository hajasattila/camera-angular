import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { WebcamModule } from 'ngx-webcam';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, WebcamModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
