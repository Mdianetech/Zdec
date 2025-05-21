export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  video?: string;
  likes: string[];
  likesCount: number;
  hasLiked: boolean;
  comments: Comment[];
  createdAt: Date;
  category: string;
  location: string;
  userId: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  createdAt: Date;
}