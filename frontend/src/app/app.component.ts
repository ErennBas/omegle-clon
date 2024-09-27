import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { logos } from './images';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

	images = logos;

	matchStatus = false;

	constructor() {}

	async ngOnInit(): Promise<void> {}
}
