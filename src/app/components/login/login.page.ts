import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {

  email: string;
  password: string;

  constructor(
    private router: Router
  ) {

  }

  onSubmitLogin() {
    this.router.navigate(['/credit']);
  }

  onSubmitRegistry() {
    this.router.navigate(['/registry']);
  }

}
