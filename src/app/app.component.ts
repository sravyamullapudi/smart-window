import { Component } from '@angular/core';

interface DialogsData {
  header: string;
  isVisible: boolean;
  isHide: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-window';

  dialogsList: DialogsData[] = [];
  dialogCount = 0;
  config = {
    showTaskBar: true
  }
  resizeOptions = {
    horizontal: true,
    corners: true,
    both: false
  }

  showDialog() {
    this.dialogCount++;
    this.dialogsList.push({
      header: `Header ${this.dialogCount}`,
      isVisible: true,
      isHide: false
    });
  }

  closeDialog(data: any) {
    console.log(data);
  }

  visibleChanged(val: boolean, index: number) {
    this.dialogsList.splice(index, 1);
  }

  visibleToggleed(index: number) {
    this.dialogsList[index].isHide = !this.dialogsList[index].isHide;
    if (this.config.showTaskBar && !this.dialogsList[index].isHide) {
      const windowEle = <HTMLElement>document.querySelector(`div.container > custom-window:nth-child(${index + 1}) .p-component`);
      windowEle && windowEle.click()
    }
  }

  onMaximize(evnt: any, index: number) {
    console.log(evnt, index);
  }

  onMinimize(evnt: any, index: number) {
    console.log(evnt, index);
    if (this.config.showTaskBar) {
      this.visibleToggleed(index)
    }
  }


}
