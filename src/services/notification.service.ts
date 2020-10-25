import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public notification: NzNotificationService) {
  }
  notificationTemplate(title): any {
    return `<ng-template #template>
          <div class="notif-title-wrapper">
            <p>${title}</p>
            <img src="./assets/Q.svg" />
          </div>
        </ng-template>`;
  }
  createNotification(type: string, title: string, body: string): void {



    this.notification.create(
      type,
      title = this.notificationTemplate(title),
      body,
      // { nzDuration: 0 }
    );

  }
}
