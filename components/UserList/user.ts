export interface Name {
  title: string;
  first: string;
  last: string;
}

export interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

export interface Location {
  country: string;
  state: string;
  city: string;
  street: Street;
}
export interface Login {
  username: string;
}
export interface Street {
  number: number;
  name: string;
}
export interface Registered {
  age: number;
}
export interface User {
  name: Name;
  picture: Picture;
  location: Location;
  email: string;
  phone: string;
  login: Login;
  registered: Registered;
}
