import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { resourceLimits } from 'worker_threads';
import { appTicketMaster, appTicketDetailstbl } from '../../models/support';
import { SupportService } from '../../Services/support.service';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit, OnDestroy {
  //#region  DECLARATIONS
  ticktesList: appTicketMaster[] = [];
  ticktesDetailsList: appTicketDetailstbl[] = [];
  TicketMasterSubscription: Subscription;
  TicketDetailsSubscription: Subscription;
  pageOfItems: Array<any> = [];
  placeHolderList = [1, 2, 3, 4, 5];
  profileId = 0;
  ticketId;
  problemRemainingChars = 0;
  subjectRemainingChars = 0;
  messageRemainingChars = 0;
  ShowNewTicket = false;
  ShowTicketDetails = false;
  DataLoading = true;
  selected = [];
  replyMeesage = "";
  ProblemStatus = "";
  searchText = "";
  //#endregion
  //#region  Events
  constructor(private supportS: SupportService,
    @Inject(PLATFORM_ID) private platformId: any) { }
  ngOnInit(): void {
    this.profileId = +this.supportS.getProfileId();
    this.BindTicketsList();
  }
  ngOnDestroy() {
    if (this.TicketMasterSubscription) { this.TicketMasterSubscription.unsubscribe; }
    if (this.TicketDetailsSubscription) { this.TicketDetailsSubscription.unsubscribe; }
  }
  //#endregion
  //#region  Functions
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  //bind tickets list
  async BindTicketsList() {
    this.TicketMasterSubscription = (await this.supportS.getById(this.profileId))
      .subscribe((result: any) => {
        if (result) {
          this.ticktesList = result;
          this.DataLoading = false;
          console.log("tickets>> " + this.ticktesList);
        }
      });
  }
  async BindTicketDetails(id) {
    this.TicketDetailsSubscription = (await this.supportS.GetTicketsDetials(id))
      .subscribe((result: any) => {
        if (result) {
          this.ticktesDetailsList = result;
        }
      });
  }
  //Open ticket Details
  OpenTicketDetails(ticket: appTicketMaster, RowIndex: number) {
    this.ClearRowsStyle();
    this.selected[RowIndex] = true;
    this.ticketId = ticket.id;
    this.ProblemStatus = ticket.problemStatus;
    this.ShowTicketDetails = true;
    console.log("ticket id>> " + this.ticketId);
    this.BindTicketDetails(this.ticketId);
  }
  //Add new ticket
  async CreateTicket(frm: NgForm) {
    console.log(frm.value);
    const ticket = {
      UserId: this.profileId,
      TypeOfProblem: frm.value["typeOfProblem"],
      ProblemName: frm.value["Subject"],
      UserComments: frm.value["problem"],
      isAdmin: "0"
    }
    console.log("new ticket>> " + ticket);
    this.TicketMasterSubscription = (await this.supportS.AddTicket(ticket))
      .subscribe(() => {
        this.BindTicketsList();
        this.ShowNewTicket = false;
        this.ShowTicketDetails = false;
        this.ClearRowsStyle();
      });
  }
  //Add reply ticket
  async ReplyTicket() {
    const ticket = {
      Id: this.ticketId,
      UserId: this.profileId,
      AdminComments: this.replyMeesage,
      ProblemStatus: this.ProblemStatus,
      ProblemSolvingRate: "1",
      UserComments: ""
    };
    this.TicketMasterSubscription = (await this.supportS.AddTicketReply(ticket))
      .subscribe(() => {
        this.replyMeesage = "";
        this.messageRemainingChars = 0;
        this.BindTicketDetails(this.ticketId);
      });
  }
  ClearRowsStyle() {
    for (var i = 0; i < this.ticktesList.length; i++) {
      this.selected[i] = false;
    }
  }
  ShowHideButtons(action: string) {
    this.ClearRowsStyle();
    switch (action) {
      case "newticket":
        this.ShowNewTicket = true;
        this.ShowTicketDetails = false;
        break;
      case "cancelnew":
        this.ShowNewTicket = false;
        this.subjectRemainingChars = 0;
        break;
      case "cancelreply":
        this.ShowTicketDetails = false;
        this.replyMeesage = "";
        this.messageRemainingChars = 0;
        break;
    }
  }
  //#endregion
}
