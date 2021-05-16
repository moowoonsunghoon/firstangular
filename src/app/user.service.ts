import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: UserData[] = [];
  userChange = new Subject<UserData[]>();
  constructor() {
    const userList = localStorage.getItem('userList');
    this.users = userList ? JSON.parse(userList) : [];
    this.userChange.subscribe((value) => (this.users = value));
  }

  addUser(user: UserData) {
    const getUserList = localStorage.getItem('userList');
    const userList = getUserList ? JSON.parse(getUserList) : [];
    const seq = userList.length > 0 ? userList[userList.length - 1].seq + 1 : 1;
    const setData = [...userList, { ...user, seq }];
    localStorage.setItem('userList', JSON.stringify(setData));
    this.userChange.next(setData);
  }

  deleteUser(users: UserData[]) {
    const result = this.users.reduce((initial: UserData[], current) => {
      const findUser = users.find((user) => user.seq === current.seq);
      if (!findUser) initial.push(current);
      return initial;
    }, []);
    localStorage.setItem('userList', JSON.stringify(result));
    this.userChange.next(result);
  }
}
