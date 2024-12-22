import { Directive, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { PlacementTypes } from './position';
import { StyleTypes } from './style.type';
import { ShowTypes } from './show.type';
import * as i0 from "@angular/core";
import * as i1 from "./tooltip.service";
export class TooltipDirective {
    constructor(tooltipService, viewContainerRef, renderer) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.tooltipCssClass = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = PlacementTypes.Top;
        this.tooltipAlignment = PlacementTypes.Center;
        this.tooltipType = StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = ShowTypes.all;
        this.tooltipImmediateExit = false;
        this.show = new EventEmitter();
        this.hide = new EventEmitter();
    }
    get listensForFocus() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.focus;
    }
    get listensForHover() {
        return this.tooltipShowEvent === ShowTypes.all || this.tooltipShowEvent === ShowTypes.mouseover;
    }
    ngOnDestroy() {
        this.hideTooltip(true);
    }
    onFocus() {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    }
    onBlur() {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    }
    onMouseEnter() {
        if (this.listensForHover) {
            this.showTooltip();
        }
    }
    onMouseLeave(target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                const contentDom = this.component.instance.element.nativeElement;
                const contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip(this.tooltipImmediateExit);
        }
    }
    onMouseClick() {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    }
    showTooltip(immediate) {
        if (this.component || this.tooltipDisabled)
            return;
        const time = immediate
            ? 0
            : this.tooltipShowTimeout + (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) ? 400 : 0);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.tooltipService.destroyAll();
            const options = this.createBoundOptions();
            this.component = this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(() => {
                if (this.component) {
                    this.addHideListeners(this.component.instance.element.nativeElement);
                }
            }, 10);
            this.show.emit(true);
        }, time);
    }
    addHideListeners(tooltip) {
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', () => {
            clearTimeout(this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', () => {
                this.hideTooltip(this.tooltipImmediateExit);
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen('window', 'click', event => {
                const contains = tooltip.contains(event.target);
                if (!contains)
                    this.hideTooltip();
            });
        }
    }
    hideTooltip(immediate = false) {
        if (!this.component)
            return;
        const destroyFn = () => {
            // remove events
            if (this.mouseLeaveContentEvent)
                this.mouseLeaveContentEvent();
            if (this.mouseEnterContentEvent)
                this.mouseEnterContentEvent();
            if (this.documentClickEvent)
                this.documentClickEvent();
            // emit events
            this.hide.emit(true);
            // destroy component
            this.tooltipService.destroy(this.component);
            this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    }
    createBoundOptions() {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    }
}
TooltipDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipDirective, deps: [{ token: i1.TooltipService }, { token: i0.ViewContainerRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
TooltipDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.2.1", type: TooltipDirective, selector: "[ngx-tooltip]", inputs: { tooltipCssClass: "tooltipCssClass", tooltipTitle: "tooltipTitle", tooltipAppendToBody: "tooltipAppendToBody", tooltipSpacing: "tooltipSpacing", tooltipDisabled: "tooltipDisabled", tooltipShowCaret: "tooltipShowCaret", tooltipPlacement: "tooltipPlacement", tooltipAlignment: "tooltipAlignment", tooltipType: "tooltipType", tooltipCloseOnClickOutside: "tooltipCloseOnClickOutside", tooltipCloseOnMouseLeave: "tooltipCloseOnMouseLeave", tooltipHideTimeout: "tooltipHideTimeout", tooltipShowTimeout: "tooltipShowTimeout", tooltipTemplate: "tooltipTemplate", tooltipShowEvent: "tooltipShowEvent", tooltipContext: "tooltipContext", tooltipImmediateExit: "tooltipImmediateExit" }, outputs: { show: "show", hide: "hide" }, host: { listeners: { "focusin": "onFocus()", "blur": "onBlur()", "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave($event.target)", "click": "onMouseClick()" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ngx-tooltip]' }]
        }], ctorParameters: function () { return [{ type: i1.TooltipService }, { type: i0.ViewContainerRef }, { type: i0.Renderer2 }]; }, propDecorators: { tooltipCssClass: [{
                type: Input
            }], tooltipTitle: [{
                type: Input
            }], tooltipAppendToBody: [{
                type: Input
            }], tooltipSpacing: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], tooltipShowCaret: [{
                type: Input
            }], tooltipPlacement: [{
                type: Input
            }], tooltipAlignment: [{
                type: Input
            }], tooltipType: [{
                type: Input
            }], tooltipCloseOnClickOutside: [{
                type: Input
            }], tooltipCloseOnMouseLeave: [{
                type: Input
            }], tooltipHideTimeout: [{
                type: Input
            }], tooltipShowTimeout: [{
                type: Input
            }], tooltipTemplate: [{
                type: Input
            }], tooltipShowEvent: [{
                type: Input
            }], tooltipContext: [{
                type: Input
            }], tooltipImmediateExit: [{
                type: Input
            }], show: [{
                type: Output
            }], hide: [{
                type: Output
            }], onFocus: [{
                type: HostListener,
                args: ['focusin']
            }], onBlur: [{
                type: HostListener,
                args: ['blur']
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave', ['$event.target']]
            }], onMouseClick: [{
                type: HostListener,
                args: ['click']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCxNQUFNLEVBQ04sWUFBWSxFQUNaLFlBQVksRUFNYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sWUFBWSxDQUFDO0FBQzVDLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDMUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGFBQWEsQ0FBQzs7O0FBS3hDLE1BQU0sT0FBTyxnQkFBZ0I7SUFvQzNCLFlBQ1UsY0FBOEIsRUFDOUIsZ0JBQWtDLEVBQ2xDLFFBQW1CO1FBRm5CLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVc7UUF0Q3BCLG9CQUFlLEdBQVcsRUFBRSxDQUFDO1FBRTdCLHdCQUFtQixHQUFZLElBQUksQ0FBQztRQUNwQyxtQkFBYyxHQUFXLEVBQUUsQ0FBQztRQUM1QixvQkFBZSxHQUFZLEtBQUssQ0FBQztRQUNqQyxxQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDakMscUJBQWdCLEdBQW1CLGNBQWMsQ0FBQyxHQUFHLENBQUM7UUFDdEQscUJBQWdCLEdBQW1CLGNBQWMsQ0FBQyxNQUFNLENBQUM7UUFDekQsZ0JBQVcsR0FBZSxVQUFVLENBQUMsT0FBTyxDQUFDO1FBQzdDLCtCQUEwQixHQUFZLElBQUksQ0FBQztRQUMzQyw2QkFBd0IsR0FBWSxJQUFJLENBQUM7UUFDekMsdUJBQWtCLEdBQVcsR0FBRyxDQUFDO1FBQ2pDLHVCQUFrQixH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dGl2ZSxcbiAgSW5wdXQsXG4gIE91dHB1dCxcbiAgRXZlbnRFbWl0dGVyLFxuICBIb3N0TGlzdGVuZXIsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFJlbmRlcmVyMixcbiAgT25EZXN0cm95LFxuICBUZW1wbGF0ZVJlZixcbiAgQ29tcG9uZW50UmVmXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBQbGFjZW1lbnRUeXBlcyB9IGZyb20gJy4vcG9zaXRpb24nO1xuaW1wb3J0IHsgU3R5bGVUeXBlcyB9IGZyb20gJy4vc3R5bGUudHlwZSc7XG5pbXBvcnQgeyBTaG93VHlwZXMgfSBmcm9tICcuL3Nob3cudHlwZSc7XG5cbmltcG9ydCB7IFRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi90b29sdGlwLnNlcnZpY2UnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmd4LXRvb2x0aXBdJyB9KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSB0b29sdGlwQ3NzQ2xhc3M6IHN0cmluZyA9ICcnO1xuICBASW5wdXQoKSB0b29sdGlwVGl0bGU/OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRvb2x0aXBBcHBlbmRUb0JvZHk6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0b29sdGlwU3BhY2luZzogbnVtYmVyID0gMTA7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSB0b29sdGlwU2hvd0NhcmV0OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgdG9vbHRpcFBsYWNlbWVudDogUGxhY2VtZW50VHlwZXMgPSBQbGFjZW1lbnRUeXBlcy5Ub3A7XG4gIEBJbnB1dCgpIHRvb2x0aXBBbGlnbm1lbnQ6IFBsYWNlbWVudFR5cGVzID0gUGxhY2VtZW50VHlwZXMuQ2VudGVyO1xuICBASW5wdXQoKSB0b29sdGlwVHlwZTogU3R5bGVUeXBlcyA9IFN0eWxlVHlwZXMucG9wb3ZlcjtcbiAgQElucHV0KCkgdG9vbHRpcENsb3NlT25DbGlja091dHNpZGU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0b29sdGlwQ2xvc2VPbk1vdXNlTGVhdmU6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSB0b29sdGlwSGlkZVRpbWVvdXQ6IG51bWJlciA9IDMwMDtcbiAgQElucHV0KCkgdG9vbHRpcFNob3dUaW1lb3V0OiBudW1iZXIgPSAxMDA7XG4gIEBJbnB1dCgpIHRvb2x0aXBUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcbiAgQElucHV0KCkgdG9vbHRpcFNob3dFdmVudDogU2hvd1R5cGVzID0gU2hvd1R5cGVzLmFsbDtcbiAgQElucHV0KCkgdG9vbHRpcENvbnRleHQ6IGFueTtcbiAgQElucHV0KCkgdG9vbHRpcEltbWVkaWF0ZUV4aXQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBAT3V0cHV0KCkgc2hvdzogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgaGlkZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgZ2V0IGxpc3RlbnNGb3JGb2N1cygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMuYWxsIHx8IHRoaXMudG9vbHRpcFNob3dFdmVudCA9PT0gU2hvd1R5cGVzLmZvY3VzO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXQgbGlzdGVuc0ZvckhvdmVyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnRvb2x0aXBTaG93RXZlbnQgPT09IFNob3dUeXBlcy5hbGwgfHwgdGhpcy50b29sdGlwU2hvd0V2ZW50ID09PSBTaG93VHlwZXMubW91c2VvdmVyO1xuICB9XG5cbiAgcHJpdmF0ZSBjb21wb25lbnQ6IENvbXBvbmVudFJlZjxhbnk+O1xuICBwcml2YXRlIHRpbWVvdXQ6IFJldHVyblR5cGU8dHlwZW9mIHNldFRpbWVvdXQ+O1xuICBwcml2YXRlIG1vdXNlTGVhdmVDb250ZW50RXZlbnQ6IGFueTtcbiAgcHJpdmF0ZSBtb3VzZUVudGVyQ29udGVudEV2ZW50OiBhbnk7XG4gIHByaXZhdGUgZG9jdW1lbnRDbGlja0V2ZW50OiBhbnk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSB0b29sdGlwU2VydmljZTogVG9vbHRpcFNlcnZpY2UsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHt9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5oaWRlVG9vbHRpcCh0cnVlKTtcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2ZvY3VzaW4nKVxuICBvbkZvY3VzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmxpc3RlbnNGb3JGb2N1cykge1xuICAgICAgdGhpcy5zaG93VG9vbHRpcCgpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ2JsdXInKVxuICBvbkJsdXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckZvY3VzKSB7XG4gICAgICB0aGlzLmhpZGVUb29sdGlwKHRydWUpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckhvdmVyKSB7XG4gICAgICB0aGlzLnNob3dUb29sdGlwKCk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2VsZWF2ZScsIFsnJGV2ZW50LnRhcmdldCddKVxuICBvbk1vdXNlTGVhdmUodGFyZ2V0KTogdm9pZCB7XG4gICAgaWYgKHRoaXMubGlzdGVuc0ZvckhvdmVyICYmIHRoaXMudG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcblxuICAgICAgaWYgKHRoaXMuY29tcG9uZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnREb20gPSB0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5zID0gY29udGVudERvbS5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICBpZiAoY29udGFpbnMpIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0aGlzLnRvb2x0aXBJbW1lZGlhdGVFeGl0KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdjbGljaycpXG4gIG9uTW91c2VDbGljaygpIHtcbiAgICBpZiAodGhpcy5saXN0ZW5zRm9ySG92ZXIpIHtcbiAgICAgIHRoaXMuaGlkZVRvb2x0aXAodHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgc2hvd1Rvb2x0aXAoaW1tZWRpYXRlPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbXBvbmVudCB8fCB0aGlzLnRvb2x0aXBEaXNhYmxlZCkgcmV0dXJuO1xuXG4gICAgY29uc3QgdGltZSA9IGltbWVkaWF0ZVxuICAgICAgPyAwXG4gICAgICA6IHRoaXMudG9vbHRpcFNob3dUaW1lb3V0ICsgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1xcKGlbXjtdKzsoIFU7KT8gQ1BVLitNYWMgT1MgWC8pID8gNDAwIDogMCk7XG5cbiAgICBjbGVhclRpbWVvdXQodGhpcy50aW1lb3V0KTtcbiAgICB0aGlzLnRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMudG9vbHRpcFNlcnZpY2UuZGVzdHJveUFsbCgpO1xuXG4gICAgICBjb25zdCBvcHRpb25zID0gdGhpcy5jcmVhdGVCb3VuZE9wdGlvbnMoKTtcbiAgICAgIHRoaXMuY29tcG9uZW50ID0gdGhpcy50b29sdGlwU2VydmljZS5jcmVhdGUob3B0aW9ucyk7XG5cbiAgICAgIC8vIGFkZCBhIHRpbnkgdGltZW91dCB0byBhdm9pZCBldmVudCByZS10cmlnZ2Vyc1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbXBvbmVudCkge1xuICAgICAgICAgIHRoaXMuYWRkSGlkZUxpc3RlbmVycyh0aGlzLmNvbXBvbmVudC5pbnN0YW5jZS5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9LCAxMCk7XG5cbiAgICAgIHRoaXMuc2hvdy5lbWl0KHRydWUpO1xuICAgIH0sIHRpbWUpO1xuICB9XG5cbiAgYWRkSGlkZUxpc3RlbmVycyh0b29sdGlwOiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIC8vIG9uIG1vdXNlIGVudGVyLCBjYW5jZWwgdGhlIGhpZGUgdHJpZ2dlcmVkIGJ5IHRoZSBsZWF2ZVxuICAgIHRoaXMubW91c2VFbnRlckNvbnRlbnRFdmVudCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRvb2x0aXAsICdtb3VzZWVudGVyJywgKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgfSk7XG5cbiAgICAvLyBjb250ZW50IG1vdXNlIGxlYXZlIGxpc3RlbmVyXG4gICAgaWYgKHRoaXMudG9vbHRpcENsb3NlT25Nb3VzZUxlYXZlKSB7XG4gICAgICB0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0b29sdGlwLCAnbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgdGhpcy5oaWRlVG9vbHRpcCh0aGlzLnRvb2x0aXBJbW1lZGlhdGVFeGl0KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGNvbnRlbnQgY2xvc2Ugb24gY2xpY2sgb3V0c2lkZVxuICAgIGlmICh0aGlzLnRvb2x0aXBDbG9zZU9uQ2xpY2tPdXRzaWRlKSB7XG4gICAgICB0aGlzLmRvY3VtZW50Q2xpY2tFdmVudCA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCd3aW5kb3cnLCAnY2xpY2snLCBldmVudCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5zID0gdG9vbHRpcC5jb250YWlucyhldmVudC50YXJnZXQpO1xuICAgICAgICBpZiAoIWNvbnRhaW5zKSB0aGlzLmhpZGVUb29sdGlwKCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoaWRlVG9vbHRpcChpbW1lZGlhdGU6IGJvb2xlYW4gPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5jb21wb25lbnQpIHJldHVybjtcblxuICAgIGNvbnN0IGRlc3Ryb3lGbiA9ICgpID0+IHtcbiAgICAgIC8vIHJlbW92ZSBldmVudHNcbiAgICAgIGlmICh0aGlzLm1vdXNlTGVhdmVDb250ZW50RXZlbnQpIHRoaXMubW91c2VMZWF2ZUNvbnRlbnRFdmVudCgpO1xuICAgICAgaWYgKHRoaXMubW91c2VFbnRlckNvbnRlbnRFdmVudCkgdGhpcy5tb3VzZUVudGVyQ29udGVudEV2ZW50KCk7XG4gICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrRXZlbnQpIHRoaXMuZG9jdW1lbnRDbGlja0V2ZW50KCk7XG5cbiAgICAgIC8vIGVtaXQgZXZlbnRzXG4gICAgICB0aGlzLmhpZGUuZW1pdCh0cnVlKTtcblxuICAgICAgLy8gZGVzdHJveSBjb21wb25lbnRcbiAgICAgIHRoaXMudG9vbHRpcFNlcnZpY2UuZGVzdHJveSh0aGlzLmNvbXBvbmVudCk7XG4gICAgICB0aGlzLmNvbXBvbmVudCA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMudGltZW91dCk7XG4gICAgaWYgKCFpbW1lZGlhdGUpIHtcbiAgICAgIHRoaXMudGltZW91dCA9IHNldFRpbWVvdXQoZGVzdHJveUZuLCB0aGlzLnRvb2x0aXBIaWRlVGltZW91dCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc3Ryb3lGbigpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQm91bmRPcHRpb25zKCk6IGFueSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRpdGxlOiB0aGlzLnRvb2x0aXBUaXRsZSxcbiAgICAgIHRlbXBsYXRlOiB0aGlzLnRvb2x0aXBUZW1wbGF0ZSxcbiAgICAgIGhvc3Q6IHRoaXMudmlld0NvbnRhaW5lclJlZi5lbGVtZW50LFxuICAgICAgcGxhY2VtZW50OiB0aGlzLnRvb2x0aXBQbGFjZW1lbnQsXG4gICAgICBhbGlnbm1lbnQ6IHRoaXMudG9vbHRpcEFsaWdubWVudCxcbiAgICAgIHR5cGU6IHRoaXMudG9vbHRpcFR5cGUsXG4gICAgICBzaG93Q2FyZXQ6IHRoaXMudG9vbHRpcFNob3dDYXJldCxcbiAgICAgIGNzc0NsYXNzOiB0aGlzLnRvb2x0aXBDc3NDbGFzcyxcbiAgICAgIHNwYWNpbmc6IHRoaXMudG9vbHRpcFNwYWNpbmcsXG4gICAgICBjb250ZXh0OiB0aGlzLnRvb2x0aXBDb250ZXh0XG4gICAgfTtcbiAgfVxufVxuIl19