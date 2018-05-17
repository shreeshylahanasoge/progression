import { Injectable } from '@angular/core';
import {Http, Response, RequestOptions, Headers } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
 
@Injectable()
export class DataService {
 
  constructor(private http:Http) { }
  getItem():Observable<any>{
    const url = 'http://www.mindlounge.in/restapiserver/api/get/item/list';
    return this.http
    .get(url, {})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  getGraphData(categoryid):Observable<any>{
    const url = 'http://www.mindlounge.in/restapiserver/api/get/graph/data?categoryid=' + categoryid;
    return this.http
    .get(url, {params: {'categoryid': categoryid}})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  addItem(title, description, type):Observable<any>{
  //console.log(title);
    const url = 'http://www.mindlounge.in/restapiserver/api/post/card/add';
    return this.http
    .post(url, {'title':title, 'description': description, 'type': type})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  addTask(title, category):Observable<any>{
  console.log("zzzzzzzzzzzzzzzzzzzzzzzzzz " + title + "  " + category);
    const url = 'http://www.mindlounge.in/restapiserver/api/post/task/add';
    return this.http
    .post(url, {'title':title, 'category': category})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  toggleTask(taskid, status):Observable<any>{
    const url = 'http://www.mindlounge.in/restapiserver/api/post/task/toggle';
    return this.http
    .post(url, {'taskid':taskid, 'status':status})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  getTasks(categoryid):Observable<any>{
    const url = 'http://www.mindlounge.in/restapiserver/api/get/task/list?categoryid=' + categoryid;
    return this.http
    .get(url, {params: {'categoryid': categoryid}})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  removeCard(categoryid) {
    const url = 'http://www.mindlounge.in/restapiserver/api/post/card/remove';
    return this.http
    .post(url, {'categoryid': categoryid})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  removeTask(taskid) {
    const url = 'http://www.mindlounge.in/restapiserver/api/post/task/remove';
    return this.http
    .post(url, {'taskid': taskid})
    .map(
      res => {
        const data = res.json();
        return data;
      },
      err => {
        return err;
      }
    )
  }

  logout() {
    const url = 'http://www.mindlounge.in/reactor/index.php';
    return this.http
    .post(url, {'action': 'LOGOUT'}, {withCredentials: true})
    .map(
      res => {
        return true;
      },
      err => {
        return err;
      }
    )
  }
  
}