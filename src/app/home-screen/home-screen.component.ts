import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home-screen',
  templateUrl: './home-screen.component.html',
  styleUrls: ['./home-screen.component.css']
})
export class HomeScreenComponent implements OnInit {

  public name = "";
  
  constructor(private router : Router) { }

  ngOnInit() {}

  // on click of start button, name is saved into local storage and start-screen opens
  startClick() {  
    localStorage.setItem('Name', this.name);  
    this.router.navigateByUrl('/start-screen');
    };
}
