import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LinkMenuItem } from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public links: LinkMenuItem[];
  constructor(private router: Router) { }

  ngOnInit() {
    this.links = [
      {icon: 'home', text: 'Home'},
      {icon: 'favorite', text: 'Favorite'},
      {icon: 'add', text: 'Add'},
    ];
  }

  logedOut($event) {
    this.router.navigate(['authenticate']);
  }

}
