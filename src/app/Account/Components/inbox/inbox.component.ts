import { isPlatformBrowser, Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'Account/Services/profile-service.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { WindowObjectService } from 'Shared/Services/window-object.service';

import { appMessages, appMessageThreads } from '../../models/messages';
import { MessagesService } from '../../Services/messages.service';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit, OnDestroy {
  //#region Declarations
  messageBody: string;
  messageList: appMessages[] = [];
  filtringList: appMessages[] = [];
  partnerThread: appMessages = {} as appMessages;
  partnerRowInde: number = 0;
  filteredMessageList: appMessages[] = [];
  flaggedMesgsList: appMessages[] = [];
  ReadMesgList: appMessages[] = [];
  UnreadMesgList: appMessages[] = [];
  RepliedMesgList: appMessages[] = [];
  UnrepliedMesgList: appMessages[] = [];
  messageThreadsList: appMessageThreads[] = [];
  MesgsCount: appMessageThreads[] = [];
  spamMessage: appMessageThreads[] = [];
  metaTags: MetaDefinition[] = [];
  SentFlagedMessage = { id: 0, isFlagged: false, flagIds: "" };
  DeletedMessage = { id: 0, SenderId: "" };
  blockedProfileObject = { UserId: "", AbuseProfileId: "" };
  CurrentMessage: appMessages;
  RepliedMessage: appMessageThreads;
  names = [];
  uNames = [];
  photos = [];
  Flagged = [];
  rowsIndexes = [];
  unreadMessages = [];
  repliedMessages = [];
  PartnerName: string = "";
  PartneruName: string = "";
  MyuName: string = "";
  routeName: string = "";
  sendMessageTo = "";
  readStatus = [];
  notification = [];
  threadsCount: number = 0;
  isStarted = false;
  isShowDetailsBox = false;
  isLoadingDetailsBox = true;
  isSpamMessage = false;
  changeUrlParam = false;
  isPaging = false;
  CallPaging = true;
  isMore = false;
  isLess = false;
  DataLoading = true;
  isMutualLikes = false;
  isMutualLoves = false;

  PageSize = 2;
  RecordCount = 0;
  DeleteMesg = [];
  isThreadOwner = [];
  selected = [];
  pageOfItems: Array<any> = [];
  placholderList = [1, 2, 3, 4, 5];
  HighlightRow: Number;
  ClickedRow: any;
  remainingText: number = 0;
  MessageSubscription: Subscription;
  FlagMessageSubscription: Subscription;
  ConfirmSubscription: Subscription;
  subscription: Subscription;
  //#endregion
  //#region Events
  constructor(public messagesService: MessagesService
    , private router: Router, private Activeroute: ActivatedRoute
    , private localStorage: LocalstorageService
    , private meta: MetaTagslService
    , private toster: ToastrService
    , private loc: Location
    , private windowobj: WindowObjectService
    , public profileService: ProfileService
    , @Inject(PLATFORM_ID) private platformId: any
  ) {
  }
  ngOnInit(): void {
    this.BindMessagesList(true);
    this.SetMetaTags();
    let windowHeight = this.windowobj.windowRef.outerHeight;
    console.log("init-window-height", windowHeight);
  }
  ngOnDestroy() {
    if (this.MessageSubscription) this.MessageSubscription.unsubscribe();
    if (this.ConfirmSubscription) this.ConfirmSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
    if (this.FlagMessageSubscription) this.FlagMessageSubscription.unsubscribe();
  }
  //#endregion
  //#region  Functions
  //open profile when click on profile image in left panel mesg list, right panel mesg threads and top right part photos
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: "Messages | ispace1" },
      { name: 'description', content: "Messages at ispace1" },
    ];
    this.meta.SetPageTitle("Messages | ispace1");
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  openProfile(message?: appMessages, thread?: appMessageThreads, rowIndex?: number, uName?: string) {
    if (message) {
      console.log("message>>" + message);
      if (message.senderId === +this.messagesService.getProfileId()) {
        this.uNames[rowIndex] = message.receiveruName;
      } else {
        this.uNames[rowIndex] = message.senderuName;
      }
      this.router.navigate(['/Profile/', this.uNames[rowIndex]]);
    }
    if (thread) {
      console.log("thread>> " + thread);
      this.router.navigate(['/Profile/', thread.senderuName]);
    }
    if (uName) {
      console.log("uname>> " + uName);
      this.router.navigate(['/Profile/', uName]);
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  ClearMessageListRowsStyle(messageList: any) {
    for (let i = 0; i < messageList.length; i++) {
      this.selected[i] = false;
      this.DeleteMesg[i] = false;
    }
  }
  //Set messgaes count in navbar
  async SetMessageCount() {
    let ThreadsCount = [];
    let MesgCount = 0;
    (await this.messagesService.GetUnreadMessagesCount(this.messagesService.getProfileId()))
      .subscribe((result: any) => {
        if (result.length > 0) {
          this.MesgsCount = result;
          for (let mesg of this.MesgsCount) {
            if (ThreadsCount.indexOf(mesg.threadId) === -1) {
              ThreadsCount.push(mesg.threadId);
            }
          }
          MesgCount = ThreadsCount.length;
        }
        console.log("Result for mesg count from inbox open details fun> " + MesgCount);
        this.localStorage.setItem("MesgCount", MesgCount.toString());
        this.messagesService.GetMesgCount();
        console.log("Mesg count> " + this.localStorage.getItem("MesgCount"));
      });
  }
  SetMessageExtraData(message: appMessages, rowIndex) {
    if (!this.changeUrlParam) {
      if (message.senderId === +this.messagesService.getProfileId()) {
        this.names[rowIndex] = message.rname;
        this.photos[rowIndex] = message.receiverImage;
        this.uNames[rowIndex] = message.receiveruName;
      } else {
        this.names[rowIndex] = message.sname;
        this.photos[rowIndex] = message.senderImage;
        this.uNames[rowIndex] = message.senderuName;
      }
      //set record bold if the logged in user is the reciever and did not read the last sent message.
      if (message.lastReceiverId === +this.messagesService.getProfileId()) {
        console.log("readIds>> " + message.readIds);
        console.log("lastReceiverId>> " + message.lastReceiverId);
        message.readIds === 0 ? this.unreadMessages[rowIndex] = true : this.unreadMessages[rowIndex] = false;
        this.repliedMessages[rowIndex] = false;
      }
      else { this.repliedMessages[rowIndex] = true; }
      if (message.flagIds.indexOf(this.messagesService.getProfileId()) !== -1) {
        console.log("is falg ids> " + message.flagIds);
        this.Flagged[rowIndex] = true;
      }
      else {
        console.log("is not falg ids> " + message.flagIds);
        this.Flagged[rowIndex] = false;
      }
    }
  }
  SetMessageThreadsExtraData(thread: appMessageThreads, rowIndex: number) {
    if (thread.senderId === +this.messagesService.getProfileId()) {
      this.isThreadOwner[rowIndex] = true;
      this.notification[rowIndex] = "You Sent " + thread.rname + " on ";
    }
    else {
      this.isThreadOwner[rowIndex] = false;
      this.notification[rowIndex] = thread.sname + " Sent you on ";
    }
    if (thread.readIds > 0) {
      this.readStatus[rowIndex] = "| Read.";
    } else {
      this.readStatus[rowIndex] = "| Not yet read.";
    }
  }
  openMessageDetails(message: appMessages, rowIndex) {
    //Update message read status
    if (message.lastReceiverId === +this.messagesService.getProfileId()) {
      const mesg = { ReceiverId: message.lastReceiverId, ThreadId: message.id };
      this.MessageSubscription = this.messagesService.UpdateReadMessageStatus(mesg)
        .subscribe(() => {
          console.log("Message read status updated Success");
          this.unreadMessages[rowIndex] = false;
          //Set mesg count
          this.SetMessageCount();
        });
    }
    message.mutuallikes === 2 ? this.isMutualLikes = true : this.isMutualLikes = false;
    message.mutualFav === 2 ? this.isMutualLoves = true : this.isMutualLoves = false;
    this.messageBody = "";
    this.CurrentMessage = {} as appMessages;
    this.CurrentMessage = message;
    this.ClearMessageListRowsStyle(this.messageList);
    this.selected[rowIndex] = !this.selected[rowIndex];
    this.isShowDetailsBox = true;
    this.threadsCount = message.threadMesgCount;
    if (message.senderId === +this.messagesService.getProfileId()) {
      this.PartnerName = message.rname;
      this.PartneruName = message.receiveruName;
      this.MyuName = message.senderuName;
    }
    else {
      this.PartnerName = message.sname;
      this.PartneruName = message.senderuName;
      this.MyuName = message.receiveruName;
    }
    this.sendMessageTo = "Send Message to " + this.PartnerName;
    this.BindMessageThreads(message.id);
    let windowHeight = this.windowobj.windowRef.outerHeight;
    console.log("open mesg details -window-height", windowHeight);
  }
  async BindMessagesList(firstLoad?: boolean) {
    this.MessageSubscription = (await this.messagesService.getById(this.messagesService.getProfileId()))
      .subscribe((result: any) => {
        if (result) {
          this.messageList = result;
          console.log("message list length> " + this.messageList.length);
          console.log("mutual likes 1 > " + this.messageList[0].mutuallikes);
          console.log("mutual likes 2 > " + this.messageList[3].mutuallikes);

          //check list length to set pageing option.
          this.messageList.length > this.PageSize ? this.isPaging = true : this.isPaging = false;
          if (this.isPaging) {
            if (this.CallPaging) {
              this.RecordCount = this.PageSize;
            }
            else {
              if (this.RecordCount > this.messageList.length) {
                this.RecordCount = this.messageList.length;
              }
            }
            console.log("current record count> " + this.RecordCount);
            this.SetPaging(this.RecordCount);
          }
          else {
            this.filteredMessageList = this.messageList;
          }
          if (firstLoad) {
            this.ShowThreadsByUnameRoute();
          }
          this.DataLoading = false;
        }
      });
  }
  SetPaging(size: number) {
    this.filteredMessageList.length = 0;
    for (let i = 0; i < size; i++) {
      this.filteredMessageList.push(this.messageList[i]);
    }
    this.ShowHideMoreLess();
  }
  ShowHideMoreLess() {
    if (this.messageList.length > this.filteredMessageList.length) {
      if (this.filteredMessageList.length === this.PageSize) {
        this.isMore = true;
        this.isLess = false;
      } else {
        this.isMore = true;
        this.isLess = true;
      }
    }
    else {
      this.isMore = false;
      this.isLess = true;
    }
  }
  ViewMore() {
    this.RecordCount += this.PageSize;
    //if page size > total records
    this.RecordCount > this.messageList.length ? this.RecordCount = this.messageList.length : this.RecordCount = this.RecordCount;
    this.SetPaging(this.RecordCount);
  }
  ViewLess() {
    this.RecordCount -= this.PageSize;
    this.RecordCount < this.PageSize ? this.RecordCount = this.PageSize : this.RecordCount = this.RecordCount;
    this.SetPaging(this.RecordCount);
    let windowHeight = this.windowobj.windowRef.outerHeight;
    console.log("view less-window-height", windowHeight);
    console.log(this.filteredMessageList.length);
  }
  ShowThreadsByUnameRoute() {
    this.subscription = this.Activeroute.params
      .subscribe((params) => {
        this.routeName = params['UserName'];
        console.log("route name>> " + this.routeName);
        for (var i = 0; i < this.messageList.length; i++) {
          if (this.messageList[i].senderId === +this.messagesService.getProfileId()) {
            if (this.routeName === this.messageList[i].receiveruName) {
              this.openMessageDetails(this.messageList[i], i);
            }
          } else {
            if (this.routeName === this.messageList[i].senderuName) {
              this.openMessageDetails(this.messageList[i], i);
            }
          }
        }
      });
  }
  BindMessageThreads(id: number) {
    this.MessageSubscription = this.messagesService.GetMessageThreads(id)
      .subscribe((result: any) => {
        if (result) {
          this.messageThreadsList = result;
        }
      });
  }
  async FlagMessage(ThreadId: number, flag: boolean) {
    let Flagged: boolean;
    flag ? Flagged = false : Flagged = true;
    this.SentFlagedMessage.id = ThreadId;
    this.SentFlagedMessage.isFlagged = Flagged;
    this.SentFlagedMessage.flagIds = this.messagesService.getProfileId();
    console.log("SentFlagedMessage id>>" + this.SentFlagedMessage.id);
    console.log("SentFlagedMessage flagIds>>" + this.SentFlagedMessage.flagIds);
    console.log("SentFlagedMessage isFlagged>>" + this.SentFlagedMessage.isFlagged);
    this.FlagMessageSubscription = (await this.messagesService.FlagMessage(this.SentFlagedMessage))
      .subscribe(() => {
        this.CallPaging = false;
        this.BindMessagesList();
      });
  }
  ReplyMessage() {
    this.RepliedMessage = {} as appMessageThreads;
    this.RepliedMessage.threadId = this.CurrentMessage.id;
    this.RepliedMessage.message = this.messageBody.replace(/ {2,}/g, ' ').trim()
      .replace(/[\r\n]{3,}/g, "\n\n");;
    this.RepliedMessage.senderId = +this.messagesService.getProfileId();
    this.RepliedMessage.sname = this.localStorage.getItem("Sname");
    this.RepliedMessage.receiverId =
      this.CurrentMessage.receiverId != +this.messagesService.getProfileId() ? this.CurrentMessage.receiverId : this.CurrentMessage.senderId;
    this.RepliedMessage.rname =
      this.CurrentMessage.rname != this.localStorage.getItem("Sname") ? this.CurrentMessage.rname : this.CurrentMessage.sname;
    this.MessageSubscription = this.messagesService.ReplyMessage(this.RepliedMessage)
      .subscribe(() => {
        this.messageBody = "";
        this.BindMessageThreads(this.CurrentMessage.id);
        this.CallPaging = false;
        this.BindMessagesList();
        this.ClearMessageListRowsStyle(this.messageList);
        this.selected[0] = !this.selected[0];
      });
  }
  CheckSpamMessage() {
    let spamCount = 0;
    this.MessageSubscription = this.messagesService.CheckIfSpam(this.CurrentMessage.id)
      .subscribe((result: any) => {
        if (result) {
          this.spamMessage = result;
          if (this.spamMessage.length === 5) {
            for (var i = 0; i < this.spamMessage.length; i++) {
              if (this.spamMessage[i].senderId === +this.messagesService.getProfileId()) {
                spamCount += 1;
              }
            }
            if (spamCount === 5) {
              this.isSpamMessage = true;
            }
            else {
              this.isSpamMessage = false;
            }
          }
          //Send reply
          if (!this.isSpamMessage) {
            this.ReplyMessage();
          }
          else {
            this.toster.error("Spam Alert: Please Wait for the other party to reply first.");
          }
        }
      });
  }
  //fun to relaod the component.
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
      console.log(currentUrl);
    });
  }
  async DeleteMessage(message: appMessages) {
    this.DeletedMessage.id = message.id;
    this.DeletedMessage.SenderId = this.messagesService.getProfileId();
    this.MessageSubscription = (await this.messagesService.DeleteMessage(this.DeletedMessage))
      .subscribe(() => {
        this.isShowDetailsBox = false;
        this.ClearMessageListRowsStyle(this.messageList);
        this.CallPaging = false;
        this.BindMessagesList();
        //block the other profile
        this.blockedProfileObject.UserId = this.messagesService.getProfileId();
        this.blockedProfileObject.AbuseProfileId = +this.messagesService.getProfileId() === message.senderId
          ? message.receiverId.toString()
          : message.senderId.toString();
        this.subscription = this.profileService.BlockProfile(this.blockedProfileObject)
          .subscribe((result: any) => {
            if (result) {
              console.log("profile blocked");
            }
          });
      });
  }
  FilterMessageList(filter: string) {
    //apply filters
    switch (filter) {
      case "View All":
        console.log(filter);
        this.filteredMessageList = this.messageList;
        break;
      case "Starred":
        this.filteredMessageList = this.messageList.filter(x => x.flagIds.indexOf(this.messagesService.getProfileId()) !== -1);
        console.log(this.filteredMessageList.length);
        console.log(this.filteredMessageList[0]);
        console.log(this.filteredMessageList[1]);
        break;
      case "Replied":
        this.filteredMessageList = this.messageList.filter(x => x.lastReceiverId === +this.messagesService.getProfileId());
        break;
      case "Unreplied":
        this.filteredMessageList = this.messageList.filter(x => x.lastReceiverId !== +this.messagesService.getProfileId());
        break;
      case "Read":
        this.filteredMessageList = this.messageList.filter(x => x.lastReceiverId !== +this.messagesService.getProfileId() || x.readIds === +this.messagesService.getProfileId());
        break;
      case "Unread":
        this.filteredMessageList = this.messageList.filter(x => x.lastReceiverId === +this.messagesService.getProfileId() && x.readIds === 0);
        break;
    }
  }
  ChangeRouteParam(uName: string) {
    this.changeUrlParam = true;
    let url = this.router.createUrlTree(['/Messages', uName.trim()]).toString();
    console.log("new url> " + url);
    this.loc.go(url);
    this.changeUrlParam = false;
  }
  //#endregion
}
