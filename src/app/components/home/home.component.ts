import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  logo = { img: 'ojo.jpg'};
  logo1 = { img: 'ojo2.jpg'};
  logo2 = { img: 'ojo3.jpg'};

  constructor() { }

  ngOnInit(): void {

    console.log('Entre al HOME');

  }

}
