import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-game-over',
  templateUrl: './game-over.component.html',
  styleUrls: ['./game-over.component.css']
})
export class GameOverComponent implements OnInit {

  public animalsPoints = "";
  public celebritiesPoints = "";

  constructor(private router: Router, private route: ActivatedRoute) { }
  

  ngOnInit() {
  }

  // show animal category points on game-over screen from local storage
  getAnimalsPoints() {
    if(localStorage.getItem('Animals points') === null) {
      this.animalsPoints = "-";
    } else {
      this.animalsPoints = localStorage.getItem('Animals points');
    }
  }
  // show celebrities category points on game-over screen from local storage
  getCelebritiesPoints() {
    if(localStorage.getItem('Celebrities points') === null) {
      this.celebritiesPoints = "-";
    } else {
      this.celebritiesPoints = localStorage.getItem('Celebrities points');
    }
  }

  // go to start-screen
  goHome() {
    this.router.navigate(['/start-screen'], {relativeTo: this.route});
  }
}
