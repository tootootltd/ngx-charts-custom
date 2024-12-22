import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { formatLabel } from '../label.helper';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "./legend-entry.component";
export class LegendComponent {
    constructor(cd) {
        this.cd = cd;
        this.horizontal = false;
        this.labelClick = new EventEmitter();
        this.labelActivate = new EventEmitter();
        this.labelDeactivate = new EventEmitter();
        this.legendEntries = [];
    }
    ngOnChanges(changes) {
        this.update();
    }
    update() {
        this.cd.markForCheck();
        this.legendEntries = this.getLegendEntries();
    }
    getLegendEntries() {
        const items = [];
        for (const label of this.data) {
            const formattedLabel = formatLabel(label);
            const idx = items.findIndex(i => {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label,
                    formattedLabel,
                    color: this.colors.getColor(label)
                });
            }
        }
        return items;
    }
    isActive(entry) {
        if (!this.activeEntries)
            return false;
        const item = this.activeEntries.find(d => {
            return entry.label === d.name;
        });
        return item !== undefined;
    }
    activate(item) {
        this.labelActivate.emit(item);
    }
    deactivate(item) {
        this.labelDeactivate.emit(item);
    }
    trackBy(index, item) {
        return item.label;
    }
}
LegendComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LegendComponent, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
LegendComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: LegendComponent, selector: "ngx-charts-legend", inputs: { data: "data", title: "title", colors: "colors", height: "height", width: "width", activeEntries: "activeEntries", horizontal: "horizontal" }, outputs: { labelClick: "labelClick", labelActivate: "labelActivate", labelDeactivate: "labelDeactivate" }, usesOnChanges: true, ngImport: i0, template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{ title }}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `, isInline: true, styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend ul,.chart-legend li{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.LegendEntryComponent, selector: "ngx-charts-legend-entry", inputs: ["color", "label", "formattedLabel", "isActive"], outputs: ["select", "activate", "deactivate", "toggle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LegendComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-charts-legend', template: `
    <div [style.width.px]="width">
      <header class="legend-title" *ngIf="title?.length > 0">
        <span class="legend-title-text">{{ title }}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels" [class.horizontal-legend]="horizontal" [style.max-height.px]="height - 45">
          <li *ngFor="let entry of legendEntries; trackBy: trackBy" class="legend-label">
            <ngx-charts-legend-entry
              [label]="entry.label"
              [formattedLabel]="entry.formattedLabel"
              [color]="entry.color"
              [isActive]="isActive(entry)"
              (select)="labelClick.emit($event)"
              (activate)="activate($event)"
              (deactivate)="deactivate($event)"
            >
            </ngx-charts-legend-entry>
          </li>
        </ul>
      </div>
    </div>
  `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".chart-legend{display:inline-block;padding:0;width:auto!important}.chart-legend .legend-title{white-space:nowrap;overflow:hidden;margin-left:10px;margin-bottom:5px;font-size:14px;font-weight:700}.chart-legend ul,.chart-legend li{padding:0;margin:0;list-style:none}.chart-legend .horizontal-legend li{display:inline-block}.chart-legend .legend-wrap{width:calc(100% - 10px)}.chart-legend .legend-labels{line-height:85%;list-style:none;text-align:left;float:left;width:100%;border-radius:3px;overflow-y:auto;overflow-x:hidden;white-space:nowrap;background:rgba(0,0,0,.05)}.chart-legend .legend-label{cursor:pointer;font-size:90%;margin:8px;color:#afb7c8}.chart-legend .legend-label:hover{color:#000;transition:.2s}.chart-legend .legend-label .active .legend-label-text{color:#000}.chart-legend .legend-label-color{display:inline-block;height:15px;width:15px;margin-right:5px;color:#5b646b;border-radius:3px}.chart-legend .legend-label-text{display:inline-block;vertical-align:top;line-height:15px;font-size:12px;width:calc(100% - 20px);text-overflow:ellipsis;white-space:nowrap;overflow:hidden}.chart-legend .legend-title-text{vertical-align:bottom;display:inline-block;line-height:16px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { data: [{
                type: Input
            }], title: [{
                type: Input
            }], colors: [{
                type: Input
            }], height: [{
                type: Input
            }], width: [{
                type: Input
            }], activeEntries: [{
                type: Input
            }], horizontal: [{
                type: Input
            }], labelClick: [{
                type: Output
            }], labelActivate: [{
                type: Output
            }], labelDeactivate: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVnZW5kLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9sZWdlbmQvbGVnZW5kLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFDTCx1QkFBdUIsRUFDdkIsTUFBTSxFQUNOLFlBQVksRUFJWixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7O0FBc0M5QyxNQUFNLE9BQU8sZUFBZTtJQWUxQixZQUFvQixFQUFxQjtRQUFyQixPQUFFLEdBQUYsRUFBRSxDQUFtQjtRQVJoQyxlQUFVLEdBQUcsS0FBSyxDQUFDO1FBRWxCLGVBQVUsR0FBeUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUN0RCxrQkFBYSxHQUFtQyxJQUFJLFlBQVksRUFBRSxDQUFDO1FBQ25FLG9CQUFlLEdBQW1DLElBQUksWUFBWSxFQUFFLENBQUM7UUFFL0Usa0JBQWEsR0FBa0IsRUFBRSxDQUFDO0lBRVUsQ0FBQztJQUU3QyxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxNQUFNO1FBQ0osSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQy9DLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLENBQUM7UUFDakIsS0FBSyxNQUFNLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQzdCLE1BQU0sY0FBYyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUUxQyxNQUFNLEdBQUcsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUM5QixPQUFPLENBQUMsQ0FBQyxLQUFLLEtBQUssY0FBYyxDQUFDO1lBQ3BDLENBQUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ2QsS0FBSyxDQUFDLElBQUksQ0FBQztvQkFDVCxLQUFLO29CQUNMLGNBQWM7b0JBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztpQkFDbkMsQ0FBQyxDQUFDO2FBQ0o7U0FDRjtRQUVELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVELFFBQVEsQ0FBQyxLQUFrQjtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN0QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN2QyxPQUFPLEtBQUssQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNoQyxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sSUFBSSxLQUFLLFNBQVMsQ0FBQztJQUM1QixDQUFDO0lBRUQsUUFBUSxDQUFDLElBQXNCO1FBQzdCLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxVQUFVLENBQUMsSUFBc0I7UUFDL0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUVELE9BQU8sQ0FBQyxLQUFhLEVBQUUsSUFBaUI7UUFDdEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7OzRHQWpFVSxlQUFlO2dHQUFmLGVBQWUsaVZBM0JoQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCVDsyRkFLVSxlQUFlO2tCQTdCM0IsU0FBUzsrQkFDRSxtQkFBbUIsWUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQlQsaUJBRWMsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTt3R0FHdEMsSUFBSTtzQkFBWixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBRUksVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxhQUFhO3NCQUF0QixNQUFNO2dCQUNHLGVBQWU7c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBDb21wb25lbnQsXG4gIElucHV0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgT3V0cHV0LFxuICBFdmVudEVtaXR0ZXIsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIE9uQ2hhbmdlcyxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZm9ybWF0TGFiZWwgfSBmcm9tICcuLi9sYWJlbC5oZWxwZXInO1xuaW1wb3J0IHsgQ29sb3JIZWxwZXIgfSBmcm9tICcuLi9jb2xvci5oZWxwZXInO1xuXG5leHBvcnQgaW50ZXJmYWNlIExlZ2VuZEVudHJ5IHtcbiAgY29sb3I6IHN0cmluZztcbiAgZm9ybWF0dGVkTGFiZWw6IHN0cmluZztcbiAgbGFiZWw6IHN0cmluZztcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1sZWdlbmQnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW3N0eWxlLndpZHRoLnB4XT1cIndpZHRoXCI+XG4gICAgICA8aGVhZGVyIGNsYXNzPVwibGVnZW5kLXRpdGxlXCIgKm5nSWY9XCJ0aXRsZT8ubGVuZ3RoID4gMFwiPlxuICAgICAgICA8c3BhbiBjbGFzcz1cImxlZ2VuZC10aXRsZS10ZXh0XCI+e3sgdGl0bGUgfX08L3NwYW4+XG4gICAgICA8L2hlYWRlcj5cbiAgICAgIDxkaXYgY2xhc3M9XCJsZWdlbmQtd3JhcFwiPlxuICAgICAgICA8dWwgY2xhc3M9XCJsZWdlbmQtbGFiZWxzXCIgW2NsYXNzLmhvcml6b250YWwtbGVnZW5kXT1cImhvcml6b250YWxcIiBbc3R5bGUubWF4LWhlaWdodC5weF09XCJoZWlnaHQgLSA0NVwiPlxuICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgZW50cnkgb2YgbGVnZW5kRW50cmllczsgdHJhY2tCeTogdHJhY2tCeVwiIGNsYXNzPVwibGVnZW5kLWxhYmVsXCI+XG4gICAgICAgICAgICA8bmd4LWNoYXJ0cy1sZWdlbmQtZW50cnlcbiAgICAgICAgICAgICAgW2xhYmVsXT1cImVudHJ5LmxhYmVsXCJcbiAgICAgICAgICAgICAgW2Zvcm1hdHRlZExhYmVsXT1cImVudHJ5LmZvcm1hdHRlZExhYmVsXCJcbiAgICAgICAgICAgICAgW2NvbG9yXT1cImVudHJ5LmNvbG9yXCJcbiAgICAgICAgICAgICAgW2lzQWN0aXZlXT1cImlzQWN0aXZlKGVudHJ5KVwiXG4gICAgICAgICAgICAgIChzZWxlY3QpPVwibGFiZWxDbGljay5lbWl0KCRldmVudClcIlxuICAgICAgICAgICAgICAoYWN0aXZhdGUpPVwiYWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgIChkZWFjdGl2YXRlKT1cImRlYWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICA8L25neC1jaGFydHMtbGVnZW5kLWVudHJ5PlxuICAgICAgICAgIDwvbGk+XG4gICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vbGVnZW5kLmNvbXBvbmVudC5zY3NzJ10sXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIExlZ2VuZENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGRhdGE6IHN0cmluZ1tdO1xuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuICBASW5wdXQoKSBjb2xvcnM6IENvbG9ySGVscGVyO1xuICBASW5wdXQoKSBoZWlnaHQ6IG51bWJlcjtcbiAgQElucHV0KCkgd2lkdGg6IG51bWJlcjtcbiAgQElucHV0KCkgYWN0aXZlRW50cmllcztcbiAgQElucHV0KCkgaG9yaXpvbnRhbCA9IGZhbHNlO1xuXG4gIEBPdXRwdXQoKSBsYWJlbENsaWNrOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxhYmVsQWN0aXZhdGU6IEV2ZW50RW1pdHRlcjx7IG5hbWU6IHN0cmluZyB9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGxhYmVsRGVhY3RpdmF0ZTogRXZlbnRFbWl0dGVyPHsgbmFtZTogc3RyaW5nIH0+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGxlZ2VuZEVudHJpZXM6IExlZ2VuZEVudHJ5W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNkOiBDaGFuZ2VEZXRlY3RvclJlZikge31cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIHRoaXMubGVnZW5kRW50cmllcyA9IHRoaXMuZ2V0TGVnZW5kRW50cmllcygpO1xuICB9XG5cbiAgZ2V0TGVnZW5kRW50cmllcygpOiBMZWdlbmRFbnRyeVtdIHtcbiAgICBjb25zdCBpdGVtcyA9IFtdO1xuICAgIGZvciAoY29uc3QgbGFiZWwgb2YgdGhpcy5kYXRhKSB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRMYWJlbCA9IGZvcm1hdExhYmVsKGxhYmVsKTtcblxuICAgICAgY29uc3QgaWR4ID0gaXRlbXMuZmluZEluZGV4KGkgPT4ge1xuICAgICAgICByZXR1cm4gaS5sYWJlbCA9PT0gZm9ybWF0dGVkTGFiZWw7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgaXRlbXMucHVzaCh7XG4gICAgICAgICAgbGFiZWwsXG4gICAgICAgICAgZm9ybWF0dGVkTGFiZWwsXG4gICAgICAgICAgY29sb3I6IHRoaXMuY29sb3JzLmdldENvbG9yKGxhYmVsKVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gaXRlbXM7XG4gIH1cblxuICBpc0FjdGl2ZShlbnRyeTogTGVnZW5kRW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuYWN0aXZlRW50cmllcykgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IGl0ZW0gPSB0aGlzLmFjdGl2ZUVudHJpZXMuZmluZChkID0+IHtcbiAgICAgIHJldHVybiBlbnRyeS5sYWJlbCA9PT0gZC5uYW1lO1xuICAgIH0pO1xuICAgIHJldHVybiBpdGVtICE9PSB1bmRlZmluZWQ7XG4gIH1cblxuICBhY3RpdmF0ZShpdGVtOiB7IG5hbWU6IHN0cmluZyB9KSB7XG4gICAgdGhpcy5sYWJlbEFjdGl2YXRlLmVtaXQoaXRlbSk7XG4gIH1cblxuICBkZWFjdGl2YXRlKGl0ZW06IHsgbmFtZTogc3RyaW5nIH0pIHtcbiAgICB0aGlzLmxhYmVsRGVhY3RpdmF0ZS5lbWl0KGl0ZW0pO1xuICB9XG5cbiAgdHJhY2tCeShpbmRleDogbnVtYmVyLCBpdGVtOiBMZWdlbmRFbnRyeSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGl0ZW0ubGFiZWw7XG4gIH1cbn1cbiJdfQ==