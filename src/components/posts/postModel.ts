export interface IPost {
  _id: string;
  title: string;
  content: string;
  imagePath: string;
  creator: {
    name: string;
  };
  createdAt: Date;
}
