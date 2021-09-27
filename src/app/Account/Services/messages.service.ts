import { Injectable } from '@angular/core';
import { DataService } from 'Shared/Services/data.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class MessagesService extends DataService {
  constructor(http: HttpClient, private _http: HttpClient, localStorage: LocalstorageService) {
    super(http, environment.BASE_URL + '/MessagesLists', localStorage);
  }
  GetMessageThreads(id: number) {
    return this._http.get(environment.BASE_URL + '/MesgBoxDetails/' + id);
  }
  async FlagMessage(message: any) {
    return await this._http.post(environment.BASE_URL + '/FlagMessage', message);
  }
  ReplyMessage(message: any) {
    return this._http.post(environment.BASE_URL + '/AddNewMessageThread', message);
  }
  CheckIfSpam(id: number) {
    return this._http.get(environment.BASE_URL + '/CheckIfSpamMesg/' + id);
  }
  CheckNewThread(resource: any) {
    return this._http.post(environment.BASE_URL + '/ChcekIfNewThread', resource);
  }
  AddNewMessage(message: any) {
    return this._http.post(environment.BASE_URL + '/AddNewMessage', message);
  }
  AddNewMessageThread(message: any) {
    return  this._http.post(environment.BASE_URL + '/AddNewMessageThread', message);
  }
 async DeleteMessage(message: any) {
    return await this._http.post(environment.BASE_URL + '/MesgBoxes', message);
  }
  CheckMessageCredit(id) {
    return this._http.get(environment.BASE_URL + '/SentMessagesCredit/' + id);
  }
  UpdateReadMessageStatus(message: any) {
    return this._http.post(environment.BASE_URL + '/UpdateReadMessageStatus', message);
  }
  UpdateDeleteMessageStatus(message: any) {
    return this._http.post(environment.BASE_URL + '/UpdateDeleteMessageStatus', message);
  }
}
