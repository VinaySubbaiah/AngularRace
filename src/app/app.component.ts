import { Component, ElementRef, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { AppService } from './services/app.service';
import { GameService } from './services/game.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {

	@ViewChild('canvas') public canvas: ElementRef;
	subscription: any;
	showLoader = true;
	score: any = 0;
	hScore: any;

	constructor(
		private appService: AppService,
		private gameService: GameService
	) {
		Observable.interval(0).takeWhile(() => true).subscribe(() => {
			this.score = this.gameService.frameNumber;
			if (this.score >= this.hScore) {
				this.hScore = this.score;
				
			}
		});


	}

	StartAgain() {
		window.location.reload();

	}

	public ngAfterViewInit() {

		this.hScore = localStorage.getItem("highScore");
		const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
		this.appService.createPlayGround(canvasEl);
		this.subscription = this.appService.getImageLoadEmitter()
			.subscribe((item) => {

				this.showLoader = false;
				this.gameService.startGameLoop();
			});
		//	this.getFramwork();
	}

	@HostListener('document:keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
		//this.getFramwork();
		this.appService.movePlayer(event, 'keydown');
	}

	@HostListener('document:keyup', ['$event']) onKeyupHandler(event: KeyboardEvent) {
		//this.getFramwork();
		this.appService.movePlayer(event, 'keyup');
	}
}


