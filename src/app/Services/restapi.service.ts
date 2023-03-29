import { Injectable, Inject} from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient, HttpParams} from '@angular/common/http';
import { catchError, retry, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { throwError, Observable, of, Subject} from 'rxjs';
import { EnvironmentUrlService } from './environment-url.service';
import { AuthService } from './AuthService';
// import { User } from './User';
// import { Role } from './Role';
// import { UserDetails } from './UserDetails';
// import { UnsupervisedUser } from './UnsupervisedUser';
// import { _Module } from './Module';
// import { sqs } from './sqs';
// import { Commands_Questions } from './Commands_Questions';
// import { CustomerCBSDetails, CustomerDetails } from './CustomerDetails';
// import { Authorization } from './Authorization';
// import { Commands } from './Commands';
// import { UtilityCompanies, BouquetListItem, DropDownListItems, RootObjectAgency} from '../modules/helper-classes/helper-classes.module';
// import { UtilityCommissionListItem } from '../views/menu/utilities/manage-commissions/utility-commission-list/utility-commission-list-datasource';
// import { SortCodes } from './SortCodes';
// import { CustomerStaticData } from '../views/menu/StaticData/customer-settings-form/customer-settings-form.component';
// import { UtilityStaticData } from '../views/menu/StaticData/utility-settings-form/utility-settings-form.component';
// import { DefaultCommands, RootObjectSupervisionData, menuIds } from '../modules/customer-details/customer-details.module';
// import { Option } from 'src/app/modules/customer-details/customer-details.module';
// import { ProductLimits } from '../views/menu/StaticData/limits-management/limits-management.component';
// import { DashBoardDataObject } from '../views/main-dashboard/main-dashboard.component';
// import { ModuleSwitch } from '../models/ModuleSwitch';
// import { userInfo } from 'os';
// import { Module } from 'module';

@Injectable({
  providedIn: 'root'
})
export class RESTAPIService {
  public errorMessage: string = '';
  public _ERROR:Number;
//   public Users : User[];
//   public sqs:sqs[];
  private userLoggedIn = new Subject<boolean>();
  options:any;
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }

  constructor(private httpClient: HttpClient,private router: Router,private envUrl: EnvironmentUrlService,private authService: AuthService) {
    this.userLoggedIn.next(false);
   }

   public getYahoopOtions(symbol)
    {
      return this.httpClient
      .get<any[]>(this.createCompleteRoute('finance/options/'+symbol, this.envUrl.yahooUlAddress))

    }


   setUserLoggedIn(userLoggedIn: boolean) {
    this.userLoggedIn.next(userLoggedIn);
  }

  getUserLoggedIn(): Observable<boolean> {
    return this.userLoggedIn.asObservable();
  }

  public aunthenticate(formData) {
    let headers = new Headers();
    let authToken = this.authService.getToken();
  
     this.options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `${authToken}`)
    }
     return this.httpClient
      .post<any>(this.createCompleteRoute("security/Auth/login", this.envUrl.urlAddress), JSON.stringify(formData), this.generateHeaders())
      .pipe(
        map((response: any) => response),
        catchError(this.handleLoginError)
      ) 
  }
  public aunthenticateForPasswordReset(formData) {
    let headers = new Headers();
    let authToken = this.authService.getToken();
  
     this.options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `${authToken}`)
    }
     return this.httpClient
      .post<any>(this.createCompleteRoute("security/Auth/login", this.envUrl.urlAddress), JSON.stringify(formData), this.generateHeaders())
  }
  public ResetPassword(formData) {
    let headers = new Headers();
    let authToken = this.authService.getToken();
  
     this.options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `${authToken}`)
    }
     return this.httpClient
      .post<any>(this.createCompleteRoute("security/Auth/changePassword", this.envUrl.urlAddress), JSON.stringify(formData), this.generateHeaders())
  }
  public ForgotPassword(email) {
    let headers = new Headers();
    let authToken = this.authService.getToken();
  
     this.options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json').append('Authorization', `${authToken}`)
    }
     return this.httpClient
      .post<any>(this.createCompleteRoute("security/Auth/forgotPassword?Email="+email, this.envUrl.urlAddress),null, this.generateHeaders())
  }
public addPortalUser(formData)
{
  return this.httpClient
  .post<any>(this.createCompleteRoute("UIContext/AddUsers", this.envUrl.urlAddress), JSON.stringify(formData), this.httpOptions)
  .pipe(
    catchError(this.handleLoginError)
  )
}
public addCustomer(formData)
{
  // console.log(JSON.stringify(formData))
  return this.httpClient
  .post<any>(this.createCompleteRoute("UIContext/AddCustomer", this.envUrl.urlAddress), JSON.stringify(formData), this.httpOptions)
  .pipe(
    catchError(this.handleLoginError)
  )
}
// public addPortalRole(role,User)
// {
//   return this.httpClient
//   .post<UnsupervisedUser>(this.createCompleteRoute("UIContext/AddRole?Role="+role+"&User="+User, this.envUrl.urlAddress), this.httpOptions) 
// }
// public editPortalUser(formData)
// {
//   return this.httpClient
//   .post<any>(this.createCompleteRoute("UIContext/EditUser", this.envUrl.urlAddress), JSON.stringify(formData), this.httpOptions)
//   .pipe(
//     catchError(this.handleLoginError)
//   )
// }
// public  getPortalApprovedUsers(){
//   return this.httpClient.get<User[]>(this.createCompleteRoute("manager/Users/getUsers", this.envUrl.urlAddress))
// }
 
  handleError(error: any) {
    this._ERROR=error.status
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
         if(error.status===401)
         { 
           console.error(`Authentication Error`)
         }
         else{
          console.error(`Something bad happened.Contact system admin`)
          console.error(`Actual error:`+JSON.stringify(error.error))
         }
      }
      return throwError(
        this._ERROR
        );
  }
  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
    handleLoginError(error: HttpErrorResponse) {
      this._ERROR=error.status
      if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
      } else {
         if(error.status===401)
         { 
           console.error(`Authentication Error`)
          
         }
         else{
          console.error(`Something bad happened.Contact system admin`)
          console.error(`Actual error:`+error.error)
         }
      }
      return throwError(
        this._ERROR
        
        );
    };
}
