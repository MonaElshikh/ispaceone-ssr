import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { DataService } from 'Shared/Services/data.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root'
})
export class SupportService extends DataService {
  constructor(http: HttpClient, private _http: HttpClient, localStorage: LocalstorageService) {
    super(http, environment.BASE_URL + '/GetTickets', localStorage);
  }
  async GetTicketsDetials(id: number) {
    return await this._http.get(environment.BASE_URL + '/GetTicketDetails/' + id);
  }
  async AddTicket(ticket: any) {
    return  await this._http.post(environment.BASE_URL + '/AddTicket', ticket);
  }
  async AddTicketReply(ticket: any) {
    return  await this._http.post(environment.BASE_URL + '/AddTicketReply', ticket);
  }
}
