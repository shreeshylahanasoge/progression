import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/servicedata.service';
import { Item } from '../../interfaces/item';
import { CommonService } from '../../service/common-service.service';

import { Subject } from '../../Subject';

@Component({
  selector: 'app-newcard',
  templateUrl: './newcard.component.html',
  styleUrls: ['./newcard.component.css'],
  providers: [DataService]
})
export class NewcardComponent implements OnInit {

  constructor(private dataservice:DataService, private commonService:CommonService) { 
  }

  //Property for the gender
  public type: string[];
  //Property for the user
  public subject:Subject;
  public emailid: string;

  public my_class = "inactive cards almostfull";
  public flip_class = "";
  public leftpos = "";
  public listitem: string[];

  myEvent(event) {
  	if (this.my_class == "inactive cards almostfull") {
  		this.my_class = "active cards almostfull";
  		this.leftpos  = "275px";
  	}
  	else {
  		this.my_class = "inactive cards almostfull";
  		this.leftpos  = "";
  	}
	console.log("Clicked");
  }

  create_card(event) {
  	this.dataservice.addItem(this.subject.title, this.subject.description, this.subject.type).subscribe(
      res =>{
    	this.commonService.notifyOther({option: 'onSubmit', value: 'Add component'});
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  flip(event) {
  	if (this.flip_class == "flipped")
  		this.flip_class = "";
  	else
  		this.flip_class = "flipped";
  }

  ngOnInit() {
  	this.type =  ['Level system', 'Follow-up system', 'Other'];
    //Create a new user object
    this.subject = new Subject({
        title:"", description: "", type: this.type[0]});
  }

}