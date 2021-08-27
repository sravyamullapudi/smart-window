import { Component } from '@angular/core';

interface DialogsData {
  headerConfig: object;
  isVisible: boolean;
  isHide: boolean;
  componentType?: string;
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
    both: true,
    vertical: true
  }

  toolsConfig = [{
    icon: 'pi pi-plus',
    style: '',
    iconCls: '',
    buttonCls: '',
    label: 'save',
    alignment: 'left'
  }];

  showDialog(type?: string) {
    if (type === 'table') {
      this.dialogsList.push({
        headerConfig: {
          title: `Table Window`,
          icon: '',
          titleClass: '',
          iconClass: '',
          style: '',
          alignment: 'left'
        },
        isVisible: true,
        isHide: false,
        componentType: 'tableLayout'
      });
    } else if (type === 'form') {
      this.dialogsList.push({
        headerConfig: {
          title: `Form Layout`,
          icon: '',
          titleClass: '',
          iconClass: '',
          style: '',
          alignment: 'left'
        },
        isVisible: true,
        isHide: false,
        componentType: 'formLayout'
      });
    } else {
      this.dialogCount++;
      this.dialogsList.push({
        headerConfig: {
          title: `Header ${this.dialogCount}`,
          icon: '',
          titleClass: '',
          iconClass: '',
          style: '',
          alignment: 'center'
        },
        isVisible: true,
        isHide: false
      });
    }
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
