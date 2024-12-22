import { Component, Input, ChangeDetectionStrategy, PLATFORM_ID, Inject } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { select } from 'd3-selection';
import { isPlatformServer } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
export class LineComponent {
    constructor(element, platformId) {
        this.element = element;
        this.platformId = platformId;
        this.fill = 'none';
        this.animations = true;
        // @Output() select = new EventEmitter();
        this.initialized = false;
        this.isSSR = false;
    }
    ngOnInit() {
        if (isPlatformServer(this.platformId)) {
            this.isSSR = true;
        }
    }
    ngOnChanges(changes) {
        if (!this.initialized) {
            this.initialized = true;
            this.initialPath = this.path;
        }
        else {
            this.updatePathEl();
        }
    }
    updatePathEl() {
        const node = select(this.element.nativeElement).select('.line');
        if (this.animations) {
            node.transition().duration(750).attr('d', this.path);
        }
        else {
            node.attr('d', this.path);
        }
    }
}
LineComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LineComponent, deps: [{ token: i0.ElementRef }, { token: PLATFORM_ID }], target: i0.ɵɵFactoryTarget.Component });
LineComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: LineComponent, selector: "g[ngx-charts-line]", inputs: { path: "path", stroke: "stroke", data: "data", fill: "fill", animations: "animations" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:g *ngIf="!isSSR">
      <svg:path
        [@animationState]="'active'"
        class="line"
        [attr.d]="initialPath"
        [attr.fill]="fill"
        [attr.stroke]="stroke"
        stroke-width="1.5px"
      />
    </svg:g>
    <svg:g *ngIf="isSSR">
      <svg:path class="line" [attr.d]="initialPath" [attr.fill]="fill" [attr.stroke]="stroke" stroke-width="1.5px" />
    </svg:g>
  `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], animations: [
        trigger('animationState', [
            transition(':enter', [
                style({
                    strokeDasharray: 2000,
                    strokeDashoffset: 2000
                }),
                animate(1000, style({
                    strokeDashoffset: 0
                }))
            ])
        ])
    ], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LineComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'g[ngx-charts-line]',
                    template: `
    <svg:g *ngIf="!isSSR">
      <svg:path
        [@animationState]="'active'"
        class="line"
        [attr.d]="initialPath"
        [attr.fill]="fill"
        [attr.stroke]="stroke"
        stroke-width="1.5px"
      />
    </svg:g>
    <svg:g *ngIf="isSSR">
      <svg:path class="line" [attr.d]="initialPath" [attr.fill]="fill" [attr.stroke]="stroke" stroke-width="1.5px" />
    </svg:g>
  `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    animations: [
                        trigger('animationState', [
                            transition(':enter', [
                                style({
                                    strokeDasharray: 2000,
                                    strokeDashoffset: 2000
                                }),
                                animate(1000, style({
                                    strokeDashoffset: 0
                                }))
                            ])
                        ])
                    ]
                }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }]; }, propDecorators: { path: [{
                type: Input
            }], stroke: [{
                type: Input
            }], data: [{
                type: Input
            }], fill: [{
                type: Input
            }], animations: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9saW5lLWNoYXJ0L2xpbmUuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUtMLHVCQUF1QixFQUV2QixXQUFXLEVBQ1gsTUFBTSxFQUVQLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXRDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFxQ25ELE1BQU0sT0FBTyxhQUFhO0lBY3hCLFlBQW9CLE9BQW1CLEVBQStCLFVBQWU7UUFBakUsWUFBTyxHQUFQLE9BQU8sQ0FBWTtRQUErQixlQUFVLEdBQVYsVUFBVSxDQUFLO1FBVjVFLFNBQUksR0FBVyxNQUFNLENBQUM7UUFDdEIsZUFBVSxHQUFZLElBQUksQ0FBQztRQUVwQyx5Q0FBeUM7UUFFekMsZ0JBQVcsR0FBWSxLQUFLLENBQUM7UUFHN0IsVUFBSyxHQUFHLEtBQUssQ0FBQztJQUUwRSxDQUFDO0lBRXpGLFFBQVE7UUFDTixJQUFJLGdCQUFnQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNyQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztTQUNuQjtJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQzlCO2FBQU07WUFDTCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVoRSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO0lBQ0gsQ0FBQzs7MEdBdkNVLGFBQWEsNENBY3lCLFdBQVc7OEZBZGpELGFBQWEsaUxBakNkOzs7Ozs7Ozs7Ozs7OztHQWNULGtKQUVXO1FBQ1YsT0FBTyxDQUFDLGdCQUFnQixFQUFFO1lBQ3hCLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQztvQkFDSixlQUFlLEVBQUUsSUFBSTtvQkFDckIsZ0JBQWdCLEVBQUUsSUFBSTtpQkFDdkIsQ0FBQztnQkFDRixPQUFPLENBQ0wsSUFBSSxFQUNKLEtBQUssQ0FBQztvQkFDSixnQkFBZ0IsRUFBRSxDQUFDO2lCQUNwQixDQUFDLENBQ0g7YUFDRixDQUFDO1NBQ0gsQ0FBQztLQUNIOzJGQUVVLGFBQWE7a0JBbkN6QixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7R0FjVDtvQkFDRCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsVUFBVSxFQUFFO3dCQUNWLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRTs0QkFDeEIsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDbkIsS0FBSyxDQUFDO29DQUNKLGVBQWUsRUFBRSxJQUFJO29DQUNyQixnQkFBZ0IsRUFBRSxJQUFJO2lDQUN2QixDQUFDO2dDQUNGLE9BQU8sQ0FDTCxJQUFJLEVBQ0osS0FBSyxDQUFDO29DQUNKLGdCQUFnQixFQUFFLENBQUM7aUNBQ3BCLENBQUMsQ0FDSDs2QkFDRixDQUFDO3lCQUNILENBQUM7cUJBQ0g7aUJBQ0Y7OzBCQWUyQyxNQUFNOzJCQUFDLFdBQVc7NENBYm5ELElBQUk7c0JBQVosS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csSUFBSTtzQkFBWixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uQ2hhbmdlcyxcbiAgRWxlbWVudFJlZixcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFBMQVRGT1JNX0lELFxuICBJbmplY3QsXG4gIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nO1xuaW1wb3J0IHsgU2VyaWVzIH0gZnJvbSAnLi4vbW9kZWxzL2NoYXJ0LWRhdGEubW9kZWwnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybVNlcnZlciB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2dbbmd4LWNoYXJ0cy1saW5lXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2ZzpnICpuZ0lmPVwiIWlzU1NSXCI+XG4gICAgICA8c3ZnOnBhdGhcbiAgICAgICAgW0BhbmltYXRpb25TdGF0ZV09XCInYWN0aXZlJ1wiXG4gICAgICAgIGNsYXNzPVwibGluZVwiXG4gICAgICAgIFthdHRyLmRdPVwiaW5pdGlhbFBhdGhcIlxuICAgICAgICBbYXR0ci5maWxsXT1cImZpbGxcIlxuICAgICAgICBbYXR0ci5zdHJva2VdPVwic3Ryb2tlXCJcbiAgICAgICAgc3Ryb2tlLXdpZHRoPVwiMS41cHhcIlxuICAgICAgLz5cbiAgICA8L3N2ZzpnPlxuICAgIDxzdmc6ZyAqbmdJZj1cImlzU1NSXCI+XG4gICAgICA8c3ZnOnBhdGggY2xhc3M9XCJsaW5lXCIgW2F0dHIuZF09XCJpbml0aWFsUGF0aFwiIFthdHRyLmZpbGxdPVwiZmlsbFwiIFthdHRyLnN0cm9rZV09XCJzdHJva2VcIiBzdHJva2Utd2lkdGg9XCIxLjVweFwiIC8+XG4gICAgPC9zdmc6Zz5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGFuaW1hdGlvbnM6IFtcbiAgICB0cmlnZ2VyKCdhbmltYXRpb25TdGF0ZScsIFtcbiAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgc3R5bGUoe1xuICAgICAgICAgIHN0cm9rZURhc2hhcnJheTogMjAwMCxcbiAgICAgICAgICBzdHJva2VEYXNob2Zmc2V0OiAyMDAwXG4gICAgICAgIH0pLFxuICAgICAgICBhbmltYXRlKFxuICAgICAgICAgIDEwMDAsXG4gICAgICAgICAgc3R5bGUoe1xuICAgICAgICAgICAgc3Ryb2tlRGFzaG9mZnNldDogMFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgIF0pXG4gICAgXSlcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBMaW5lQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKSBwYXRoOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHN0cm9rZTogc3RyaW5nO1xuICBASW5wdXQoKSBkYXRhOiBTZXJpZXM7XG4gIEBJbnB1dCgpIGZpbGw6IHN0cmluZyA9ICdub25lJztcbiAgQElucHV0KCkgYW5pbWF0aW9uczogYm9vbGVhbiA9IHRydWU7XG5cbiAgLy8gQE91dHB1dCgpIHNlbGVjdCA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBpbml0aWFsaXplZDogYm9vbGVhbiA9IGZhbHNlO1xuICBpbml0aWFsUGF0aDogc3RyaW5nO1xuXG4gIGlzU1NSID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50OiBFbGVtZW50UmVmLCBASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoaXNQbGF0Zm9ybVNlcnZlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICB0aGlzLmlzU1NSID0gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHRoaXMuaW5pdGlhbFBhdGggPSB0aGlzLnBhdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudXBkYXRlUGF0aEVsKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGF0aEVsKCk6IHZvaWQge1xuICAgIGNvbnN0IG5vZGUgPSBzZWxlY3QodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQpLnNlbGVjdCgnLmxpbmUnKTtcblxuICAgIGlmICh0aGlzLmFuaW1hdGlvbnMpIHtcbiAgICAgIG5vZGUudHJhbnNpdGlvbigpLmR1cmF0aW9uKDc1MCkuYXR0cignZCcsIHRoaXMucGF0aCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG5vZGUuYXR0cignZCcsIHRoaXMucGF0aCk7XG4gICAgfVxuICB9XG59XG4iXX0=