type TweefT = {
  content: string;
  id: string;
  like: string[];
  user: UserT;
  comments: CommentT[];
  createdAt: Date;
  updatedAt: Date;
};

type UserT = {
  id: string;
  name: string;
  image: string;
  email: string;
};

type CommentT = {
  id: string;
  comment: string;
  tweetId: string;
  user: UserT;
};
