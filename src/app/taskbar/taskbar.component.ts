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
    const taskbarContainer = document.querySelector('.taskbar-container ul');
    if (taskbarContainer && taskbarContainer.clientWidth > (window.innerWidth - 100)) {
      this.isShowMore = true;
    } else {
      this.isShowMore = false;
    }
  }

  toggle(item: any, index: number) {
    this.showList = false;
    this.visibleToggleed.emit(index);
  }

  showListBtn() {
    this.showList = !this.showList;
  }

}
