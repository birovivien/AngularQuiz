import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-current-points',
  templateUrl: './current-points.component.html',
  styleUrls: ['./current-points.component.css']
})
export class CurrentPointsComponent implements OnInit {

  @Input()points: number;

  constructor() { }

  ngOnInit()  {
  }

}
