import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/servicedata.service';
import { Item } from '../../interfaces/item';
import { Subscription } from 'rxjs/Subscription';
import {NgxPaginationModule} from 'ngx-pagination';
import { CommonService } from '../../service/common-service.service';
import { BaseChartDirective } from 'ng2-charts';
declare var require: any
var $ = require('jquery');
import 'jquery-ui-dist/jquery-ui';
var CanvasJS = require('canvasjs-2.1.1/canvasjs.min');
//import CanvasJS from 'canvasjs';

import { Tasks } from '../../Tasks';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [DataService]
})
export class CardsComponent implements OnInit {

  private subscription: Subscription;
  public listitem: any[];
  private temp: any[];
  private tasklist: any[] = [];
  public tasks: any[] = [];
  public task:Tasks ;
  private categorycount = 0;
  p: number[] = []; 
  public popup: any[] = [];
  public flip_class: any[] = [""];
  public leftpos = "";
  public my_class = "";
  public toggle_row: any[] = [];

  constructor(private dataservice:DataService, private commonService: CommonService) { 
  }

  ngOnInit() {
  	this.getCards();
  	this.subscription = this.commonService.notifyObservable$.subscribe((res) => {
        if (res.hasOwnProperty('option') && res.option === 'onSubmit') {
            //console.log(res.value, 'called once');
            // perform your other action from here
            this.getCards();
        }
    });

    this.task = new Tasks({
        title:""});
  }

  hideDelete(event) {
    if (event.target.id.indexOf('inputTitle') != -1) {
      var del_element = $('#' + event.target.id.replace('inputTitle', 'del'));
      if (del_element.hasClass('hide_content'))
        del_element.removeClass('hide_content').addClass('show_content');
      else
        del_element.removeClass('show_content').addClass('hide_content');
    }
  }

  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    scales: {
      xAxes: [{
                  gridLines: {
                      display:false
                  }
              }],
      yAxes: [{
                  gridLines: {
                      display:false
                  }   
              }]
    },
    pan: {
                enabled: true,
                mode: 'x'
    },
    zoom: {
        enabled: true,
        mode: 'x',
        limits: {
            max: 10,
            min: 0.5
        }
    }
  };

  //Chart Labels
  public barChartLabels:string[] = [];
  public graph_data:any[] = [];
  public barChartType:string = 'line';
  //public barChartLegend:boolean = true;

  public colors = [{backgroundColor: ['#778899']}];
 
  //Chart data
  public barChartData:any[] = [];
 
  // Chart events
  public chartClicked(e:any):void {
    console.log(e);
  }

  // Chart events
  public chartHovered(e:any):void {
    console.log(e);
  }

  getCards() {
    var self = this;
  	this.dataservice.getItem().subscribe(
      res =>{
        self.temp = res.data[1];
        self.temp.forEach(function(val, index) {
          self.barChartData[parseInt(val.id)] = [{data: "0"}];

        	self.tasks[index] = new Tasks({
        		title:""
        	});
        });
        this.categorycount = 0;
  		  this.getTasks();
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  getGraphData(categoryid, categoryindex) {
    var self = this;
    this.dataservice.getGraphData(categoryid).subscribe(
      res =>{
        //console.log("GRAPHHHHHHHHHHHHH");
        //console.log(self.barChartData);

        var prev = 0;
        var count = 1;
        var gdata = [];
        var y = 0;
        var data = []; var dataSeries = { type: "spline", dataPoints: []};
        var dataPoints = [];
        dataPoints.push({
                      x: 0,
                      y: 0                
                    });
        if (res.data[1].length > 0) {
          var limit = 10;    //increase number of dataPoints by increasing this
          res.data[1].forEach(function(val, index) {

              var updatedate = new Date(parseInt(val['createdon']) * 1000);    
              if (prev !== (updatedate.getDate())) {
                  count = 1;
              }
              var tasktitle = "";
              self.tasklist[categoryindex].forEach(function(taskvalue, taskindex) {
                if (taskvalue['id'] === val['task_id']) {
                  tasktitle = taskvalue['title'];
                  return true;
                }
              });

              dataPoints.push({
                x: updatedate.getDate(),
                y: count,
                toolTipContent: tasktitle,
              });
              self.barChartLabels[index] = val['createdon'];
              gdata.push(count);
              //self.graph_data[index] = count;
              prev = updatedate.getDate();


              //self.barChartData[35] = [{data: self.graph_data, label: 'Profit'}];
              self.barChartData[parseInt(val.id)] = [{data: gdata}];

              count++;
          });
        }
        else {
          dataPoints.push({
                      x: (new Date()).getDate(),
                      y: 0                
                    });
        }
        dataSeries.dataPoints = dataPoints;
        data.push(dataSeries);
        console.log(data);

        var options = { 
          animationEnabled: true,
          animationDuration: 1000,
          axisX:{
            gridThickness: 0,
            interval: 1,
            intervalType: "day",
            minimum: 0
          },
          axisY:{
            gridThickness: 0,
            interval: 1,
            minimum: 0
          },
          title: {
            text: "Analytics"
          },
          data: data,
          width: $('#card').width(),
          height:$('.front').height() + 9
        };

        var chart = new CanvasJS.Chart("chartContainer-" + categoryid, options);
        chart.render();
      },
      err => {
        console.log("There is an error : "+err);
      }
    )
  }

  getTasks() {
  	var self = this;
  	if (this.categorycount >= this.temp.length) {
        this.listitem = this.temp;
  		return;
  	}


  	this.popup[this.temp[this.categorycount]['id']] = "inactive";
  	this.dataservice.getTasks(this.temp[this.categorycount]['id']).subscribe(
      res =>{
      	self.tasklist[self.categorycount] = [];
        self.tasklist[self.categorycount] = res.data[1];
        res.data[1].forEach (function(val, index) {
          if (self.toggle_row[self.categorycount] === undefined)
            self.toggle_row[self.categorycount] = []
          if (val['status'] === "DONE")
            self.toggle_row[self.categorycount][val['id']] = "btn btn-success res-button toggle-btn done";
          else
            self.toggle_row[self.categorycount][val['id']] = "btn btn-success res-button toggle-btn undone";
        });
        //console.log(self.toggle_row);  	
        self.categorycount++;
        self.getTasks();

      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  gasetTasks(categoryid) {
  	var self = this;
  	this.dataservice.getTasks(categoryid).subscribe(
      res =>{
        this.tasklist = res.data[1];
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  flip(event) {
    var self = this;

    this.getGraphData(event.target.id.split('-')[2], event.target.id.split('-')[1]);

    if (this.flip_class[event.target.id.split('-')[1]] == "flipped")
      this.flip_class[event.target.id.split('-')[1]] = "";
    else
      this.flip_class[event.target.id.split('-')[1]] = "flipped";

    setTimeout(
    function() 
    {
      //do something special
    $('#graph-container-' + event.target.id.split('-')[1]).show();

    }, 200);
  }

  remove_card(categoryid) {
  	var self = this;
  	this.dataservice.removeCard(categoryid).subscribe(
      res =>{
    	this.commonService.notifyOther({option: 'onSubmit', value: 'Add component'});
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  delete_task(taskid) {
    var self = this;
    this.dataservice.removeTask(taskid).subscribe(
      res =>{
      this.commonService.notifyOther({option: 'onSubmit', value: 'Add component'});
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  create_task(event) {
  	this.dataservice.addTask(this.tasks[event.target.id.split('-')[1]].title, event.target.id.split('-')[2]).subscribe(
      res =>{
    	this.commonService.notifyOther({option: 'onSubmit', value: 'Create task'});
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  toggle_task(event) {
  	this.dataservice.toggleTask(event.target.id.split('-')[2], event.target.id.split('-')[3]).subscribe(
      res =>{
        var self = this;
        $('#taskcontent-' + event.target.id.split('-')[1] + "-" + event.target.id.split('-')[2]).toggle("slide", {direction: "right"}, 300);
        setTimeout(function () { 
          self.commonService.notifyOther({option: 'onSubmit', value: 'Toggle task'});
        }, 300);
      },
      err =>{
        console.log("There is an error : "+err);
      }
    )
  }

  myEvent(event) {
  	if (this.my_class == "inactive cards almostfull") {
  		this.my_class = "active cards almostfull";
  		this.leftpos  = "275px";
  	}
  	else {
  		this.my_class = "inactive cards almostfull";
  		this.leftpos  = "";
  	}
	//console.log("Clicked");
  }

  toggle_popup(id) {
  	//console.log(id);
  	if (this.popup[id] == "inactive") {
  		this.popup[id] = "active";
  	}
  	else {
  		this.popup[id] = "inactive";
  	}
  }
}
