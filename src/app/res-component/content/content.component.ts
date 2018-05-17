import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/servicedata.service';
import { Item } from '../../interfaces/item';
import { CardsComponent } from '../cards/cards.component';
import { CommonService } from '../../service/common-service.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [DataService, CommonService]
})
export class ContentComponent implements OnInit {

  private listitem: string[];
  constructor(private dataservice:DataService) { }

  ngOnInit() {
    
  }

}
