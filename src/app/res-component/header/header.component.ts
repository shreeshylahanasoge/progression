import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { DataService } from '../../service/servicedata.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DataService, AuthService]
})
export class HeaderComponent implements OnInit {

  logout_class = "header-logout";
  login_class  = "header-login";
  constructor(private dataservice:DataService, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.checkAuth().subscribe(auth =>{
      if(!auth) {
        this.logout_class = "inactive header-logout";
        console.log("ready!!!!");
      }
      else
        this.logout_class = "inline header-logout";
    });
  }

  logout() {
  console.log("logout");
  	var self = this;
  	this.dataservice.logout().subscribe(
      res =>{
		this.router.navigate(['/login']);
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

}
