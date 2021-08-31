import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.scss']
})

export class TaskbarComponent implements OnInit, OnChanges {

  @Input() taskMenu: any;

  @Input() menuCout: any;

  @Output() visibleToggleed = new EventEmitter();

  isShowMore = false;
  showList = false;
  displayList: any[] = [];
  hiddenList: any[] = [];
  currentTime: any;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.setTime();
  }

  ngOnChanges() {
    this.checkMoreButton();
  }

  checkMoreButton() {
    this.cd.detectChanges();
    this.displayList = [...this.taskMenu];
    setTimeout(() => {
      const taskbarContainer = document.querySelector('.taskbar-container ul');
      if (taskbarContainer && taskbarContainer.parentElement && taskbarContainer.clientWidth > taskbarContainer.parentElement.clientWidth) {
        this.isShowMore = true;
        this.setHiddenList();
      } else {
        this.isShowMore = false;
        this.hiddenList = [];
      }
    }, 1);
  }

  setHiddenList() {
    let index = this.displayList.length - 1;
    let isStop = false;
    let width = 0;
    const taskbarContainer = document.querySelector('.taskbar-container ul');
    if (taskbarContainer && taskbarContainer.parentElement) {
      while (!isStop && index >= 0) {
        const liTag = document.querySelector(`.taskbar-container ul li[data-id='${index}']`);
        if (liTag) {
          width += liTag.clientWidth;
        }
        const resizeWidth = taskbarContainer.clientWidth - width;
        if (taskbarContainer.parentElement.clientWidth > resizeWidth) {
          isStop = true;
          console.log(index, this.displayList[index]);
          this.hiddenList = this.taskMenu.slice(index);
          this.displayList = this.taskMenu.slice(0, index);
        }
        index--;
      }
    }
  }

  toggle(index: number, from?: string) {
    this.showList = false;
    if (from === 'hiddenList') {
      this.visibleToggleed.emit(this.displayList.length + index);
      console.log(this.displayList.length + index);
    } else {
      console.log(index);
      this.visibleToggleed.emit(index);
    }
  }

  showListBtn() {
    this.showList = !this.showList;
  }

  setTime() {
    const calTime = () => {
      const date = new Date();
      const hours = date.getHours();
      let hours12Format = '';
      if (hours >= 12) {
        hours12Format = (hours === 12 ? hours : (hours - 12)) + `:${date.getMinutes()} PM`;
      } else {
        hours12Format = hours + `:${date.getMinutes()} AM`;
      }
      this.currentTime = hours12Format;
    };
    calTime();
    setInterval(() => {
      calTime();
    }, 1000 * 60)
  }

}
