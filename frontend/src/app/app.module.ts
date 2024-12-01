import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { MyVideoComponent } from './components/my-video/my-video.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent,
		MyVideoComponent
	],
	imports: [
		BrowserModule,
		NgbModule,
		FormsModule,
		HttpClientModule
	],
	providers: [CookieService],
	bootstrap: [AppComponent]
})
export class AppModule { }
