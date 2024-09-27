import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
	selector: 'app-my-video',
	templateUrl: './my-video.component.html',
	styleUrl: './my-video.component.css'
})
export class MyVideoComponent {
	@ViewChild("myVideo")
	myVideo!: ElementRef;

	currentStream!: MediaStream;

	options: MediaStreamConstraints = {
		video: {
			aspectRatio: 1.33,
			frameRate: 60,
			deviceId: {}
		},
		audio: true
	};

	selectedCamera!: string;
	devices: MediaDeviceInfo[] = [];

	constructor() {
		this.startStream(this.options);
	}

	async startStream(options: MediaStreamConstraints, change = false) {
		if (this.currentStream) {
			this.currentStream.getTracks().forEach(track => track.stop());
		}

		this.currentStream = await navigator.mediaDevices.getUserMedia(options);
		if (!change) {
			this.devices = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'videoinput');
			this.selectedCamera = this.devices[0].deviceId;
		}
		this.myVideo.nativeElement.srcObject = new MediaStream(this.currentStream.getTracks());

	}

	cameraOnChange() {
		this.startStream({
			video: {
				...this.options.video as MediaTrackConstraints,
				deviceId: { exact: this.selectedCamera }
			},
			audio: true
		}, true);
	}
}
