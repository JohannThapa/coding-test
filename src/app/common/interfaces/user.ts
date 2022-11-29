export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  avatar: string;
}
export class User implements IUser {
  id: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  age: number = 0;
  avatar: string = '';
  constructor(data?: Partial<User>) {
    Object.keys(data || {})
      .filter((key) => this.hasOwnProperty(key))
      .forEach((property: any) => {
        return ((<any>this)[property] = (<any>data)[property]);
      });
  }
}
