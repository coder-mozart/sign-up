import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  _postUrl: string = "https://demo-api.now.sh/users";

  constructor(private httpClient: HttpClient) { }

  registerUser(user: User){
    return this.httpClient.post(this._postUrl, user);
  }
}

