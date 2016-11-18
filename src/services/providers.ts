import {COMMON_PROVIDERS} from './common/providers';
import {CORE_PROVIDERS} from './core/providers';
import {USER_PROVIDERS} from './user/providers';
import {ObjectService, ManageRequestService} from './object/index';
import {StoryBestService, StoryService} from './story/index';
import {VoteService, PollService} from './poll/index';
import {PremiumSupport} from "./business/PremiumSupport";

const _PROVIDERS: Array<any> = [PremiumSupport, ManageRequestService, ObjectService, StoryBestService, StoryService, VoteService, PollService];

export const ALL_PROVIDERS = CORE_PROVIDERS.concat(COMMON_PROVIDERS, USER_PROVIDERS, _PROVIDERS);
