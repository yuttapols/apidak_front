import { Component, OnInit } from '@angular/core';
import { CallserviceService } from 'src/app/modules/services/callservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private callService : CallserviceService
  ) { }


  userId : any = null;
  userData : any = null;

  ngOnInit() {
    this.userId = sessionStorage.getItem("userId")
    this.callService.findByUserId(this.userId).subscribe(res=>{
      if(res.data){
        this.userData = res.data;
      }
    })
  }

}
