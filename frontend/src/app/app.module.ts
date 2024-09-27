import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MyVideoComponent } from './components/my-video/my-video.component';

@NgModule({
	declarations: [
		AppComponent,
  MyVideoComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		NgbModule,
		FormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
