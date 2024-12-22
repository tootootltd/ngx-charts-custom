import { Component, Input, ViewChild, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { scaleLinear } from 'd3-scale';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { calculateTextWidth } from '../utils/calculate-width';
import { VERDANA_FONT_WIDTHS_16_PX } from '../common/constants/font-widths';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { ScaleType } from '../common/types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/charts/chart.component";
import * as i3 from "../bar-chart/bar.component";
var ElementType;
(function (ElementType) {
    ElementType["Value"] = "value";
    ElementType["Units"] = "units";
})(ElementType || (ElementType = {}));
export class LinearGaugeComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.margin = [10, 20, 10, 20];
        this.valueResizeScale = 1;
        this.unitsResizeScale = 1;
        this.valueTextTransform = '';
        this.valueTranslate = '';
        this.unitsTextTransform = '';
        this.unitsTranslate = '';
        this.barOrientation = BarOrientation;
    }
    ngAfterViewInit() {
        super.ngAfterViewInit();
        setTimeout(() => {
            this.scaleText(ElementType.Value);
            this.scaleText(ElementType.Units);
        });
    }
    update() {
        super.update();
        this.hasPreviousValue = this.previousValue !== undefined;
        this.max = Math.max(this.max, this.value);
        this.min = Math.min(this.min, this.value);
        if (this.hasPreviousValue) {
            this.max = Math.max(this.max, this.previousValue);
            this.min = Math.min(this.min, this.previousValue);
        }
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.valueDomain = this.getValueDomain();
        this.valueScale = this.getValueScale();
        this.displayValue = this.getDisplayValue();
        this.setColors();
        const xOffset = this.margin[3] + this.dims.width / 2;
        const yOffset = this.margin[0] + this.dims.height / 2;
        this.transform = `translate(${xOffset}, ${yOffset})`;
        this.transformLine = `translate(${this.margin[3] + this.valueScale(this.previousValue)}, ${yOffset})`;
        this.valueTranslate = `translate(0, -15)`;
        this.unitsTranslate = `translate(0, 15)`;
        if (isPlatformServer(this.platformId)) {
            this.scaleTextSSR('value');
            this.scaleTextSSR('units');
        }
        else {
            setTimeout(() => this.scaleText(ElementType.Value), 50);
            setTimeout(() => this.scaleText(ElementType.Units), 50);
        }
    }
    getValueDomain() {
        return [this.min, this.max];
    }
    getValueScale() {
        return scaleLinear().range([0, this.dims.width]).domain(this.valueDomain);
    }
    getDisplayValue() {
        if (this.valueFormatting) {
            return this.valueFormatting(this.value);
        }
        return this.value.toLocaleString();
    }
    scaleText(element, repeat = true) {
        let el;
        let resizeScale;
        if (element === ElementType.Value) {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        const { width, height } = el.nativeElement.getBoundingClientRect();
        if (width === 0 || height === 0)
            return;
        const oldScale = resizeScale;
        const availableWidth = this.dims.width;
        const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === ElementType.Value) {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
            }
            this.cd.markForCheck();
            if (repeat && isPlatformBrowser(this.platformId)) {
                setTimeout(() => {
                    this.scaleText(element, false);
                }, 50);
            }
        }
    }
    scaleTextSSR(element) {
        let resizeScale = 1;
        const value = element === 'value' ? this.displayValue : this.units;
        const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, value, 10);
        const height = 25;
        const availableWidth = this.dims.width;
        const availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        const resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        const resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (element === 'value') {
            this.valueResizeScale = resizeScale;
            this.valueTextTransform = `scale(${resizeScale}, ${resizeScale})`;
        }
        else {
            this.unitsResizeScale = resizeScale;
            this.unitsTextTransform = `scale(${resizeScale}, ${resizeScale})`;
        }
        this.cd.markForCheck();
    }
    onClick() {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    }
    setColors() {
        this.colors = new ColorHelper(this.scheme, ScaleType.Ordinal, [this.value], this.customColors);
    }
}
LinearGaugeComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LinearGaugeComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
LinearGaugeComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: LinearGaugeComponent, selector: "ngx-charts-linear-gauge", inputs: { min: "min", max: "max", value: "value", units: "units", previousValue: "previousValue", valueFormatting: "valueFormatting" }, viewQueries: [{ propertyName: "valueTextEl", first: true, predicate: ["valueTextEl"], descendants: true }, { propertyName: "unitsTextEl", first: true, predicate: ["unitsTextEl"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations" (click)="onClick()">
      <svg:g class="linear-gauge chart">
        <svg:g
          ngx-charts-bar
          class="background-bar"
          [width]="dims.width"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>
        <svg:g
          ngx-charts-bar
          [width]="valueScale(value)"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [fill]="colors.getColor(units)"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="5"
          x2="0"
          y2="15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="-5"
          x2="0"
          y2="-15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:g [attr.transform]="transform">
          <svg:g [attr.transform]="valueTranslate">
            <svg:text
              #valueTextEl
              class="value"
              [style.textAnchor]="'middle'"
              [attr.transform]="valueTextTransform"
              alignment-baseline="after-edge"
            >
              {{ displayValue }}
            </svg:text>
          </svg:g>

          <svg:g [attr.transform]="unitsTranslate">
            <svg:text
              #unitsTextEl
              class="units"
              [style.textAnchor]="'middle'"
              [attr.transform]="unitsTextTransform"
              alignment-baseline="before-edge"
            >
              {{ units }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `, isInline: true, styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:#0000000d}.linear-gauge .units{fill:#666}\n"], dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: i2.ChartComponent, selector: "ngx-charts-chart", inputs: ["view", "showLegend", "legendOptions", "legendType", "activeEntries", "animations"], outputs: ["legendLabelClick", "legendLabelActivate", "legendLabelDeactivate"] }, { kind: "component", type: i3.BarComponent, selector: "g[ngx-charts-bar]", inputs: ["fill", "data", "width", "height", "x", "y", "orientation", "roundEdges", "gradient", "offset", "isActive", "stops", "animations", "ariaLabel", "noBarWhenZero"], outputs: ["select", "activate", "deactivate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: LinearGaugeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-charts-linear-gauge', template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations" (click)="onClick()">
      <svg:g class="linear-gauge chart">
        <svg:g
          ngx-charts-bar
          class="background-bar"
          [width]="dims.width"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>
        <svg:g
          ngx-charts-bar
          [width]="valueScale(value)"
          [height]="3"
          [x]="margin[3]"
          [y]="dims.height / 2 + margin[0] - 2"
          [fill]="colors.getColor(units)"
          [data]="{}"
          [orientation]="barOrientation.Horizontal"
          [roundEdges]="true"
          [animations]="animations"
        ></svg:g>

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="5"
          x2="0"
          y2="15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:line
          *ngIf="hasPreviousValue"
          [attr.transform]="transformLine"
          x1="0"
          y1="-5"
          x2="0"
          y2="-15"
          [attr.stroke]="colors.getColor(units)"
        />

        <svg:g [attr.transform]="transform">
          <svg:g [attr.transform]="valueTranslate">
            <svg:text
              #valueTextEl
              class="value"
              [style.textAnchor]="'middle'"
              [attr.transform]="valueTextTransform"
              alignment-baseline="after-edge"
            >
              {{ displayValue }}
            </svg:text>
          </svg:g>

          <svg:g [attr.transform]="unitsTranslate">
            <svg:text
              #unitsTextEl
              class="units"
              [style.textAnchor]="'middle'"
              [attr.transform]="unitsTextTransform"
              alignment-baseline="before-edge"
            >
              {{ units }}
            </svg:text>
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `, encapsulation: ViewEncapsulation.None, changeDetection: ChangeDetectionStrategy.OnPush, styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n", ".linear-gauge{cursor:pointer}.linear-gauge .background-bar path{fill:#0000000d}.linear-gauge .units{fill:#666}\n"] }]
        }], propDecorators: { min: [{
                type: Input
            }], max: [{
                type: Input
            }], value: [{
                type: Input
            }], units: [{
                type: Input
            }], previousValue: [{
                type: Input
            }], valueFormatting: [{
                type: Input
            }], valueTextEl: [{
                type: ViewChild,
                args: ['valueTextEl']
            }], unitsTextEl: [{
                type: ViewChild,
                args: ['unitsTextEl']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGluZWFyLWdhdWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2dhdWdlL2xpbmVhci1nYXVnZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxLQUFLLEVBRUwsU0FBUyxFQUVULGlCQUFpQixFQUNqQix1QkFBdUIsRUFDeEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLFVBQVUsQ0FBQztBQUV2QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSxnQ0FBZ0MsQ0FBQztBQUNwRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckQsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDNUUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFFdEUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQzs7Ozs7QUFFNUQsSUFBSyxXQUdKO0FBSEQsV0FBSyxXQUFXO0lBQ2QsOEJBQWUsQ0FBQTtJQUNmLDhCQUFlLENBQUE7QUFDakIsQ0FBQyxFQUhJLFdBQVcsS0FBWCxXQUFXLFFBR2Y7QUFvRkQsTUFBTSxPQUFPLG9CQUFxQixTQUFRLGtCQUFrQjtJQWxGNUQ7O1FBbUZXLFFBQUcsR0FBVyxDQUFDLENBQUM7UUFDaEIsUUFBRyxHQUFXLEdBQUcsQ0FBQztRQUNsQixVQUFLLEdBQVcsQ0FB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Ozs7Ozs7R0EyRVQsaUJBRWMsaUJBQWlCLENBQUMsSUFBSSxtQkFDcEIsdUJBQXVCLENBQUMsTUFBTTs4QkFHdEMsR0FBRztzQkFBWCxLQUFLO2dCQUNHLEdBQUc7c0JBQVgsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csS0FBSztzQkFBYixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFFb0IsV0FBVztzQkFBcEMsU0FBUzt1QkFBQyxhQUFhO2dCQUNFLFdBQVc7c0JBQXBDLFNBQVM7dUJBQUMsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIEVsZW1lbnRSZWYsXG4gIFZpZXdDaGlsZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgc2NhbGVMaW5lYXIgfSBmcm9tICdkMy1zY2FsZSc7XG5cbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi92aWV3LWRpbWVuc2lvbnMuaGVscGVyJztcbmltcG9ydCB7IENvbG9ySGVscGVyIH0gZnJvbSAnLi4vY29tbW9uL2NvbG9yLmhlbHBlcic7XG5pbXBvcnQgeyBjYWxjdWxhdGVUZXh0V2lkdGggfSBmcm9tICcuLi91dGlscy9jYWxjdWxhdGUtd2lkdGgnO1xuaW1wb3J0IHsgVkVSREFOQV9GT05UX1dJRFRIU18xNl9QWCB9IGZyb20gJy4uL2NvbW1vbi9jb25zdGFudHMvZm9udC13aWR0aHMnO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIsIGlzUGxhdGZvcm1TZXJ2ZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvdmlldy1kaW1lbnNpb24uaW50ZXJmYWNlJztcbmltcG9ydCB7IEJhck9yaWVudGF0aW9uIH0gZnJvbSAnLi4vY29tbW9uL3R5cGVzL2Jhci1vcmllbnRhdGlvbi5lbnVtJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zY2FsZS10eXBlLmVudW0nO1xuXG5lbnVtIEVsZW1lbnRUeXBlIHtcbiAgVmFsdWUgPSAndmFsdWUnLFxuICBVbml0cyA9ICd1bml0cydcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0cy1saW5lYXItZ2F1Z2UnLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxuZ3gtY2hhcnRzLWNoYXJ0IFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiIFtzaG93TGVnZW5kXT1cImZhbHNlXCIgW2FuaW1hdGlvbnNdPVwiYW5pbWF0aW9uc1wiIChjbGljayk9XCJvbkNsaWNrKClcIj5cbiAgICAgIDxzdmc6ZyBjbGFzcz1cImxpbmVhci1nYXVnZSBjaGFydFwiPlxuICAgICAgICA8c3ZnOmdcbiAgICAgICAgICBuZ3gtY2hhcnRzLWJhclxuICAgICAgICAgIGNsYXNzPVwiYmFja2dyb3VuZC1iYXJcIlxuICAgICAgICAgIFt3aWR0aF09XCJkaW1zLndpZHRoXCJcbiAgICAgICAgICBbaGVpZ2h0XT1cIjNcIlxuICAgICAgICAgIFt4XT1cIm1hcmdpblszXVwiXG4gICAgICAgICAgW3ldPVwiZGltcy5oZWlnaHQgLyAyICsgbWFyZ2luWzBdIC0gMlwiXG4gICAgICAgICAgW2RhdGFdPVwie31cIlxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJiYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsXCJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJ0cnVlXCJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgICAgPjwvc3ZnOmc+XG4gICAgICAgIDxzdmc6Z1xuICAgICAgICAgIG5neC1jaGFydHMtYmFyXG4gICAgICAgICAgW3dpZHRoXT1cInZhbHVlU2NhbGUodmFsdWUpXCJcbiAgICAgICAgICBbaGVpZ2h0XT1cIjNcIlxuICAgICAgICAgIFt4XT1cIm1hcmdpblszXVwiXG4gICAgICAgICAgW3ldPVwiZGltcy5oZWlnaHQgLyAyICsgbWFyZ2luWzBdIC0gMlwiXG4gICAgICAgICAgW2ZpbGxdPVwiY29sb3JzLmdldENvbG9yKHVuaXRzKVwiXG4gICAgICAgICAgW2RhdGFdPVwie31cIlxuICAgICAgICAgIFtvcmllbnRhdGlvbl09XCJiYXJPcmllbnRhdGlvbi5Ib3Jpem9udGFsXCJcbiAgICAgICAgICBbcm91bmRFZGdlc109XCJ0cnVlXCJcbiAgICAgICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgICAgPjwvc3ZnOmc+XG5cbiAgICAgICAgPHN2ZzpsaW5lXG4gICAgICAgICAgKm5nSWY9XCJoYXNQcmV2aW91c1ZhbHVlXCJcbiAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtTGluZVwiXG4gICAgICAgICAgeDE9XCIwXCJcbiAgICAgICAgICB5MT1cIjVcIlxuICAgICAgICAgIHgyPVwiMFwiXG4gICAgICAgICAgeTI9XCIxNVwiXG4gICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxzdmc6bGluZVxuICAgICAgICAgICpuZ0lmPVwiaGFzUHJldmlvdXNWYWx1ZVwiXG4gICAgICAgICAgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybUxpbmVcIlxuICAgICAgICAgIHgxPVwiMFwiXG4gICAgICAgICAgeTE9XCItNVwiXG4gICAgICAgICAgeDI9XCIwXCJcbiAgICAgICAgICB5Mj1cIi0xNVwiXG4gICAgICAgICAgW2F0dHIuc3Ryb2tlXT1cImNvbG9ycy5nZXRDb2xvcih1bml0cylcIlxuICAgICAgICAvPlxuXG4gICAgICAgIDxzdmc6ZyBbYXR0ci50cmFuc2Zvcm1dPVwidHJhbnNmb3JtXCI+XG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ2YWx1ZVRyYW5zbGF0ZVwiPlxuICAgICAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgICAgICN2YWx1ZVRleHRFbFxuICAgICAgICAgICAgICBjbGFzcz1cInZhbHVlXCJcbiAgICAgICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwiJ21pZGRsZSdcIlxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidmFsdWVUZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYWZ0ZXItZWRnZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt7IGRpc3BsYXlWYWx1ZSB9fVxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgICA8L3N2ZzpnPlxuXG4gICAgICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ1bml0c1RyYW5zbGF0ZVwiPlxuICAgICAgICAgICAgPHN2Zzp0ZXh0XG4gICAgICAgICAgICAgICN1bml0c1RleHRFbFxuICAgICAgICAgICAgICBjbGFzcz1cInVuaXRzXCJcbiAgICAgICAgICAgICAgW3N0eWxlLnRleHRBbmNob3JdPVwiJ21pZGRsZSdcIlxuICAgICAgICAgICAgICBbYXR0ci50cmFuc2Zvcm1dPVwidW5pdHNUZXh0VHJhbnNmb3JtXCJcbiAgICAgICAgICAgICAgYWxpZ25tZW50LWJhc2VsaW5lPVwiYmVmb3JlLWVkZ2VcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7eyB1bml0cyB9fVxuICAgICAgICAgICAgPC9zdmc6dGV4dD5cbiAgICAgICAgICA8L3N2ZzpnPlxuICAgICAgICA8L3N2ZzpnPlxuICAgICAgPC9zdmc6Zz5cbiAgICA8L25neC1jaGFydHMtY2hhcnQ+XG4gIGAsXG4gIHN0eWxlVXJsczogWycuLi9jb21tb24vYmFzZS1jaGFydC5jb21wb25lbnQuc2NzcycsICcuL2xpbmVhci1nYXVnZS5jb21wb25lbnQuc2NzcyddLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaFxufSlcbmV4cG9ydCBjbGFzcyBMaW5lYXJHYXVnZUNvbXBvbmVudCBleHRlbmRzIEJhc2VDaGFydENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBASW5wdXQoKSBtaW46IG51bWJlciA9IDA7XG4gIEBJbnB1dCgpIG1heDogbnVtYmVyID0gMTAwO1xuICBASW5wdXQoKSB2YWx1ZTogbnVtYmVyID0gMDtcbiAgQElucHV0KCkgdW5pdHM6IHN0cmluZztcbiAgQElucHV0KCkgcHJldmlvdXNWYWx1ZTogbnVtYmVyO1xuICBASW5wdXQoKSB2YWx1ZUZvcm1hdHRpbmc6IGFueTtcblxuICBAVmlld0NoaWxkKCd2YWx1ZVRleHRFbCcpIHZhbHVlVGV4dEVsOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCd1bml0c1RleHRFbCcpIHVuaXRzVGV4dEVsOiBFbGVtZW50UmVmO1xuXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICB2YWx1ZURvbWFpbjogW251bWJlciwgbnVtYmVyXTtcbiAgdmFsdWVTY2FsZTogYW55O1xuXG4gIGNvbG9yczogQ29sb3JIZWxwZXI7XG4gIHRyYW5zZm9ybTogc3RyaW5nO1xuICBtYXJnaW46IG51bWJlcltdID0gWzEwLCAyMCwgMTAsIDIwXTtcbiAgdHJhbnNmb3JtTGluZTogc3RyaW5nO1xuXG4gIHZhbHVlUmVzaXplU2NhbGU6IG51bWJlciA9IDE7XG4gIHVuaXRzUmVzaXplU2NhbGU6IG51bWJlciA9IDE7XG4gIHZhbHVlVGV4dFRyYW5zZm9ybTogc3RyaW5nID0gJyc7XG4gIHZhbHVlVHJhbnNsYXRlOiBzdHJpbmcgPSAnJztcbiAgdW5pdHNUZXh0VHJhbnNmb3JtOiBzdHJpbmcgPSAnJztcbiAgdW5pdHNUcmFuc2xhdGU6IHN0cmluZyA9ICcnO1xuICBkaXNwbGF5VmFsdWU6IHN0cmluZztcbiAgaGFzUHJldmlvdXNWYWx1ZTogYm9vbGVhbjtcblxuICBiYXJPcmllbnRhdGlvbiA9IEJhck9yaWVudGF0aW9uO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ0FmdGVyVmlld0luaXQoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2NhbGVUZXh0KEVsZW1lbnRUeXBlLlZhbHVlKTtcbiAgICAgIHRoaXMuc2NhbGVUZXh0KEVsZW1lbnRUeXBlLlVuaXRzKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICBzdXBlci51cGRhdGUoKTtcblxuICAgIHRoaXMuaGFzUHJldmlvdXNWYWx1ZSA9IHRoaXMucHJldmlvdXNWYWx1ZSAhPT0gdW5kZWZpbmVkO1xuICAgIHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIHRoaXMudmFsdWUpO1xuICAgIHRoaXMubWluID0gTWF0aC5taW4odGhpcy5taW4sIHRoaXMudmFsdWUpO1xuICAgIGlmICh0aGlzLmhhc1ByZXZpb3VzVmFsdWUpIHtcbiAgICAgIHRoaXMubWF4ID0gTWF0aC5tYXgodGhpcy5tYXgsIHRoaXMucHJldmlvdXNWYWx1ZSk7XG4gICAgICB0aGlzLm1pbiA9IE1hdGgubWluKHRoaXMubWluLCB0aGlzLnByZXZpb3VzVmFsdWUpO1xuICAgIH1cblxuICAgIHRoaXMuZGltcyA9IGNhbGN1bGF0ZVZpZXdEaW1lbnNpb25zKHtcbiAgICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodCxcbiAgICAgIG1hcmdpbnM6IHRoaXMubWFyZ2luXG4gICAgfSk7XG5cbiAgICB0aGlzLnZhbHVlRG9tYWluID0gdGhpcy5nZXRWYWx1ZURvbWFpbigpO1xuICAgIHRoaXMudmFsdWVTY2FsZSA9IHRoaXMuZ2V0VmFsdWVTY2FsZSgpO1xuICAgIHRoaXMuZGlzcGxheVZhbHVlID0gdGhpcy5nZXREaXNwbGF5VmFsdWUoKTtcblxuICAgIHRoaXMuc2V0Q29sb3JzKCk7XG5cbiAgICBjb25zdCB4T2Zmc2V0ID0gdGhpcy5tYXJnaW5bM10gKyB0aGlzLmRpbXMud2lkdGggLyAyO1xuICAgIGNvbnN0IHlPZmZzZXQgPSB0aGlzLm1hcmdpblswXSArIHRoaXMuZGltcy5oZWlnaHQgLyAyO1xuXG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eE9mZnNldH0sICR7eU9mZnNldH0pYDtcbiAgICB0aGlzLnRyYW5zZm9ybUxpbmUgPSBgdHJhbnNsYXRlKCR7dGhpcy5tYXJnaW5bM10gKyB0aGlzLnZhbHVlU2NhbGUodGhpcy5wcmV2aW91c1ZhbHVlKX0sICR7eU9mZnNldH0pYDtcbiAgICB0aGlzLnZhbHVlVHJhbnNsYXRlID0gYHRyYW5zbGF0ZSgwLCAtMTUpYDtcbiAgICB0aGlzLnVuaXRzVHJhbnNsYXRlID0gYHRyYW5zbGF0ZSgwLCAxNSlgO1xuXG4gICAgaWYgKGlzUGxhdGZvcm1TZXJ2ZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgdGhpcy5zY2FsZVRleHRTU1IoJ3ZhbHVlJyk7XG4gICAgICB0aGlzLnNjYWxlVGV4dFNTUigndW5pdHMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnNjYWxlVGV4dChFbGVtZW50VHlwZS5WYWx1ZSksIDUwKTtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zY2FsZVRleHQoRWxlbWVudFR5cGUuVW5pdHMpLCA1MCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0VmFsdWVEb21haW4oKTogW251bWJlciwgbnVtYmVyXSB7XG4gICAgcmV0dXJuIFt0aGlzLm1pbiwgdGhpcy5tYXhdO1xuICB9XG5cbiAgZ2V0VmFsdWVTY2FsZSgpOiBhbnkge1xuICAgIHJldHVybiBzY2FsZUxpbmVhcigpLnJhbmdlKFswLCB0aGlzLmRpbXMud2lkdGhdKS5kb21haW4odGhpcy52YWx1ZURvbWFpbik7XG4gIH1cblxuICBnZXREaXNwbGF5VmFsdWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy52YWx1ZUZvcm1hdHRpbmcpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlRm9ybWF0dGluZyh0aGlzLnZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMudmFsdWUudG9Mb2NhbGVTdHJpbmcoKTtcbiAgfVxuXG4gIHNjYWxlVGV4dChlbGVtZW50OiBFbGVtZW50VHlwZSwgcmVwZWF0OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuICAgIGxldCBlbDtcbiAgICBsZXQgcmVzaXplU2NhbGU7XG4gICAgaWYgKGVsZW1lbnQgPT09IEVsZW1lbnRUeXBlLlZhbHVlKSB7XG4gICAgICBlbCA9IHRoaXMudmFsdWVUZXh0RWw7XG4gICAgICByZXNpemVTY2FsZSA9IHRoaXMudmFsdWVSZXNpemVTY2FsZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWwgPSB0aGlzLnVuaXRzVGV4dEVsO1xuICAgICAgcmVzaXplU2NhbGUgPSB0aGlzLnVuaXRzUmVzaXplU2NhbGU7XG4gICAgfVxuXG4gICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBlbC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIGlmICh3aWR0aCA9PT0gMCB8fCBoZWlnaHQgPT09IDApIHJldHVybjtcbiAgICBjb25zdCBvbGRTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgIGNvbnN0IGF2YWlsYWJsZVdpZHRoID0gdGhpcy5kaW1zLndpZHRoO1xuICAgIGNvbnN0IGF2YWlsYWJsZUhlaWdodCA9IE1hdGgubWF4KHRoaXMuZGltcy5oZWlnaHQgLyAyIC0gMTUsIDApO1xuICAgIGNvbnN0IHJlc2l6ZVNjYWxlV2lkdGggPSBNYXRoLmZsb29yKChhdmFpbGFibGVXaWR0aCAvICh3aWR0aCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xuICAgIGNvbnN0IHJlc2l6ZVNjYWxlSGVpZ2h0ID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlSGVpZ2h0IC8gKGhlaWdodCAvIHJlc2l6ZVNjYWxlKSkgKiAxMDApIC8gMTAwO1xuICAgIHJlc2l6ZVNjYWxlID0gTWF0aC5taW4ocmVzaXplU2NhbGVIZWlnaHQsIHJlc2l6ZVNjYWxlV2lkdGgpO1xuXG4gICAgaWYgKHJlc2l6ZVNjYWxlICE9PSBvbGRTY2FsZSkge1xuICAgICAgaWYgKGVsZW1lbnQgPT09IEVsZW1lbnRUeXBlLlZhbHVlKSB7XG4gICAgICAgIHRoaXMudmFsdWVSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgICAgICB0aGlzLnZhbHVlVGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgke3Jlc2l6ZVNjYWxlfSwgJHtyZXNpemVTY2FsZX0pYDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudW5pdHNSZXNpemVTY2FsZSA9IHJlc2l6ZVNjYWxlO1xuICAgICAgICB0aGlzLnVuaXRzVGV4dFRyYW5zZm9ybSA9IGBzY2FsZSgke3Jlc2l6ZVNjYWxlfSwgJHtyZXNpemVTY2FsZX0pYDtcbiAgICAgIH1cbiAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICBpZiAocmVwZWF0ICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zY2FsZVRleHQoZWxlbWVudCwgZmFsc2UpO1xuICAgICAgICB9LCA1MCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2NhbGVUZXh0U1NSKGVsZW1lbnQpIHtcbiAgICBsZXQgcmVzaXplU2NhbGUgPSAxO1xuXG4gICAgY29uc3QgdmFsdWUgPSBlbGVtZW50ID09PSAndmFsdWUnID8gdGhpcy5kaXNwbGF5VmFsdWUgOiB0aGlzLnVuaXRzO1xuICAgIGNvbnN0IHdpZHRoID0gY2FsY3VsYXRlVGV4dFdpZHRoKFZFUkRBTkFfRk9OVF9XSURUSFNfMTZfUFgsIHZhbHVlLCAxMCk7XG4gICAgY29uc3QgaGVpZ2h0ID0gMjU7XG5cbiAgICBjb25zdCBhdmFpbGFibGVXaWR0aCA9IHRoaXMuZGltcy53aWR0aDtcbiAgICBjb25zdCBhdmFpbGFibGVIZWlnaHQgPSBNYXRoLm1heCh0aGlzLmRpbXMuaGVpZ2h0IC8gMiAtIDE1LCAwKTtcbiAgICBjb25zdCByZXNpemVTY2FsZVdpZHRoID0gTWF0aC5mbG9vcigoYXZhaWxhYmxlV2lkdGggLyAod2lkdGggLyByZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcbiAgICBjb25zdCByZXNpemVTY2FsZUhlaWdodCA9IE1hdGguZmxvb3IoKGF2YWlsYWJsZUhlaWdodCAvIChoZWlnaHQgLyByZXNpemVTY2FsZSkpICogMTAwKSAvIDEwMDtcbiAgICByZXNpemVTY2FsZSA9IE1hdGgubWluKHJlc2l6ZVNjYWxlSGVpZ2h0LCByZXNpemVTY2FsZVdpZHRoKTtcblxuICAgIGlmIChlbGVtZW50ID09PSAndmFsdWUnKSB7XG4gICAgICB0aGlzLnZhbHVlUmVzaXplU2NhbGUgPSByZXNpemVTY2FsZTtcbiAgICAgIHRoaXMudmFsdWVUZXh0VHJhbnNmb3JtID0gYHNjYWxlKCR7cmVzaXplU2NhbGV9LCAke3Jlc2l6ZVNjYWxlfSlgO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnVuaXRzUmVzaXplU2NhbGUgPSByZXNpemVTY2FsZTtcbiAgICAgIHRoaXMudW5pdHNUZXh0VHJhbnNmb3JtID0gYHNjYWxlKCR7cmVzaXplU2NhbGV9LCAke3Jlc2l6ZVNjYWxlfSlgO1xuICAgIH1cblxuICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBvbkNsaWNrKCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoe1xuICAgICAgbmFtZTogJ1ZhbHVlJyxcbiAgICAgIHZhbHVlOiB0aGlzLnZhbHVlXG4gICAgfSk7XG4gIH1cblxuICBzZXRDb2xvcnMoKTogdm9pZCB7XG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIFNjYWxlVHlwZS5PcmRpbmFsLCBbdGhpcy52YWx1ZV0sIHRoaXMuY3VzdG9tQ29sb3JzKTtcbiAgfVxufVxuIl19