import {AuthService} from "./auth/AuthService";
import {ApiService} from "./ApiService";
import {UserService} from "./UserService";
import {UserMenuService} from "./UserMenuService";
import {ACL} from "./ACL";
import {RoleService} from "./RoleService";

export const CORE_PROVIDERS:Array<any> = [AuthService, ApiService, ACL, UserService,UserMenuService, RoleService];
