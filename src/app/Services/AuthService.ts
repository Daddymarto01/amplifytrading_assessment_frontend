import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { LoggedInUser } from '../modules/helper-classes/helper-classes.module';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private isloggedIn: boolean;
 private userName:string;
 private token:string;
 public authErr=false;
 private data:any=[] ;
 private changePassword=false;
 private STORAGE_KEY = 'token';
 private loggedUser:LoggedInUser;
  constructor(private router: Router,@Inject(SESSION_STORAGE) private storage: StorageService) { 
    this.isloggedIn=false;
  }
  login(username: string, password:string,token:string) {
    this.storage.remove(this.STORAGE_KEY)
    this.storage.set(this.STORAGE_KEY,token);
    this.loggedUser=this.storage.get('user');
    this.changePassword=this.loggedUser.changePassword
    if(this.changePassword!==true)
    this.changePassword=this.loggedUser.daysToChangePassword< 0 || this.loggedUser.daysToChangePassword >=30? true:false;
    this.isloggedIn=!this.changePassword ? true:false;
    var route = !this.changePassword ? '/home' : '/change-password'; 
    this.router.navigate([ route ]);
  }

isUserLoggedIn(): boolean {
    return this.isloggedIn;
}
getToken(): string {
  return this.storage.get(this.STORAGE_KEY)
}
isAdminUser():boolean {
    if (this.userName=='Admin') {
        return true; 
    }
    return false;
}
logoutUser(): void{
  this.isloggedIn = false;
}
}