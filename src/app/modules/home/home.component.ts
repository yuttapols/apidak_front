import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { CallserviceService } from '../services/callservice.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private formBuilder : FormBuilder,
    private callService : CallserviceService,
    private router: Router,
  ) { }

  isSubmit: boolean = false;

  homeForm = this.formBuilder.group({
    userName : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
    remember : false
  })



  ngOnInit() {
    sessionStorage.removeItem("userId")
  }

  onSubmit(){
    this.isSubmit = true;
    if(this.validateForm()){
      const userName = this.homeForm.value.userName;
      const password = this.homeForm.value.password;

      this.callService.authen(userName,password).subscribe(res=>{
        console.log(res)
        if(res.data){
          sessionStorage.setItem("userId",res.data.id)
          if("1" == this.validateLogin(res.data)){
            Swal.fire({
              icon: 'success',
              title: 'เข้าสู่ระบบสำเร็จ',
              confirmButtonText: 'ตกลง',
            }).then((result =>{
              if (result.isConfirmed) {
                if(res.data.roleId == 1){
                  this.router.navigate(['/dashbord-admin']);
                }else if(res.data.roleId == 2){
                  this.router.navigate(['/dashbord-user']);
                }
              }
            }));
          }else if("2" == this.validateLogin(res.data)){
            Swal.fire({
              icon: 'warning',
              title: 'กรุณาติดต่อ Admin เพื่อทำการปลดล็อค',
              confirmButtonText: 'ตกลง',
            });
          }else{
            const status = this.validateLogin(res.data);
            if("3" == status){
              Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเข้าสู่ระบบได้!',
                text: 'กรุณาตรวจสอบใหม่อีกครั้ง',
                confirmButtonText: 'ตกลง',
                
              });
              this.clearInput();
            }else if("4" == status){
              Swal.fire({
                icon: 'error',
                title: 'ไม่สามารถเข้าสู่ระบบได้!',
                text: 'กรุณาตรวจสอบ รหัสผ่านใหม่อีกครั้ง จำนวนครั้งที่ผิด = ' + res.data.loginFail + 'ครั้ง',
                confirmButtonText: 'ตกลง',
                
              });
              this.clearInput();
            }
          }

        }else{
          Swal.fire({
            icon: 'error',
            title: 'ไม่สามารถเข้าสู่ระบบได้!',
            text: 'กรุณาตรวจสอบใหม่อีกครั้ง',
            confirmButtonText: 'ตกลง',
          });
          this.clearInput();
        }
      });
    }else{
      Swal.fire({
        icon: 'warning',
        title: 'ไม่สามารถเข้าสู่ระบบได้!',
        text: 'กรุณากรอกข้อมูลให้ครบ',
        confirmButtonText: 'ตกลง',
      });
      this.clearInput();
    }

    
  }

  validateForm(){
    if(this.homeForm.controls['userName'].invalid || this.homeForm.controls['password'].invalid){
      return false;
    }
    return true;
  }

  validateLogin(data : any){
    if(data.status == '1'){
      if(null == data.loginFail){
        return "3"
      }
      if(data.loginFail > 0){
        return "4"
      }
      return data.status
    }
    return data.status
  }

  clearInput(){
    if(!this.homeForm.value.remember){
      this.homeForm.reset();
    }
    
  }
}
