import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule, Router, CanActivate, CanActivateChild} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ChartsModule } from 'ng2-charts';

import { AppIndex } from './app.index';
import { AuthGuard } from './auth.guard';
import { AuthService } from "./service/auth.service";
import { DataService } from './service/servicedata.service';
import { AdminLogin } from "./admin.login";
import { AppComponent } from './app.component';
import { RestrictedComponent } from './res-component/restricted/restricted.component';

import { HeaderComponent } from './res-component/header/header.component';
import { FooterComponent } from './res-component/footer/footer.component';
import { ContentComponent } from './res-component/content/content.component';
import { CardsComponent } from './res-component/cards/cards.component';
import { NewcardComponent } from './res-component/newcard/newcard.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'unrestricted', component: AppComponent},
  {path: 'login', component:AdminLogin},
  {path: 'restricted', component:RestrictedComponent,
  canActivate: [AuthGuard],
  canActivateChild:[AuthGuard],
  children: [
  {path:'alsoRestricted', component:RestrictedComponent}
  ]},
  {path: '**', component: AppComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    AdminLogin,
    RestrictedComponent,
    AppIndex,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    CardsComponent,
    NewcardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    NgxPaginationModule,
    ChartsModule,
    RouterModule.forRoot(routes,{useHash:true})
  ],
  providers: [AuthGuard, AuthService, DataService],
  bootstrap: [AppIndex]
})
export class AppModule { }