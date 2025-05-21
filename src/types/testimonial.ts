export interface Testimonial {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  service: string;
  createdAt: Date;
  approved: boolean;
}