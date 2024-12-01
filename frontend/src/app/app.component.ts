import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { logos } from './images';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
	@ViewChild('loginModal')
	loginModal!: ElementRef;
	images = logos;

	matchStatus = false;

	user: any;

	constructor(private http: HttpClient) {
		let token = new URLSearchParams(window.location.search).get('access_token');
		if (token) {
			this.http.get('http://localhost:3000/auth/check', { headers: { Authorization: token } }).subscribe(res => {
				console.log("reees => ", res);

			});
			window.localStorage.setItem('access_token', token);
		}
	}

	async ngOnInit(): Promise<void> {}

	openLoginModal() {
		console.log("modal open => ", this.loginModal);

		if (this.loginModal) {
			this.loginModal.nativeElement.style.display = "block";
		}
	}

	closeLoginModal() {
		if (this.loginModal) {
			this.loginModal.nativeElement.style.display = "none";
		}
	}
}
