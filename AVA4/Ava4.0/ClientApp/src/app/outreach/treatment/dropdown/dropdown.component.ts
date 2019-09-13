import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import {MessageService} from '../../../core/message.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {
	
	@Input() options: any;
	
	showdd:boolean = false;
	dd_id: any;
	subscription:Subscription;
	
	_ddoptionsArr:any[] = [];
	ddplaceholder: any;
	
  constructor(private dataService:MessageService) { }

  ngOnInit() {
	this.initializeDropdown();
	this.subscription = this.dataService.getMessage().subscribe(message => {
		if(message.event == 'dropdownstate'){
			if(this.dd_id != message.data.dd_id){
				this.showdd = false;
			}
		}
	});
  }
  
  showddoptions(){
	this.showdd = this.showdd == true ? false : true;
	this.dataService.sendMessage('dropdownstate', {'dd_id': this.dd_id, 'state': this.showdd});
  }
  
  initializeDropdown() {
	this.dd_id = (+ new Date()) + (Math.floor(Math.random() * 1000) + 1);
	this._ddoptionsArr = JSON.parse(JSON.stringify(this.options));
	
	this._ddoptionsArr.map(item => {
		item.selected = false;
	})
	
	//this.ddplaceholder = this._ddoptionsArr[0].option;
	
	this.selectdOption(0);
  }
  
  selectdOption(indx){
	this._ddoptionsArr.map(item => {
		item.selected = false;
	});
	
	this.ddplaceholder = this._ddoptionsArr[indx].option;
	this._ddoptionsArr[indx].selected = true;
	this.showdd = false;
	
  }
  
  onClickedOutside() {
	this.showdd = false;
  }

}
