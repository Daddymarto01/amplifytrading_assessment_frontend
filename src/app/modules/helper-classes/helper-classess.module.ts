import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class HelperClassesModule { }
export class UtilityCompanies{
  code:string;
  companyName:string;
  accountNumber:string;
  createdBy:string;
  createdOn:string;
}
export class Bouquet{
  id:number
  name:string
}
export interface BouquetListItem {
  name: string;
  type: string;
  price: number;
  postage: number;
}
export interface Utilities
{
  id:number
  name:string
}
export interface Notifications {
  id: number;
  notificationID: string;
  mobileNumber: string;
  emailaddress: string;
  notificationType: string;
  requestDate: Date;
  notificationText: string;
  notificationSubject: string;
  remarks: string;
  network: string;
}
export interface LoggedInUser {
  userId: string;
  userNames: string;
  changePassword: boolean;
  daysToChangePassword: number;
  userProfile:string;
  lastChangedPassword: Date;
  lastLoggedIn: Date;
  serviceCenter: string;
  sessionId: string;
  group: string;
}
export class ReportParams {
  reportId: string;
  fromDate: Date;
  toDate: Date;
  generalDate: Date;
  reset: boolean;
  blocked: boolean;
  active: boolean;
  generalBool: boolean;
  moduleId: string;
  customerId: string;
  accountId: string;
  // location:string;
  phoneNumber: string;
  generalString: string;
  generalString03: string;
  generalString02: string;
  status: number;
  selectedItems:any [];
}
export class DropDownListItems {
  item_id:string;
  item_text:string;
}
export class ReviewDataParams {
  User: string; 
  ModuleID:string;
}
export interface Groups {
  id:string;
  text:string;
}
export class MobileGrid{
  mobile:string;
  account:string;
}
export interface Region {
  id: number;
  name: string;
  createdOn: Date;
  createdBy: string;
}

export interface Location {
  id: number;
  name: string;
  createdOn: Date;
  createdBy: string;
}

export interface Sector {
  id: number;
  name: string;
  createdOn: Date;
  createdBy: string;
}

export interface RootObjectAgency {
  regions: Region[];
  locations: Location[];
  sectors: Sector[];
}

