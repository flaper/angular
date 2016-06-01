import {CORE_PROVIDERS} from './core/providers';
import {ObjectService} from './object/ObjectService';
import {ManageRequestService} from './object/ManageRequestService';

const _PROVIDERS:Array<any> = [ManageRequestService, ObjectService];

export const ALL_PROVIDERS = CORE_PROVIDERS.concat(_PROVIDERS);
