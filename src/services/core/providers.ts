import {AuthService} from "./auth/AuthService";
import {ApiService} from "./ApiService";
import {UserService} from "./UserService";
import {ACL} from "./ACL";
import {RoleService} from "./RoleService";

export const CORE_PROVIDERS: Array<any> = [AuthService, ApiService, ACL, UserService, RoleService];
