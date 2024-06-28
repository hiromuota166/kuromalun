export interface Link {
  title: string;
  url: string;
}

export interface Circle {
  uid: string;
  name: string;
  circlesImageId: string;
  activity?: string;
  place?: string;
  time?: string;
  size?: string;
  link?: Link[];
}

export interface User {
  uid: string;
  displayName: string;
  userImage?: string;
}