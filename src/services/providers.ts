import {CORE_PROVIDERS} from './core/providers';
import {ObjectService, ManageRequestService} from './object/index';
import {StoryBestService, StoryService} from './story/index';

const _PROVIDERS:Array<any> = [ManageRequestService, ObjectService, StoryBestService, StoryService];

export const ALL_PROVIDERS = CORE_PROVIDERS.concat(_PROVIDERS);
