import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { select } from 'd3-selection';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/svg-linear-gradient.component";
export class BarComponent {
    constructor(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.animations = true;
        this.noBarWhenZero = true;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.hasGradient = false;
        this.hideBar = false;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        if (changes.roundEdges) {
            this.loadAnimation();
        }
        this.update();
    }
    update() {
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = `url(#${this.gradientId})`;
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.updatePathEl();
        this.checkToHideBar();
    }
    loadAnimation() {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    }
    updatePathEl() {
        const node = select(this.element).select('.bar');
        const path = this.getPath();
        if (this.animations) {
            node.transition().duration(500).attr('d', path);
        }
        else {
            node.attr('d', path);
        }
    }
    getGradient() {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    }
    getStartingPath() {
        if (!this.animations) {
            return this.getPath();
        }
        let radius = this.getRadius();
        let path;
        if (this.roundEdges) {
            if (this.orientation === BarOrientation.Vertical) {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === BarOrientation.Horizontal) {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        else {
            if (this.orientation === BarOrientation.Vertical) {
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === BarOrientation.Horizontal) {
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        return path;
    }
    getPath() {
        let radius = this.getRadius();
        let path;
        if (this.roundEdges) {
            if (this.orientation === BarOrientation.Vertical) {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
            else if (this.orientation === BarOrientation.Horizontal) {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
        }
        else {
            path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
        }
        return path;
    }
    getRadius() {
        let radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    }
    getStartOpacity() {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    }
    get edges() {
        let edges = [false, false, false, false];
        if (this.roundEdges) {
            if (this.orientation === BarOrientation.Vertical) {
                if (this.data.value > 0) {
                    edges = [true, true, false, false];
                }
                else {
                    edges = [false, false, true, true];
                }
            }
            else if (this.orientation === BarOrientation.Horizontal) {
                if (this.data.value > 0) {
                    edges = [false, true, false, true];
                }
                else {
                    edges = [true, false, true, false];
                }
            }
        }
        return edges;
    }
    onMouseEnter() {
        this.activate.emit(this.data);
    }
    onMouseLeave() {
        this.deactivate.emit(this.data);
    }
    checkToHideBar() {
        this.hideBar =
            this.noBarWhenZero &&
                ((this.orientation === BarOrientation.Vertical && this.height === 0) ||
                    (this.orientation === BarOrientation.Horizontal && this.width === 0));
    }
}
BarComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BarComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
BarComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: BarComponent, selector: "g[ngx-charts-bar]", inputs: { fill: "fill", data: "data", width: "width", height: "height", x: "x", y: "y", orientation: "orientation", roundEdges: "roundEdges", gradient: "gradient", offset: "offset", isActive: "isActive", stops: "stops", animations: "animations", ariaLabel: "ariaLabel", noBarWhenZero: "noBarWhenZero" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, host: { listeners: { "mouseenter": "onMouseEnter()", "mouseleave": "onMouseLeave()" } }, usesOnChanges: true, ngImport: i0, template: `
    <svg:defs *ngIf="hasGradient">
      <svg:g ngx-charts-svg-linear-gradient [orientation]="orientation" [name]="gradientId" [stops]="gradientStops" />
    </svg:defs>
    <svg:path
      class="bar"
      stroke="none"
      role="img"
      tabIndex="-1"
      [class.active]="isActive"
      [class.hidden]="hideBar"
      [attr.d]="path"
      [attr.aria-label]="ariaLabel"
      [attr.fill]="hasGradient ? gradientFill : fill"
      (click)="select.emit(data)"
    />
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: ["orientation", "name", "stops"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BarComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-bar]',
                    template: `
    <svg:defs *ngIf="hasGradient">
      <svg:g ngx-charts-svg-linear-gradient [orientation]="orientation" [name]="gradientId" [stops]="gradientStops" />
    </svg:defs>
    <svg:path
      class="bar"
      stroke="none"
      role="img"
      tabIndex="-1"
      [class.active]="isActive"
      [class.hidden]="hideBar"
      [attr.d]="path"
      [attr.aria-label]="ariaLabel"
      [attr.fill]="hasGradient ? gradientFill : fill"
      (click)="select.emit(data)"
    />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { fill: [{
                type: Input
            }], data: [{
                type: Input
            }], width: [{
                type: Input
            }], height: [{
                type: Input
            }], x: [{
                type: Input
            }], y: [{
                type: Input
            }], orientation: [{
                type: Input
            }], roundEdges: [{
                type: Input
            }], gradient: [{
                type: Input
            }], offset: [{
                type: Input
            }], isActive: [{
                type: Input
            }], stops: [{
                type: Input
            }], animations: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], noBarWhenZero: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], onMouseEnter: [{
                type: HostListener,
                args: ['mouseenter']
            }], onMouseLeave: [{
                type: HostListener,
                args: ['mouseleave']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2Jhci1jaGFydC9iYXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3RDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNyRCxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxzQ0FBc0MsQ0FBQzs7OztBQXdCdEUsTUFBTSxPQUFPLFlBQVk7SUE2QnZCLFlBQVksT0FBbUI7UUFyQnRCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFDM0IsYUFBUSxHQUFZLEtBQUssQ0FBQztRQUMxQixXQUFNLEdBQVcsQ0FBQyxDQUFDO1FBQ25CLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFFMUIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUU3QixXQUFNLEdBQTJCLElBQUksWUFBWSxFQUFFLENBQUM7UUFDcEQsYUFBUSxHQUEyQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ3RELGVBQVUsR0FBMkIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQU9sRSxnQkFBVyxHQUFZLEtBQUssQ0FBQztRQUM3QixZQUFPLEdBQVksS0FBSyxDQUFDO1FBR3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFD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b3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEhvc3RMaXN0ZW5lcixcbiAgSW5wdXQsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7IHJvdW5kZWRSZWN0IH0gZnJvbSAnLi4vY29tbW9uL3NoYXBlLmhlbHBlcic7XG5pbXBvcnQgeyBpZCB9IGZyb20gJy4uL3V0aWxzL2lkJztcbmltcG9ydCB7IERhdGFJdGVtIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgQmFyT3JpZW50YXRpb24gfSBmcm9tICcuLi9jb21tb24vdHlwZXMvYmFyLW9yaWVudGF0aW9uLmVudW0nO1xuaW1wb3J0IHsgR3JhZGllbnQgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvZ3JhZGllbnQuaW50ZXJmYWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnZ1tuZ3gtY2hhcnRzLWJhcl0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZGVmcyAqbmdJZj1cImhhc0dyYWRpZW50XCI+XG4gICAgICA8c3ZnOmcgbmd4LWNoYXJ0cy1zdmctbGluZWFyLWdyYWRpZW50IFtvcmllbnRhdGlvbl09XCJvcmllbnRhdGlvblwiIFtuYW1lXT1cImdyYWRpZW50SWRcIiBbc3RvcHNdPVwiZ3JhZGllbnRTdG9wc1wiIC8+XG4gICAgPC9zdmc6ZGVmcz5cbiAgICA8c3ZnOnBhdGhcbiAgICAgIGNsYXNzPVwiYmFyXCJcbiAgICAgIHN0cm9rZT1cIm5vbmVcIlxuICAgICAgcm9sZT1cImltZ1wiXG4gICAgICB0YWJJbmRleD1cIi0xXCJcbiAgICAgIFtjbGFzcy5hY3RpdmVdPVwiaXNBY3RpdmVcIlxuICAgICAgW2NsYXNzLmhpZGRlbl09XCJoaWRlQmFyXCJcbiAgICAgIFthdHRyLmRdPVwicGF0aFwiXG4gICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiXG4gICAgICBbYXR0ci5maWxsXT1cImhhc0dyYWRpZW50ID8gZ3JhZGllbnRGaWxsIDogZmlsbFwiXG4gICAgICAoY2xpY2spPVwic2VsZWN0LmVtaXQoZGF0YSlcIlxuICAgIC8+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJhckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGZpbGw6IHN0cmluZztcbiAgQElucHV0KCkgZGF0YTogRGF0YUl0ZW07XG4gIEBJbnB1dCgpIHdpZHRoOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhlaWdodDogbnVtYmVyO1xuICBASW5wdXQoKSB4OiBudW1iZXI7XG4gIEBJbnB1dCgpIHk6IG51bWJlcjtcbiAgQElucHV0KCkgb3JpZW50YXRpb246IEJhck9yaWVudGF0aW9uO1xuICBASW5wdXQoKSByb3VuZEVkZ2VzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgZ3JhZGllbnQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBASW5wdXQoKSBpc0FjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzdG9wczogR3JhZGllbnRbXTtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSBub0JhcldoZW5aZXJvOiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8RGF0YUl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBAT3V0cHV0KCkgYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxEYXRhSXRlbT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBPdXRwdXQoKSBkZWFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8RGF0YUl0ZW0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwYXRoOiBzdHJpbmc7XG4gIGdyYWRpZW50SWQ6IHN0cmluZztcbiAgZ3JhZGllbnRGaWxsOiBzdHJpbmc7XG4gIGdyYWRpZW50U3RvcHM6IEdyYWRpZW50W107XG4gIGhhc0dyYWRpZW50OiBib29sZWFuID0gZmFsc2U7XG4gIGhpZGVCYXI6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihlbGVtZW50OiBFbGVtZW50UmVmKSB7XG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzLnJvdW5kRWRnZXMpIHtcbiAgICAgIHRoaXMubG9hZEFuaW1hdGlvbigpO1xuICAgIH1cbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgdXBkYXRlKCk6IHZvaWQge1xuICAgIHRoaXMuZ3JhZGllbnRJZCA9ICdncmFkJyArIGlkKCkudG9TdHJpbmcoKTtcbiAgICB0aGlzLmdyYWRpZW50RmlsbCA9IGB1cmwoIyR7dGhpcy5ncmFkaWVudElkfSlgO1xuXG4gICAgaWYgKHRoaXMuZ3JhZGllbnQgfHwgdGhpcy5zdG9wcykge1xuICAgICAgdGhpcy5ncmFkaWVudFN0b3BzID0gdGhpcy5nZXRHcmFkaWVudCgpO1xuICAgICAgdGhpcy5oYXNHcmFkaWVudCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZVBhdGhFbCgpO1xuICAgIHRoaXMuY2hlY2tUb0hpZGVCYXIoKTtcbiAgfVxuXG4gIGxvYWRBbmltYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5wYXRoID0gdGhpcy5nZXRTdGFydGluZ1BhdGgoKTtcbiAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlLmJpbmQodGhpcyksIDEwMCk7XG4gIH1cblxuICB1cGRhdGVQYXRoRWwoKTogdm9pZCB7XG4gICAgY29uc3Qgbm9kZSA9IHNlbGVjdCh0aGlzLmVsZW1lbnQpLnNlbGVjdCgnLmJhcicpO1xuICAgIGNvbnN0IHBhdGggPSB0aGlzLmdldFBhdGgoKTtcbiAgICBpZiAodGhpcy5hbmltYXRpb25zKSB7XG4gICAgICBub2RlLnRyYW5zaXRpb24oKS5kdXJhdGlvbig1MDApLmF0dHIoJ2QnLCBwYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5hdHRyKCdkJywgcGF0aCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0R3JhZGllbnQoKTogR3JhZGllbnRbXSB7XG4gICAgaWYgKHRoaXMuc3RvcHMpIHtcbiAgICAgIHJldHVybiB0aGlzLnN0b3BzO1xuICAgIH1cblxuICAgIHJldHVybiBbXG4gICAgICB7XG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgY29sb3I6IHRoaXMuZmlsbCxcbiAgICAgICAgb3BhY2l0eTogdGhpcy5nZXRTdGFydE9wYWNpdHkoKVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXG4gICAgICAgIG9wYWNpdHk6IDFcbiAgICAgIH1cbiAgICBdO1xuICB9XG5cbiAgZ2V0U3RhcnRpbmdQYXRoKCk6IHN0cmluZyB7XG4gICAgaWYgKCF0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFBhdGgoKTtcbiAgICB9XG5cbiAgICBsZXQgcmFkaXVzID0gdGhpcy5nZXRSYWRpdXMoKTtcbiAgICBsZXQgcGF0aDtcblxuICAgIGlmICh0aGlzLnJvdW5kRWRnZXMpIHtcbiAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSBCYXJPcmllbnRhdGlvbi5WZXJ0aWNhbCkge1xuICAgICAgICByYWRpdXMgPSBNYXRoLm1pbih0aGlzLmhlaWdodCwgcmFkaXVzKTtcbiAgICAgICAgcGF0aCA9IHJvdW5kZWRSZWN0KHRoaXMueCwgdGhpcy55ICsgdGhpcy5oZWlnaHQsIHRoaXMud2lkdGgsIDEsIDAsIHRoaXMuZWRnZXMpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSBCYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsKSB7XG4gICAgICAgIHJhZGl1cyA9IE1hdGgubWluKHRoaXMud2lkdGgsIHJhZGl1cyk7XG4gICAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSwgMSwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuZWRnZXMpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gQmFyT3JpZW50YXRpb24uVmVydGljYWwpIHtcbiAgICAgICAgcGF0aCA9IHJvdW5kZWRSZWN0KHRoaXMueCwgdGhpcy55ICsgdGhpcy5oZWlnaHQsIHRoaXMud2lkdGgsIDEsIDAsIHRoaXMuZWRnZXMpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSBCYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsKSB7XG4gICAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSwgMSwgdGhpcy5oZWlnaHQsIDAsIHRoaXMuZWRnZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwYXRoO1xuICB9XG5cbiAgZ2V0UGF0aCgpOiBzdHJpbmcge1xuICAgIGxldCByYWRpdXMgPSB0aGlzLmdldFJhZGl1cygpO1xuICAgIGxldCBwYXRoO1xuXG4gICAgaWYgKHRoaXMucm91bmRFZGdlcykge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09IEJhck9yaWVudGF0aW9uLlZlcnRpY2FsKSB7XG4gICAgICAgIHJhZGl1cyA9IE1hdGgubWluKHRoaXMuaGVpZ2h0LCByYWRpdXMpO1xuICAgICAgICBwYXRoID0gcm91bmRlZFJlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0LCByYWRpdXMsIHRoaXMuZWRnZXMpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSBCYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsKSB7XG4gICAgICAgIHJhZGl1cyA9IE1hdGgubWluKHRoaXMud2lkdGgsIHJhZGl1cyk7XG4gICAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHJhZGl1cywgdGhpcy5lZGdlcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhdGggPSByb3VuZGVkUmVjdCh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIHJhZGl1cywgdGhpcy5lZGdlcyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBnZXRSYWRpdXMoKTogbnVtYmVyIHtcbiAgICBsZXQgcmFkaXVzID0gMDtcblxuICAgIGlmICh0aGlzLnJvdW5kRWRnZXMgJiYgdGhpcy5oZWlnaHQgPiA1ICYmIHRoaXMud2lkdGggPiA1KSB7XG4gICAgICByYWRpdXMgPSBNYXRoLmZsb29yKE1hdGgubWluKDUsIHRoaXMuaGVpZ2h0IC8gMiwgdGhpcy53aWR0aCAvIDIpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFkaXVzO1xuICB9XG5cbiAgZ2V0U3RhcnRPcGFjaXR5KCk6IG51bWJlciB7XG4gICAgaWYgKHRoaXMucm91bmRFZGdlcykge1xuICAgICAgcmV0dXJuIDAuMjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIDAuNTtcbiAgICB9XG4gIH1cblxuICBnZXQgZWRnZXMoKTogYm9vbGVhbltdIHtcbiAgICBsZXQgZWRnZXMgPSBbZmFsc2UsIGZhbHNlLCBmYWxzZSwgZmFsc2VdO1xuICAgIGlmICh0aGlzLnJvdW5kRWRnZXMpIHtcbiAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSBCYXJPcmllbnRhdGlvbi5WZXJ0aWNhbCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhLnZhbHVlID4gMCkge1xuICAgICAgICAgIGVkZ2VzID0gW3RydWUsIHRydWUsIGZhbHNlLCBmYWxzZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZWRnZXMgPSBbZmFsc2UsIGZhbHNlLCB0cnVlLCB0cnVlXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSBCYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsKSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEudmFsdWUgPiAwKSB7XG4gICAgICAgICAgZWRnZXMgPSBbZmFsc2UsIHRydWUsIGZhbHNlLCB0cnVlXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlZGdlcyA9IFt0cnVlLCBmYWxzZSwgdHJ1ZSwgZmFsc2VdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBlZGdlcztcbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlZW50ZXInKVxuICBvbk1vdXNlRW50ZXIoKTogdm9pZCB7XG4gICAgdGhpcy5hY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWxlYXZlJylcbiAgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIHRoaXMuZGVhY3RpdmF0ZS5lbWl0KHRoaXMuZGF0YSk7XG4gIH1cblxuICBwcml2YXRlIGNoZWNrVG9IaWRlQmFyKCk6IHZvaWQge1xuICAgIHRoaXMuaGlkZUJhciA9XG4gICAgICB0aGlzLm5vQmFyV2hlblplcm8gJiZcbiAgICAgICgodGhpcy5vcmllbnRhdGlvbiA9PT0gQmFyT3JpZW50YXRpb24uVmVydGljYWwgJiYgdGhpcy5oZWlnaHQgPT09IDApIHx8XG4gICAgICAgICh0aGlzLm9yaWVudGF0aW9uID09PSBCYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsICYmIHRoaXMud2lkdGggPT09IDApKTtcbiAgfVxufVxuIl19