import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Router } from 'express';
import { ConfirmDialogService } from './confirm-dialog.service';
export interface CanComponentDeactivate {
  confirm(): boolean;
}
@Injectable()
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  constructor(private ConfirmDialogService: ConfirmDialogService) {
  }
  canDeactivate(
    component: CanComponentDeactivate,
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    nextState:RouterStateSnapshot): boolean {
    if (!component.confirm()) {
      console.log("next url> ", next.url);
      console.log("state url> ", state.url);
      console.log("nextState url> ", nextState.url);
      this.ConfirmDialogService.confirm("Leave Page?", "Your account will be automatically deleted if not activated", "Ok", "Cancel", "sm")
        .then((confirmed) => {
          console.log("confirm", confirmed);
          if (confirmed) {
            return true;
          }
          else {
            return false;
          }
        });
    }
    else {
      return true;
    }
  }
}