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
  displayBasic: boolean = false;
  displayBasic1: boolean = false;
  displayBasic2: boolean = false;

  dialogsList: DialogsData[] = [];
  dialogCount = 0;
  config = {
    showTaskBar: true
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

  showDialog1() {
    this.displayBasic1 = true;
  }
  showDialog2() {
    this.displayBasic2 = true;
  }

  visibleChanged(val: boolean, index: number) {
    this.dialogsList.splice(index, 1);
  }

  visibleToggleed(index: number) {
    this.dialogsList[index].isHide = !this.dialogsList[index].isHide;
  }

  onMaximize(evnt: any, index: number) {
    console.log(evnt);
  }

  onMinimize(evnt: any, index: number) {
    console.log(evnt);
    if (this.config.showTaskBar) {
      this.visibleToggleed(index)
    }
  }


}
