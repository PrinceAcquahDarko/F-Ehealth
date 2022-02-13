import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.prod';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class ChatServiceService {
  url = environment.url;
  socket: any;
  allSubs = [];
  lstorage = JSON.parse(localStorage.getItem('Info')!);
  userId = this.lstorage.num;
  users = [];
  constructor(private http: HttpClient) {}

  initiliazeSocket() {
    this.socket = io.io(this.url, { autoConnect: false });
    if (this.userId) {
      let userId = this.userId;
      this.socket.auth = { userId };
    }
    this.socket.connect();

    this.socket.on('users', (data) => {
      this.users = data;
      console.log(this.users, 'from usersssss');
    });

    this.socket.on('user connected', (data) => {
      this.users.push(data);
      let user = this.allSubs.find((x) => x.uniqueNum === data.id);
      if (user) {
        user.online = true;
      }
    });
    return this.socket;
  }

  getAllSubs(): Observable<any> {
    return this.http
      .get<any>(
        this.url +
          '/api-chat' +
          '?me=' +
          this.userId +
          '&' +
          'status=' +
          this.lstorage.status
      )
      .pipe(catchError(this.handleError));
  }
  // + '?updatedId=' + std._id + '&' + 'class=' + stdsClass
  getChats(me, to): Observable<any> {
    return this.http
      .get<any>(
        this.url +
          '/api-chat/msgs' +
          '?me=' +
          me +
          '&' +
          'to=' +
          to +
          '&' +
          'status=' +
          this.lstorage.status
      )
      .pipe(catchError(this.handleError));
  }

  getNotifications(): Observable<any> {
    return this.http
      .get<any>(this.url + '/api-chat/notifications' + '?to=' + this.userId)
      .pipe(catchError(this.handleError));
  }

  handleError(err: HttpErrorResponse) {
    let message = '';

    if (err.error instanceof ErrorEvent) {
      console.log(err, 'from an instance');
      message = `an error occured: ${err.error.message}`;
    } else {
      console.log(err, 'from not an instance');
      message = err.error;
    }

    return throwError(message);
  }
}

//
