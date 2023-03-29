import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Console } from 'console';
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms'; 
import { url } from 'inspector';
import { Quote } from 'src/app/Services/Quote';
import { RESTAPIService } from 'src/app/Services/restapi.service';
import { Results } from 'src/app/Services/Results';

import { YahooComponent } from '../../yahoo/yahoo.component';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  // private router:Router;
  StudentArray : any[] = [];
  financeArray : any [] =[];
  currentStudentID = "";
  public stockForm: FormGroup;

  optionChain: string;
  quote: Quote;
  results :Results;
 
  name: string ="";
  address: string ="";
  phone: string ="";
  symbol: string ="";
  
  constructor(private restAPI:RESTAPIService,private http: HttpClient,private router: Router )
  {
    this.getAllStudent();
  }
  ngOnInit() {
  }
  openYahoo()
  {
    this.router.navigate(['localhost:4200/yahoo']);
  }

  loadData(){
    // code="AAPL";
    console.log(this.phone)
    // var symbol=this.addCustomerForm.value['customerNo']
    this.restAPI.getYahoopOtions(symbol).subscribe(d=>{
      //  this.results =d.optionChain;
      let res =[];
      res =d.optionChain.result;
      console.log(res);
      this.financeArray=d.optionChain.result;
       console.log(d.optionChain.result[0].quote.exchangeTimezoneName)
      //  console.log("results"+this.results)
    })}
   
  getAllStudent() {
 
    this.http.get("http://localhost:8030/user/getAll")
    .subscribe((resultData: any)=>
    {
      
        console.log(resultData);
        this.StudentArray = resultData.data;
    });
    
  
 
  }
 
  setUpdate(data: any)
  {
   this.name = data.name;
   this.address = data.address;
   this.phone = data.phone; 
   this.currentStudentID = data._id;
  
  }
 
  UpdateRecords()
  {
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
 
    };
    
    this.http.patch("http://localhost:8030/user/update"+ "/"+this.currentStudentID,bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Updateddd")
        this.getAllStudent();
      
    });
  }
  
  setDelete(data: any) {
    this.http.delete("http://localhost:8030/user/delete"+ "/"+ data._id).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Deletedddd")
        this.getAllStudent();
  
    });
    }
    
  save()
  {
    if(this.currentStudentID == '')
    {
        this.register();
    }
      else
      {
       this.UpdateRecords();
      }      
 
  }
 
register()
  {
 
    let bodyData = {
      "name" : this.name,
      "address" : this.address,
      "phone" : this.phone,
  };
   this.http.post("http://localhost:8030/user/create",bodyData).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Student Registered Successfully")
         this.name = '';
        this.address = '';
        this.phone  = '';
        this.getAllStudent();
        
    });
  }
}



