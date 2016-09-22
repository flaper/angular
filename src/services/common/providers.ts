import {CommentService} from "./CommentService";
import {ImageService} from "./ImageService";
import {LikeService} from "./LikeService";
import {ViewService} from "./ViewService";
import {SubscriptionService} from "./SubscriptionService";

export const COMMON_PROVIDERS = [SubscriptionService,CommentService, ImageService, LikeService, ViewService];
