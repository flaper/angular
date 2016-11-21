import {COMMON_PROVIDERS} from './common/providers';
import {CORE_PROVIDERS} from './core/providers';
import {USER_PROVIDERS} from './user/providers';
import {ObjectService, ManageRequestService} from './object/index';
import {StoryBestService, StoryService} from './story/index';
import {VoteService, PollService} from './poll/index';
import {PremiumSupport} from "./business/PremiumSupport";
import {SearchService, LocationService} from "./search/index";
const _PROVIDERS: Array<any> = [PremiumSupport, ManageRequestService, ObjectService, StoryBestService, StoryService, VoteService, PollService, SearchService, LocationService];

export const ALL_PROVIDERS = CORE_PROVIDERS.concat(COMMON_PROVIDERS, USER_PROVIDERS, _PROVIDERS);
