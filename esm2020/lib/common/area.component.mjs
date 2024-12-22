import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
import { BarOrientation } from './types/bar-orientation.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./svg-linear-gradient.component";
export class AreaComponent {
    constructor(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.animationsLoaded = false;
        this.hasGradient = false;
        this.barOrientation = BarOrientation;
        this.element = element.nativeElement;
    }
    ngOnChanges() {
        this.update();
        if (!this.animationsLoaded) {
            this.loadAnimation();
            this.animationsLoaded = true;
        }
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
    }
    loadAnimation() {
        this.areaPath = this.startingPath;
        setTimeout(this.updatePathEl.bind(this), 100);
    }
    updatePathEl() {
        const node = select(this.element).select('.area');
        if (this.animations) {
            node.transition().duration(750).attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
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
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }
        ];
    }
}
AreaComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AreaComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
AreaComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: AreaComponent, selector: "g[ngx-charts-area]", inputs: { data: "data", path: "path", startingPath: "startingPath", fill: "fill", opacity: "opacity", startOpacity: "startOpacity", endOpacity: "endOpacity", gradient: "gradient", stops: "stops", animations: "animations" }, outputs: { select: "select" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:defs *ngIf="gradient">
      <svg:g
        ngx-charts-svg-linear-gradient
        [orientation]="barOrientation.Vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
    </svg:defs>
    <svg:path class="area" [attr.d]="areaPath" [attr.fill]="gradient ? gradientFill : fill" [style.opacity]="opacity" />
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.SvgLinearGradientComponent, selector: "g[ngx-charts-svg-linear-gradient]", inputs: ["orientation", "name", "stops"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: AreaComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-area]',
                    template: `
    <svg:defs *ngIf="gradient">
      <svg:g
        ngx-charts-svg-linear-gradient
        [orientation]="barOrientation.Vertical"
        [name]="gradientId"
        [stops]="gradientStops"
      />
    </svg:defs>
    <svg:path class="area" [attr.d]="areaPath" [attr.fill]="gradient ? gradientFill : fill" [style.opacity]="opacity" />
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { data: [{
                type: Input
            }], path: [{
                type: Input
            }], startingPath: [{
                type: Input
            }], fill: [{
                type: Input
            }], opacity: [{
                type: Input
            }], startOpacity: [{
                type: Input
            }], endOpacity: [{
                type: Input
            }], gradient: [{
                type: Input
            }], stops: [{
                type: Input
            }], animations: [{
                type: Input
            }], select: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vYXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBeUIsdUJBQXVCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDdkgsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN0QyxPQUFPLEVBQUUsRUFBRSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRWpDLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7OztBQWtCOUQsTUFBTSxPQUFPLGFBQWE7SUF3QnhCLFlBQVksT0FBbUI7UUFuQnRCLFlBQU8sR0FBVyxDQUFDLENBQUM7UUFDcEIsaUJBQVksR0FBVyxHQUFHLENBQUM7UUFDM0IsZUFBVSxHQUFXLENBQUMsQ0FBQztRQUN2QixhQUFRLEdBQVksS0FBSyxDQUFDO1FBRTFCLGVBQVUsR0FBWSxJQUFJLENBQUM7UUFFMUIsV0FBTSxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7UUFNdEMscUJBQWdCLEdBQVksS0FBSyxDQUFDO1FBRWxDLGdCQUFXLEdBQVksS0FBSyxDQUFDO1FBRTdCLG1CQUFjLEdBQUcsY0FBYyxDQUFDO1FBRzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUVkLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUM7U0FDOUI7SUFDSCxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxZQUFZLEdBQUcsUUFBUSxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUM7UUFFL0MsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7U0FDekI7YUFBTTtZQUNMLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQzFCO1FBRUQsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ2xDLFVBQVUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRWxELElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3REO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztTQUNuQjtRQUVELE9BQU87WUFDTDtnQkFDRSxNQUFNLEVBQUUsQ0FBQztnQkFDVCxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTthQUMzQjtZQUNEO2dCQUNFLE1BQU0sRUFBRSxHQUFHO2dCQUNYLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVO2FBQ3pCO1NBQ0YsQ0FBQztJQUNKLENBQUM7OzBHQW5GVSxhQUFhOzhGQUFiLGFBQWEsOFVBYmQ7Ozs7Ozs7Ozs7R0FVVDsyRkFHVSxhQUFhO2tCQWZ6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO29CQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2lCQUNoRDtpR0FFVSxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgRWxlbWVudFJlZiwgT25DaGFuZ2VzLCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2VsZWN0IH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCB7IGlkIH0gZnJvbSAnLi4vdXRpbHMvaWQnO1xuaW1wb3J0IHsgQXJlYUNoYXJ0U2VyaWVzIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgQmFyT3JpZW50YXRpb24gfSBmcm9tICcuL3R5cGVzL2Jhci1vcmllbnRhdGlvbi5lbnVtJztcbmltcG9ydCB7IEdyYWRpZW50IH0gZnJvbSAnLi90eXBlcy9ncmFkaWVudC5pbnRlcmZhY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYXJlYV0nLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxzdmc6ZGVmcyAqbmdJZj1cImdyYWRpZW50XCI+XG4gICAgICA8c3ZnOmdcbiAgICAgICAgbmd4LWNoYXJ0cy1zdmctbGluZWFyLWdyYWRpZW50XG4gICAgICAgIFtvcmllbnRhdGlvbl09XCJiYXJPcmllbnRhdGlvbi5WZXJ0aWNhbFwiXG4gICAgICAgIFtuYW1lXT1cImdyYWRpZW50SWRcIlxuICAgICAgICBbc3RvcHNdPVwiZ3JhZGllbnRTdG9wc1wiXG4gICAgICAvPlxuICAgIDwvc3ZnOmRlZnM+XG4gICAgPHN2ZzpwYXRoIGNsYXNzPVwiYXJlYVwiIFthdHRyLmRdPVwiYXJlYVBhdGhcIiBbYXR0ci5maWxsXT1cImdyYWRpZW50ID8gZ3JhZGllbnRGaWxsIDogZmlsbFwiIFtzdHlsZS5vcGFjaXR5XT1cIm9wYWNpdHlcIiAvPlxuICBgLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBBcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgZGF0YTogQXJlYUNoYXJ0U2VyaWVzO1xuICBASW5wdXQoKSBwYXRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0YXJ0aW5nUGF0aDogc3RyaW5nO1xuICBASW5wdXQoKSBmaWxsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG9wYWNpdHk6IG51bWJlciA9IDE7XG4gIEBJbnB1dCgpIHN0YXJ0T3BhY2l0eTogbnVtYmVyID0gMC41O1xuICBASW5wdXQoKSBlbmRPcGFjaXR5OiBudW1iZXIgPSAxO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBzdG9wczogR3JhZGllbnRbXTtcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgZ3JhZGllbnRJZDogc3RyaW5nO1xuICBncmFkaWVudEZpbGw6IHN0cmluZztcbiAgYXJlYVBhdGg6IHN0cmluZztcbiAgYW5pbWF0aW9uc0xvYWRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBncmFkaWVudFN0b3BzOiBHcmFkaWVudFtdO1xuICBoYXNHcmFkaWVudDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIGJhck9yaWVudGF0aW9uID0gQmFyT3JpZW50YXRpb247XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICBpZiAoIXRoaXMuYW5pbWF0aW9uc0xvYWRlZCkge1xuICAgICAgdGhpcy5sb2FkQW5pbWF0aW9uKCk7XG4gICAgICB0aGlzLmFuaW1hdGlvbnNMb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmdyYWRpZW50SWQgPSAnZ3JhZCcgKyBpZCgpLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5ncmFkaWVudEZpbGwgPSBgdXJsKCMke3RoaXMuZ3JhZGllbnRJZH0pYDtcblxuICAgIGlmICh0aGlzLmdyYWRpZW50IHx8IHRoaXMuc3RvcHMpIHtcbiAgICAgIHRoaXMuZ3JhZGllbnRTdG9wcyA9IHRoaXMuZ2V0R3JhZGllbnQoKTtcbiAgICAgIHRoaXMuaGFzR3JhZGllbnQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmhhc0dyYWRpZW50ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVQYXRoRWwoKTtcbiAgfVxuXG4gIGxvYWRBbmltYXRpb24oKTogdm9pZCB7XG4gICAgdGhpcy5hcmVhUGF0aCA9IHRoaXMuc3RhcnRpbmdQYXRoO1xuICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGVQYXRoRWwuYmluZCh0aGlzKSwgMTAwKTtcbiAgfVxuXG4gIHVwZGF0ZVBhdGhFbCgpOiB2b2lkIHtcbiAgICBjb25zdCBub2RlID0gc2VsZWN0KHRoaXMuZWxlbWVudCkuc2VsZWN0KCcuYXJlYScpO1xuXG4gICAgaWYgKHRoaXMuYW5pbWF0aW9ucykge1xuICAgICAgbm9kZS50cmFuc2l0aW9uKCkuZHVyYXRpb24oNzUwKS5hdHRyKCdkJywgdGhpcy5wYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbm9kZS5hdHRyKCdkJywgdGhpcy5wYXRoKTtcbiAgICB9XG4gIH1cblxuICBnZXRHcmFkaWVudCgpOiBHcmFkaWVudFtdIHtcbiAgICBpZiAodGhpcy5zdG9wcykge1xuICAgICAgcmV0dXJuIHRoaXMuc3RvcHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIFtcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAwLFxuICAgICAgICBjb2xvcjogdGhpcy5maWxsLFxuICAgICAgICBvcGFjaXR5OiB0aGlzLnN0YXJ0T3BhY2l0eVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgb2Zmc2V0OiAxMDAsXG4gICAgICAgIGNvbG9yOiB0aGlzLmZpbGwsXG4gICAgICAgIG9wYWNpdHk6IHRoaXMuZW5kT3BhY2l0eVxuICAgICAgfVxuICAgIF07XG4gIH1cbn1cbiJdfQ==