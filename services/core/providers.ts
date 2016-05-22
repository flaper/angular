import {AUTH_SERVICE_PROVIDER} from './auth/AuthService';
import {API_SERVICE_PROVIDER} from './ApiService';
import {USER_SERVICE_PROVIDER} from './UserService';
import {ACL_PROVIDER} from './ACL';

export const CORE_PROVIDERS = [AUTH_SERVICE_PROVIDER, API_SERVICE_PROVIDER, USER_SERVICE_PROVIDER, ACL_PROVIDER];
