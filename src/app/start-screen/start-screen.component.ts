import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {TriviaGameService} from '../trivia-game.service';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.css']
})
export class StartScreenComponent implements OnInit {

  public name = "";
  public points: number;
  public animalsPoints = "";
  public celebritiesPoints = "";

  triviaCategories: TriviaCategory[];
  difficulties = [
    'easy',
    'medium',
    'hard'
  ];

  constructor(private router : Router, private triviaGameService: TriviaGameService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.triviaGameService.getCategories().subscribe((categories) => {
      this.triviaCategories = categories;
    });
  }

  // get user's name from local storage to display it on start screen
  getName() {
    if(localStorage.getItem('Name') === null) {
      this.name = "";
    } else {
      this.name = localStorage.getItem('Name');
    }
  }

  // opens first category of questions
  firstCat() {
    this.triviaGameService.startNewGame(27, 'easy');
  }

  // opens second category of questions
  secondCat() {
    this.triviaGameService.startNewGame(26, 'easy');
  }

  // displays current animal category points from local storage
  getAnimalsPoints() {
    if(localStorage.getItem('Animals points') === null) {
      this.animalsPoints = "-";
    } else {
      this.animalsPoints = localStorage.getItem('Animals points');
    }
  }

  // displays current celebrities category points from local storage
  getCelebritiesPoints() {
    if(localStorage.getItem('Celebrities points') === null) {
      this.celebritiesPoints = "-";
    } else {
      this.celebritiesPoints = localStorage.getItem('Celebrities points');
    }
  }

  // points are 0 again
  restart() {
    localStorage.removeItem('Animals points');
    localStorage.removeItem('Celebrities points');
  }

  // points are 0, name is removed from local storage, goes back to the root page
  logOut() {
    localStorage.removeItem('Animals points');
    localStorage.removeItem('Celebrities points');
    localStorage.removeItem('Name');
    this.router.navigate(['']);
  }
}
