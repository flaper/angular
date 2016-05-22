import {AuthService} from "./auth/AuthService";
import {ApiService} from "./ApiService";
import {UserService} from "./UserService";
import {ACL} from "./ACL";

export const CORE_PROVIDERS = [AuthService, ApiService, UserService, ACL];
