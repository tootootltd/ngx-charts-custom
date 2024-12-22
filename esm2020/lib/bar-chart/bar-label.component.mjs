import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { formatLabel } from '../common/label.helper';
import * as i0 from "@angular/core";
export class BarLabelComponent {
    constructor(element) {
        this.dimensionsChanged = new EventEmitter();
        this.horizontalPadding = 2;
        this.verticalPadding = 5;
        this.element = element.nativeElement;
    }
    ngOnChanges(changes) {
        this.update();
    }
    getSize() {
        const h = this.element.getBoundingClientRect().height;
        const w = this.element.getBoundingClientRect().width;
        return { height: h, width: w, negative: this.value < 0 };
    }
    ngAfterViewInit() {
        this.dimensionsChanged.emit(this.getSize());
    }
    update() {
        if (this.valueFormatting) {
            this.formatedValue = this.valueFormatting(this.value);
        }
        else {
            this.formatedValue = formatLabel(this.value);
        }
        if (this.orientation === 'horizontal') {
            this.x = this.barX + this.barWidth;
            // if the value is negative then it's on the left of the x0.
            // we need to put the data label in front of the bar
            if (this.value < 0) {
                this.x = this.x - this.horizontalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.x = this.x + this.horizontalPadding;
                this.textAnchor = 'start';
            }
            this.y = this.barY + this.barHeight / 2;
        }
        else {
            // orientation must be "vertical"
            this.x = this.barX + this.barWidth / 2;
            this.y = this.barY + this.barHeight;
            if (this.value < 0) {
                this.y = this.y + this.verticalPadding;
                this.textAnchor = 'end';
            }
            else {
                this.y = this.y - this.verticalPadding;
                this.textAnchor = 'start';
            }
            this.transform = `rotate(-45, ${this.x} , ${this.y})`;
        }
    }
}
BarLabelComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BarLabelComponent, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
BarLabelComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: BarLabelComponent, selector: "g[ngx-charts-bar-label]", inputs: { value: "value", valueFormatting: "valueFormatting", barX: "barX", barY: "barY", barWidth: "barWidth", barHeight: "barHeight", orientation: "orientation" }, outputs: { dimensionsChanged: "dimensionsChanged" }, usesOnChanges: true, ngImport: i0, template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y"
    >
      {{ formatedValue }}
    </svg:text>
  `, isInline: true, styles: [".textDataLabel{font-size:11px}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BarLabelComponent, decorators: [{
            type: Component,
            args: [{ selector: 'g[ngx-charts-bar-label]', template: `
    <svg:text
      class="textDataLabel"
      alignment-baseline="middle"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform"
      [attr.x]="x"
      [attr.y]="y"
    >
      {{ formatedValue }}
    </svg:text>
  `, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".textDataLabel{font-size:11px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { value: [{
                type: Input
            }], valueFormatting: [{
                type: Input
            }], barX: [{
                type: Input
            }], barY: [{
                type: Input
            }], barWidth: [{
                type: Input
            }], barHeight: [{
                type: Input
            }], orientation: [{
                type: Input
            }], dimensionsChanged: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyLWxhYmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2Jhci1jaGFydC9iYXItbGFiZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLHVCQUF1QixFQUV2QixNQUFNLEVBQ04sWUFBWSxFQUNiLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQzs7QUFvQnJELE1BQU0sT0FBTyxpQkFBaUI7SUFvQjVCLFlBQVksT0FBbUI7UUFYckIsc0JBQWlCLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFLcEUsc0JBQWlCLEdBQVcsQ0FBQyxDQUFDO1FBQzlCLG9CQUFlLEdBQVcsQ0FBQyxDQUFDO1FBTTFCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN2QyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoQixDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDdEQsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNyRCxPQUFPLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzNELENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsTUFBTTtRQUNKLElBQUksSUFBSSxDQUFDLGVBQWUsRUFBRTtZQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3ZEO2FBQU07WUFDTCxJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7UUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssWUFBWSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQ25DLDREQUE0RDtZQUM1RCxvREFBb0Q7WUFDcEQsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7YUFDekI7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFDekMsSUFBSSxDQUFDLFVBQVUsR0FBRyxPQUFPLENBQUM7YUFDM0I7WUFDRCxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDekM7YUFBTTtZQUNMLGlDQUFpQztZQUNqQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFFcEMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDO2FBQ3pCO2lCQUFNO2dCQUNMLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsVUFBVSxHQUFHLE9BQU8sQ0FBQzthQUMzQjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsZUFBZSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQztTQUN2RDtJQUNILENBQUM7OzhHQXZFVSxpQkFBaUI7a0dBQWpCLGlCQUFpQiwrU0FmbEI7Ozs7Ozs7Ozs7O0dBV1Q7MkZBSVUsaUJBQWlCO2tCQWpCN0IsU0FBUzsrQkFDRSx5QkFBeUIsWUFDekI7Ozs7Ozs7Ozs7O0dBV1QsbUJBRWdCLHVCQUF1QixDQUFDLE1BQU07aUdBR3RDLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBRUksaUJBQWlCO3NCQUExQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgRWxlbWVudFJlZixcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmb3JtYXRMYWJlbCB9IGZyb20gJy4uL2NvbW1vbi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgQmFyT3JpZW50YXRpb24gfSBmcm9tICcuLi9jb21tb24vdHlwZXMvYmFyLW9yaWVudGF0aW9uLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdnW25neC1jaGFydHMtYmFyLWxhYmVsXScsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHN2Zzp0ZXh0XG4gICAgICBjbGFzcz1cInRleHREYXRhTGFiZWxcIlxuICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwibWlkZGxlXCJcbiAgICAgIFthdHRyLnRleHQtYW5jaG9yXT1cInRleHRBbmNob3JcIlxuICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiXG4gICAgICBbYXR0ci54XT1cInhcIlxuICAgICAgW2F0dHIueV09XCJ5XCJcbiAgICA+XG4gICAgICB7eyBmb3JtYXRlZFZhbHVlIH19XG4gICAgPC9zdmc6dGV4dD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vYmFyLWxhYmVsLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIEJhckxhYmVsQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgdmFsdWU7XG4gIEBJbnB1dCgpIHZhbHVlRm9ybWF0dGluZzogYW55O1xuICBASW5wdXQoKSBiYXJYO1xuICBASW5wdXQoKSBiYXJZO1xuICBASW5wdXQoKSBiYXJXaWR0aDtcbiAgQElucHV0KCkgYmFySGVpZ2h0O1xuICBASW5wdXQoKSBvcmllbnRhdGlvbjogQmFyT3JpZW50YXRpb247XG5cbiAgQE91dHB1dCgpIGRpbWVuc2lvbnNDaGFuZ2VkOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBlbGVtZW50OiBhbnk7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICBob3Jpem9udGFsUGFkZGluZzogbnVtYmVyID0gMjtcbiAgdmVydGljYWxQYWRkaW5nOiBudW1iZXIgPSA1O1xuICBmb3JtYXRlZFZhbHVlOiBzdHJpbmc7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICB0ZXh0QW5jaG9yOiBzdHJpbmc7XG5cbiAgY29uc3RydWN0b3IoZWxlbWVudDogRWxlbWVudFJlZikge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICB0aGlzLnVwZGF0ZSgpO1xuICB9XG5cbiAgZ2V0U2l6ZSgpOiBhbnkge1xuICAgIGNvbnN0IGggPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0O1xuICAgIGNvbnN0IHcgPSB0aGlzLmVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgcmV0dXJuIHsgaGVpZ2h0OiBoLCB3aWR0aDogdywgbmVnYXRpdmU6IHRoaXMudmFsdWUgPCAwIH07XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5kaW1lbnNpb25zQ2hhbmdlZC5lbWl0KHRoaXMuZ2V0U2l6ZSgpKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcbiAgICAgIHRoaXMuZm9ybWF0ZWRWYWx1ZSA9IHRoaXMudmFsdWVGb3JtYXR0aW5nKHRoaXMudmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmZvcm1hdGVkVmFsdWUgPSBmb3JtYXRMYWJlbCh0aGlzLnZhbHVlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLnggPSB0aGlzLmJhclggKyB0aGlzLmJhcldpZHRoO1xuICAgICAgLy8gaWYgdGhlIHZhbHVlIGlzIG5lZ2F0aXZlIHRoZW4gaXQncyBvbiB0aGUgbGVmdCBvZiB0aGUgeDAuXG4gICAgICAvLyB3ZSBuZWVkIHRvIHB1dCB0aGUgZGF0YSBsYWJlbCBpbiBmcm9udCBvZiB0aGUgYmFyXG4gICAgICBpZiAodGhpcy52YWx1ZSA8IDApIHtcbiAgICAgICAgdGhpcy54ID0gdGhpcy54IC0gdGhpcy5ob3Jpem9udGFsUGFkZGluZztcbiAgICAgICAgdGhpcy50ZXh0QW5jaG9yID0gJ2VuZCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnggPSB0aGlzLnggKyB0aGlzLmhvcml6b250YWxQYWRkaW5nO1xuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xuICAgICAgfVxuICAgICAgdGhpcy55ID0gdGhpcy5iYXJZICsgdGhpcy5iYXJIZWlnaHQgLyAyO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBvcmllbnRhdGlvbiBtdXN0IGJlIFwidmVydGljYWxcIlxuICAgICAgdGhpcy54ID0gdGhpcy5iYXJYICsgdGhpcy5iYXJXaWR0aCAvIDI7XG4gICAgICB0aGlzLnkgPSB0aGlzLmJhclkgKyB0aGlzLmJhckhlaWdodDtcblxuICAgICAgaWYgKHRoaXMudmFsdWUgPCAwKSB7XG4gICAgICAgIHRoaXMueSA9IHRoaXMueSArIHRoaXMudmVydGljYWxQYWRkaW5nO1xuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnZW5kJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMueSA9IHRoaXMueSAtIHRoaXMudmVydGljYWxQYWRkaW5nO1xuICAgICAgICB0aGlzLnRleHRBbmNob3IgPSAnc3RhcnQnO1xuICAgICAgfVxuICAgICAgdGhpcy50cmFuc2Zvcm0gPSBgcm90YXRlKC00NSwgJHt0aGlzLnh9ICwgJHt0aGlzLnl9KWA7XG4gICAgfVxuICB9XG59XG4iXX0=