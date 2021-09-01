import {
  NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, Renderer2,
  ContentChildren, QueryList, ViewChild, NgZone, ChangeDetectorRef, ViewRef, ChangeDetectionStrategy, ViewEncapsulation, AfterContentInit, TemplateRef, ContentChild, OnInit
} from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent, animation, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Header, Footer, SharedModule, PrimeTemplate } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';
import { RippleModule } from 'primeng/ripple';
import { UniqueComponentId } from 'primeng/utils';

const showAnimation = animation([
  style({ transform: '{{transform}}', opacity: 0 }),
  animate('{{transition}}')
]);

const hideAnimation = animation([
  animate('{{transition}}', style({ transform: '{{transform}}', opacity: 0 }))
]);

@Component({
  selector: 'custom-window',
  templateUrl: './custom-window.component.html',
  animations: [
    trigger('animation', [
      transition('void => visible', [
        useAnimation(showAnimation)
      ]),
      transition('visible => void', [
        useAnimation(hideAnimation)
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./custom-window.component.scss']
})
export class CustomWindowComponent implements AfterContentInit, OnInit, OnDestroy {

  @Input() headerConfig!: any;


  @Input() draggable: boolean = true;

  @Input() resizable: any = { horizontal: false, vertical: false, both: true, corners: true };

  @Input() get positionLeft(): number {
    return 0;
  };

  set positionLeft(_positionLeft: number) {
    console.log("positionLeft property is deprecated.");
  }

  @Input() get positionTop(): number {
    return 0;
  };

  set positionTop(_positionTop: number) {
    console.log("positionTop property is deprecated.");
  }

  @Input() contentStyle: any;

  @Input()
  contentStyleClass!: string;

  @Input()
  toolsConfig!: Array<any>;

  @Input()
  modal!: boolean;

  @Input() closeOnEscape: boolean = true;

  @Input()
  dismissableMask!: boolean;

  @Input()
  rtl!: boolean;

  @Input() closable: boolean = true;

  @Input() get responsive(): boolean {
    return false;
  };

  set responsive(_responsive: boolean) {
    console.log("Responsive property is deprecated.");
  }

  @Input() appendTo: any;

  @Input()
  breakpoints!: any[];

  @Input()
  styleClass!: string;

  @Input()
  maskStyleClass!: string;

  @Input() showHeader: boolean = true;

  @Input() get breakpoint(): number {
    return 649;
  };

  set breakpoint(_breakpoint: number) {
    console.log("Breakpoint property is not utilized and deprecated, use breakpoints or CSS media queries instead.");
  }

  @Input() blockScroll: boolean = false;

  @Input() autoZIndex: boolean = true;

  @Input() baseZIndex: number = 0;

  @Input() minX: number = 0;

  @Input() minY: number = 0;

  @Input() focusOnShow: boolean = true;

  @Input()
  maximizable!: boolean;

  @Input() keepInViewport: boolean = true;

  @Input() focusTrap: boolean = true;

  @Input() transitionOptions: string = '150ms cubic-bezier(0, 0, 0.2, 1)';

  @Input() closeIcon: string = 'pi pi-times';

  @Input() minimizeIcon: string = 'pi pi-window-minimize';

  @Input() maximizeIcon: string = 'pi pi-window-maximize';

  @Input() config: any;

  @ContentChild(Header)
  headerFacet!: QueryList<Header>;

  @ContentChild(Footer)
  footerFacet!: QueryList<Footer>;

  @ContentChildren(PrimeTemplate)
  templates!: QueryList<any>;

  @ViewChild('titlebar')
  headerViewChild!: ElementRef;

  @ViewChild('content')
  contentViewChild!: ElementRef;

  @ViewChild('footer')
  footerViewChild!: ElementRef;

  @Output() onShow: EventEmitter<any> = new EventEmitter();

  @Output() onHide: EventEmitter<any> = new EventEmitter();

  @Output() visibleChange: EventEmitter<any> = new EventEmitter();

  @Output() onResizeInit: EventEmitter<any> = new EventEmitter();

  @Output() onResizeEnd: EventEmitter<any> = new EventEmitter();

  @Output() onDragEnd: EventEmitter<any> = new EventEmitter();

  @Output() onMaximize: EventEmitter<any> = new EventEmitter();

  @Output() onMinimize: EventEmitter<any> = new EventEmitter();

  @Output() onWindowActive: EventEmitter<any> = new EventEmitter();

  headerTemplate!: TemplateRef<any>;

  contentTemplate!: TemplateRef<any>;

  footerTemplate!: TemplateRef<any>;

  _visible!: boolean;

  maskVisible!: boolean;

  container!: any;

  wrapper!: HTMLElement;

  dragging!: boolean;

  documentDragListener: any;

  documentDragEndListener: any;

  resizing!: boolean;

  documentResizeListener: any;

  documentResizeEndListener: any;

  documentEscapeListener!: Function;

  maskClickListener!: Function;

  lastPageX!: number;

  lastPageY!: number;

  preventVisibleChangePropagation!: boolean;

  maximized: boolean = false;

  preMaximizeContentHeight!: number;

  preMaximizeContainerWidth!: number;

  preMaximizeContainerHeight!: number;

  preMaximizePageX!: number;

  preMaximizePageY!: number;

  id: string = UniqueComponentId();

  _style: any = {};

  _position: string = "center";

  originalStyle: any;

  transformOptions: any = "scale(0.7)";

  styleElement: any;

  isMinimized = false;

  bottom: boolean = false;

  right: boolean = false;

  left: boolean = false;

  top: boolean = false;

  constructor(public el: ElementRef, public renderer: Renderer2, public zone: NgZone, private cd: ChangeDetectorRef) { }

  ngAfterContentInit() {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'header':
          this.headerTemplate = item.template;
          break;

        case 'content':
          this.contentTemplate = item.template;
          break;

        case 'footer':
          this.footerTemplate = item.template;
          break;

        default:
          this.contentTemplate = item.template;
          break;
      }
    });
  }

  ngOnInit() {
    if (this.breakpoints) {
      this.createStyle();
    }
  }

  @Input() get visible(): any {
    return this._visible;
  }
  set visible(value: any) {
    this._visible = value;

    if (this._visible && !this.maskVisible) {
      this.maskVisible = true;
    }
  }

  @Input() get style(): any {
    return this._style;
  }
  set style(value: any) {
    if (value) {
      this._style = { ...value };
      this.originalStyle = value;
    }
  }

  @Input() get position(): string {
    return this._position;
  };

  set position(value: string) {
    this._position = value;

    switch (value) {
      case 'topleft':
      case 'bottomleft':
      case 'left':
        this.transformOptions = "translate3d(-100%, 0px, 0px)";
        break;
      case 'topright':
      case 'bottomright':
      case 'right':
        this.transformOptions = "translate3d(100%, 0px, 0px)";
        break;
      case 'bottom':
        this.transformOptions = "translate3d(0px, 100%, 0px)";
        break;
      case 'top':
        this.transformOptions = "translate3d(0px, -100%, 0px)";
        break;
      default:
        this.transformOptions = "scale(0.7)";
        break;
    }
  }

  focus() {
    let focusable = DomHandler.findSingle(this.container, '[autofocus]');
    if (focusable) {
      this.zone.runOutsideAngular(() => {
        setTimeout(() => focusable.focus(), 5);
      });
    }
  }

  close(event: Event) {
    this.visibleChange.emit(false);
    event.preventDefault();
  }

  enableModality() {
    if (this.closable && this.dismissableMask) {
      this.maskClickListener = this.renderer.listen(this.wrapper, 'mousedown', (event: any) => {
        if (this.wrapper && this.wrapper.isSameNode(event.target)) {
          this.close(event);
        }
      });
    }

    if (this.modal) {
      DomHandler.addClass(document.body, 'p-overflow-hidden');
    }
  }

  disableModality() {
    if (this.wrapper) {
      if (this.dismissableMask) {
        this.unbindMaskClickListener();
      }

      if (this.modal) {
        DomHandler.removeClass(document.body, 'p-overflow-hidden');
      }

      if (!(this.cd as ViewRef).destroyed) {
        this.cd.detectChanges();
      }
    }
  }

  maximize() {
    this.maximized = !this.maximized;

    if (!this.modal && !this.blockScroll) {
      if (this.maximized)
        DomHandler.addClass(document.body, 'p-overflow-hidden');
      else
        DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }

    this.onMaximize.emit({ 'maximized': this.maximized });
  }

  unbindMaskClickListener() {
    if (this.maskClickListener) {
      this.maskClickListener();
      this.maskClickListener = null as any;
    }
  }

  moveOnTop() {
    if (this.autoZIndex) {
      this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
      this.wrapper.style.zIndex = String(this.baseZIndex + (DomHandler.zindex - 1));
    }
    const elements = document.querySelectorAll('.p-component');
    elements.forEach(item => {
      item.classList.remove('isTop');
    });
    this.container.classList.add('isTop');
    this.onWindowActive.emit(true);
  }

  createStyle() {
    if (!this.styleElement) {
      this.styleElement = document.createElement('style');
      this.styleElement.type = 'text/css';
      document.head.appendChild(this.styleElement);
      let innerHTML = '';
      for (let breakpoint in this.breakpoints) {
        innerHTML += `
                    @media screen and (max-width: ${breakpoint}) {
                        .p-dialog[${this.id}] {
                            width: ${this.breakpoints[breakpoint]} !important;
                        }
                    }
                `
      }

      this.styleElement.innerHTML = innerHTML;
    }
  }

  initDrag(event: MouseEvent) {
    if (DomHandler.hasClass(event.target, 'p-dialog-header-icon') || DomHandler.hasClass((<HTMLElement>event.target).parentElement, 'p-dialog-header-icon')) {
      return;
    }

    if (this.draggable) {
      this.dragging = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;

      this.container.style.margin = '0';
      DomHandler.addClass(document.body, 'p-unselectable-text');
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (this.focusTrap) {
      if (event.which === 9) {
        event.preventDefault();

        let focusableElements = DomHandler.getFocusableElements(this.container);

        if (focusableElements && focusableElements.length > 0) {
          if (!focusableElements[0].ownerDocument.activeElement) {
            focusableElements[0].focus();
          }
          else {
            let focusedIndex = focusableElements.indexOf(focusableElements[0].ownerDocument.activeElement);

            if (event.shiftKey) {
              if (focusedIndex == -1 || focusedIndex === 0)
                focusableElements[focusableElements.length - 1].focus();
              else
                focusableElements[focusedIndex - 1].focus();
            }
            else {
              if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                focusableElements[0].focus();
              else
                focusableElements[focusedIndex + 1].focus();
            }
          }
        }
      }
    }
  }

  onDrag(event: MouseEvent) {
    if (this.dragging) {
      let containerWidth = DomHandler.getOuterWidth(this.container);
      let containerHeight = DomHandler.getOuterHeight(this.container);
      let deltaX = event.pageX - this.lastPageX;
      let deltaY = event.pageY - this.lastPageY;
      let offset = DomHandler.getOffset(this.container);
      let leftPos = offset.left + deltaX;
      let topPos = offset.top + deltaY;
      let viewport = DomHandler.getViewport();

      this.container.style.position = 'fixed';

      if (this.keepInViewport) {
        if (leftPos >= this.minX && (leftPos + containerWidth) < viewport.width) {
          this._style.left = leftPos + 'px';
          this.lastPageX = event.pageX;
          this.container.style.left = leftPos + 'px';
        }

        if (topPos >= this.minY && (topPos + containerHeight) < viewport.height) {
          this._style.top = topPos + 'px';
          this.lastPageY = event.pageY;
          this.container.style.top = topPos + 'px';
        }
      }
      else {
        this.lastPageX = event.pageX;
        this.container.style.left = leftPos + 'px';
        this.lastPageY = event.pageY;
        this.container.style.top = topPos + 'px';
      }
    }
  }

  endDrag(event: MouseEvent) {
    if (this.dragging) {
      this.dragging = false;
      DomHandler.removeClass(document.body, 'p-unselectable-text');
      this.cd.detectChanges();
      this.onDragEnd.emit(event);
    }
  }

  resetPosition() {
    this.container.style.position = '';
    this.container.style.left = '';
    this.container.style.top = '';
    this.container.style.margin = '';
  }

  //backward compatibility
  center() {
    this.resetPosition();
  }

  initResize(event: MouseEvent, top: boolean, bottom: boolean, right: boolean, left: boolean) {
    if (this.resizable.both || this.resizable.horizontal || this.resizable.vertical || this.resizable.corners) {
      this.resizing = true;
      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
      this.bottom = bottom;
      this.right = right;
      this.left = left;
      this.top = top;
      DomHandler.addClass(document.body, 'p-unselectable-text');
      this.onResizeInit.emit(event);
    }
  }

  onResize(event: MouseEvent) {
    if (this.resizing) {
      let deltaX = event.pageX - this.lastPageX;
      let deltaY = event.pageY - this.lastPageY;
      let containerWidth = DomHandler.getOuterWidth(this.container);
      let containerHeight = DomHandler.getOuterHeight(this.container);
      let contentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
      let newWidth = containerWidth + deltaX;
      let newHeight = containerHeight + deltaY;
      let minWidth = this.container.style.minWidth;
      let minHeight = this.container.style.minHeight;
      let offset = DomHandler.getOffset(this.container);
      let viewport = DomHandler.getViewport();
      let hasBeenDragged = !parseInt(this.container.style.top) || !parseInt(this.container.style.left);

      if (hasBeenDragged) {
        newWidth += deltaX;
        newHeight += deltaY;
      }

      if (this.right) {
        if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
          this._style.width = newWidth + 'px';
          this.container.style.width = this._style.width;
        }
      }

      if (this.bottom) {
        if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
          this.contentViewChild.nativeElement.style.height = contentHeight + newHeight - containerHeight + 'px';

          if (this._style.height) {
            this._style.height = newHeight + 'px';
            this.container.style.height = this._style.height;
          }
        }
      }

      if (this.left) {
        if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
          if (hasBeenDragged) {
            this._style.width = containerWidth - deltaX + 'px';
          } else {
            this._style.width = containerWidth + deltaX + 'px';
          }
          this.container.style.width = this._style.width;
        }
      }

      if (this.top) {
        if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
          this.contentViewChild.nativeElement.style.height = contentHeight + (containerHeight - deltaY) - containerHeight + 'px';

          if (this._style.height) {
            this._style.height = newHeight + 'px';
            this.container.style.height = this._style.height;
          }
        }
      }

      // if (newWidth < 300) {
      //   this._style.width = 350 + 'px';
      //   this.container.style.width = this._style.width;
      // }

      this.lastPageX = event.pageX;
      this.lastPageY = event.pageY;
    }
  }

  resizeEnd(event: any) {
    if (this.resizing) {
      this.resizing = false;
      DomHandler.removeClass(document.body, 'p-unselectable-text');
      this.onResizeEnd.emit(event);
    }
  }

  bindGlobalListeners() {
    if (this.draggable) {
      this.bindDocumentDragListener();
      this.bindDocumentDragEndListener();
    }

    if (this.resizable.both || this.resizable.horizontal || this.resizable.vertical || this.resizable.corners) {
      this.bindDocumentResizeListeners();
    }

    if (this.closeOnEscape && this.closable) {
      this.bindDocumentEscapeListener();
    }
  }

  unbindGlobalListeners() {
    this.unbindDocumentDragListener();
    this.unbindDocumentDragEndListener();
    this.unbindDocumentResizeListeners();
    this.unbindDocumentEscapeListener();
  }

  bindDocumentDragListener() {
    this.zone.runOutsideAngular(() => {
      this.documentDragListener = this.onDrag.bind(this);
      window.document.addEventListener('mousemove', this.documentDragListener);
    });
  }

  unbindDocumentDragListener() {
    if (this.documentDragListener) {
      window.document.removeEventListener('mousemove', this.documentDragListener);
      this.documentDragListener = null;
    }
  }

  bindDocumentDragEndListener() {
    this.zone.runOutsideAngular(() => {
      this.documentDragEndListener = this.endDrag.bind(this);
      window.document.addEventListener('mouseup', this.documentDragEndListener);
    });
  }

  unbindDocumentDragEndListener() {
    if (this.documentDragEndListener) {
      window.document.removeEventListener('mouseup', this.documentDragEndListener);
      this.documentDragEndListener = null;
    }
  }

  bindDocumentResizeListeners() {
    this.zone.runOutsideAngular(() => {
      this.documentResizeListener = this.onResize.bind(this);
      this.documentResizeEndListener = this.resizeEnd.bind(this);
      window.document.addEventListener('mousemove', this.documentResizeListener);
      window.document.addEventListener('mouseup', this.documentResizeEndListener);
    });
  }

  unbindDocumentResizeListeners() {
    if (this.documentResizeListener && this.documentResizeEndListener) {
      window.document.removeEventListener('mousemove', this.documentResizeListener);
      window.document.removeEventListener('mouseup', this.documentResizeEndListener);
      this.documentResizeListener = null;
      this.documentResizeEndListener = null;
    }
  }

  bindDocumentEscapeListener() {
    const documentTarget: any = this.el ? this.el.nativeElement.ownerDocument : 'document';

    this.documentEscapeListener = this.renderer.listen(documentTarget, 'keydown', (event) => {
      if (event.which == 27) {
        if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
          this.close(event);
        }
      }
    });
  }

  unbindDocumentEscapeListener() {
    if (this.documentEscapeListener) {
      this.documentEscapeListener();
      this.documentEscapeListener = null as any;
    }
  }

  appendContainer() {
    if (this.appendTo) {
      if (this.appendTo === 'body')
        document.body.appendChild(this.wrapper);
      else
        DomHandler.appendChild(this.wrapper, this.appendTo);
    }
  }

  restoreAppend() {
    if (this.container && this.appendTo) {
      this.el.nativeElement.appendChild(this.wrapper);
    }
  }

  onAnimationStart(event: AnimationEvent) {
    switch (event.toState) {
      case 'visible':
        this.container = event.element;
        this.wrapper = this.container.parentElement;
        this.appendContainer();
        this.moveOnTop();
        this.bindGlobalListeners();
        this.container.setAttribute(this.id, '');

        if (this.modal) {
          this.enableModality();
        }

        if (!this.modal && this.blockScroll) {
          DomHandler.addClass(document.body, 'p-overflow-hidden');
        }

        if (this.focusOnShow) {
          this.focus();
        }
        break;
    }
  }

  onAnimationEnd(event: AnimationEvent) {
    switch (event.toState) {
      case 'void':
        this.onContainerDestroy();
        this.onHide.emit({});
        break;
      case 'visible':
        this.onShow.emit({});
        break;
    }
  }

  onContainerDestroy() {
    this.unbindGlobalListeners();
    this.dragging = false;

    this.maskVisible = false;

    if (this.maximized) {
      DomHandler.removeClass(document.body, 'p-overflow-hidden');
      this.maximized = false;
    }

    if (this.modal) {
      this.disableModality();
    }

    if (this.blockScroll) {
      DomHandler.removeClass(document.body, 'p-overflow-hidden');
    }

    this.container = null;
    this.wrapper = null as any;

    this._style = this.originalStyle ? { ...this.originalStyle } : {};
  }

  destroyStyle() {
    if (this.styleElement) {
      document.head.removeChild(this.styleElement);
      this.styleElement = null;
    }
  }

  ngOnDestroy() {
    if (this.container) {
      this.restoreAppend();
      this.onContainerDestroy();
    }

    this.destroyStyle();
  }

  minimizeWindow(event: any) {
    if (this.config ?.showTaskBar) {

    } else {
      let viewport = DomHandler.getViewport();
      const targetEle = event.currentTarget.closest('.p-dialog-draggable');
      if (targetEle) {
        if (targetEle.classList.contains('minimizeView') && !this.maximized) {
          targetEle.style.width = '50vw';
          targetEle.style.left = (viewport.width / 4) + 'px';
          targetEle.style.top = ((viewport.height / 2) - (targetEle.clientHeight / 2)) + 'px';
        } else {
          targetEle.style.position = 'fixed';
          targetEle.style.width = '300px';
          targetEle.style.left = (viewport.width - 300) + 'px';
          targetEle.style.top = (viewport.height - 80) + 'px';
        }
      }
      if (this.maximized && this.isMinimized) {

      } else {
        this.isMinimized = !this.isMinimized;
      }
      if (this.maximized) {
        this.maximize();
      }
    }
    this.onMinimize.emit({ 'minimized': this.isMinimized });
  }
}