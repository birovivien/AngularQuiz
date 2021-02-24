import {Subject} from 'rxjs';

export class TriviaGame {

  // to get exactly 5 questions
  currentLife = 5;

  currentPoints = 0;
  chosenAnswer = '';
  readonly gameOver$ = new Subject();
  readonly questions$ = new Subject<TriviaQuestion>();
  readonly points$ = new Subject<number>();

  private readonly questionsIterator: IterableIterator<TriviaQuestion>;
  currentQuestion: TriviaQuestion;

  constructor(private questions: TriviaQuestion[]) {

    this.questionsIterator = questions[Symbol.iterator]();
    this.currentQuestion = this.questionsIterator.next().value;
  }

  submitAnswer(answer : string) {

    // if chosen answer is correct, points +1
    if (answer === this.currentQuestion.correct_answer) {
      this.currentPoints++;
      this.points$.next(this.currentPoints);
      this.currentLife--;
    } else {
      this.currentLife--;
    }

    // when life reaches 0, no more questions are displayed
    if (this.currentLife === 0) {
      this.gameOver$.next();
    } else {
      this.currentQuestion = this.questionsIterator.next().value;
      this.questions$.next(this.currentQuestion);
    }
  }
}
