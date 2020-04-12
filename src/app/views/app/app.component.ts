import { AuthService } from './../../service/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TennisPart';

  constructor(private firebaseService: AuthService){}

  ngOnInit() {
   this.firebaseService.userChanges();
  }

}
