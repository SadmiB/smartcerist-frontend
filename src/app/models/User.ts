import { Permission } from "./Permission";

export class User{
    _id : String;
    firstName: String;
    lastName: String;
    email:  String;
    password: String;
    phone:  String;
    gender: String;
    country: String;
    city: String;
    postCode: String;
    status:Boolean;
    picture:String;
    homes: String[];
    rooms:Permission[];
}