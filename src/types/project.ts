export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  video?: string;
  likes: number;
  hasLiked: boolean;
  comments: Comment[];
  createdAt: Date;
  category: string;
  location: string;
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  content: string;
  createdAt: Date;
}