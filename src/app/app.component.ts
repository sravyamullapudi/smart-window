import { Component } from '@angular/core';

interface DialogsData {
  headerConfig: object;
  isVisible: boolean;
  isHide: boolean;
  componentType?: string;
  isFocused?: boolean;
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
    alignment: 'left',
    handler: (evt: any) => {
      this.save();
    }
  }];

  startMenu = [
    {
      label: 'Table Window',
      icon: 'pi-table',
      windowType: 'tableWindow'
    },
    {
      label: 'Form Window',
      icon: 'pi-id-card',
      windowType: 'formWindow'
    },
    {
      label: 'Accordion Window',
      icon: 'pi-desktop',
      windowType: 'accordionWindow'
    },
    {
      label: 'Tab Window',
      icon: 'pi-id-card',
      windowType: 'tabWindow'
    },
  ];

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

  selectedWindow(data: any) {
    const index = this.dialogsList.findIndex(item => item.componentType === data.windowType);
    if (index === -1) {
      this.dialogsList.push({
        headerConfig: {
          title: data.label,
          icon: data.icon,
          titleClass: '',
          iconClass: '',
          style: '',
          alignment: 'left'
        },
        isVisible: true,
        isHide: false,
        componentType: data.windowType
      });
    } else {
      this.visibleToggleed(index, true);
    }
  }

  closeDialog(data: any) {
    console.log(data);
  }

  visibleChanged(val: boolean, index: number) {
    this.dialogsList.splice(index, 1);
  }

  visibleToggleed(index: number, showWindow?: boolean) {
    if (showWindow) {
      this.dialogsList[index].isHide = false;
    } else {
      this.dialogsList[index].isHide = !this.dialogsList[index].isHide;
    }
    if (this.config.showTaskBar && !this.dialogsList[index].isHide) {
      const windowEle = <HTMLElement>document.querySelector(`div.container > custom-window:nth-child(${index + 1}) .p-component`);
      windowEle && windowEle.click()
    } else {
      this.dialogsList[index].isFocused = false;
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

  save() {
    console.log('save');
  }
  onActive(event: any, index: number) {
    this.dialogsList.forEach(item => {
      item.isFocused = false;
    });
    this.dialogsList[index].isFocused = true;
  }


}
