import { Component, OnInit } from '@angular/core';
import {TriviaGameService} from '../trivia-game.service';

@Component({
  selector: 'app-question-screen',
  templateUrl: './question-screen.component.html',
  styleUrls: ['./question-screen.component.css']
})
export class QuestionScreenComponent implements OnInit {

  question: TriviaQuestion;
  chosenAnswer = '';
  public name = '';
  public life: number;
  public points: number;
  public animalPoints = '';
  public celebritiesPoints = '';
  public shuffled = [];
  public unshuffled = [];
  public correctAns = '';

  constructor(private triviaGameService: TriviaGameService) { }


  ngOnInit() {

    this.question = this.triviaGameService.currentGame.currentQuestion;
    this.triviaGameService.currentGame.questions$.subscribe(question => this.question = question);
    this.points = this.triviaGameService.currentGame.currentPoints;
    this.triviaGameService.currentGame.points$.subscribe(points => this.points = points);

    // put answers into an array and shuffle it to randomize the order of possible answers
    this.unshuffled = [this.question.correct_answer, this.question.incorrect_answers[0], this.question.incorrect_answers[1], this.question.incorrect_answers[2]];
    this.shuffled = this.unshuffled.sort(() => Math.random() - 0.5);
  }


  chooseAnswer(answer: string) {
    this.chosenAnswer = answer;

    // display correct answer after user chose from the answers
    if(this.chosenAnswer) {
      this.correctAns = this.question.correct_answer;
    } else this.correctAns = '';
  }
 

  onSubmit() {
    this.triviaGameService.currentGame.submitAnswer(this.chosenAnswer);
    this.chosenAnswer = '';

    // add points to the local storage of the category that the user's playing
    if(this.question.category == 'Animals') {
      localStorage.setItem('Animals points', JSON.stringify(this.points));
    } else localStorage.setItem('Celebrities points', JSON.stringify(this.points));

    // put answers into array again and randomize the order they're displayed
    this.unshuffled = [this.question.correct_answer, this.question.incorrect_answers[0], this.question.incorrect_answers[1], this.question.incorrect_answers[2]];
    this.shuffled = this.unshuffled.sort(() => Math.random() - 0.5);
  }

  // get user's name from local storage to show it on question screen
  getName() {
    if(localStorage.getItem('Name') === null) {
      this.name = '';
    } else {
      this.name = localStorage.getItem('Name');
    }
  }


}
