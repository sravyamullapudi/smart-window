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

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.checkMoreButton();
  }

  checkMoreButton() {
    this.cd.detectChanges();
    setTimeout(() => {
      const taskbarContainer = document.querySelector('.taskbar-container ul');
      if (taskbarContainer && taskbarContainer.parentElement && taskbarContainer.clientWidth > taskbarContainer.parentElement.clientWidth) {
        this.isShowMore = true;
      } else {
        this.isShowMore = false;
      }
    }, 1);
  }

  toggle(item: any, index: number) {
    this.showList = false;
    this.visibleToggleed.emit(index);
  }

  showListBtn() {
    this.showList = !this.showList;
  }

}
