import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';

@Component({
  selector: 'admin-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  providers: [AuthService]
})
export class AdminLogin implements OnInit {
  constructor(private authService: AuthService, private router: Router) {};
    //we want to actually subscribe to the boolean of the observable
	onSubmit(form: any): void {
		console.log(form.user);
		this.authService.login(form.user, form.pass).subscribe(auth =>{
			if(auth) {
				this.router.navigate(['/restricted']);
			}
		});
	}
	ngOnInit(): void {
		this.authService.checkAuth().subscribe(auth =>{
			if (auth) {
				this.router.navigate(['/restricted']);
			}
			else {
				$('.header-login').click(function() {
					$('.login-container').slideToggle(700,"easeOutBounce");
					$('.header-login').hide();
				});

				$('.close_login').click(function() {
					$('.login-container').slideToggle(700,"easeOutBounce");
					$('.header-login').show();
				})
			}
		});
	}
}