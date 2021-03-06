export class Story {
  id: string;
  status: string;
  userId: string;
  objectId: string;
  slug: string;
  images: string[];
  title: string;
  content: string;
  type: string;
  tags: string[];
  rating: number;
  contentHTML: string;
  shortInline: string;
  shortText: string;
  views: number;
  viewsRecent: number;
  flagCp?: boolean;
  created: Date;
  updated: Date;
}
