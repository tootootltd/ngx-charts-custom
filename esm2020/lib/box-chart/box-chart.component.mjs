import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ColorHelper } from '../common/color.helper';
import { scaleLinear, scaleBand } from 'd3-scale';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { LegendPosition } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "../common/axes/x-axis.component";
import * as i3 from "../common/axes/y-axis.component";
import * as i4 from "../common/charts/chart.component";
import * as i5 from "./box-series.component";
export class BoxChartComponent extends BaseChartComponent {
    constructor() {
        super(...arguments);
        /** Show or hide the legend. */
        this.legend = false;
        this.legendPosition = LegendPosition.Right;
        this.legendTitle = 'Legend';
        this.showGridLines = true;
        this.xAxis = true;
        this.yAxis = true;
        this.showXAxisLabel = true;
        this.showYAxisLabel = true;
        this.roundDomains = false;
        this.roundEdges = true;
        this.strokeColor = '#FFFFFF';
        this.strokeWidth = 2;
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        /** Chart Margins (For each side, counterclock wise). */
        this.margin = [10, 20, 10, 20];
        /** Chart X axis dimension. */
        this.xAxisHeight = 0;
        /** Chart Y axis dimension. */
        this.yAxisWidth = 0;
    }
    trackBy(index, item) {
        return item.name;
    }
    update() {
        super.update();
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin,
            showXAxis: this.xAxis,
            showYAxis: this.yAxis,
            xAxisHeight: this.xAxisHeight,
            yAxisWidth: this.yAxisWidth,
            showXLabel: this.showXAxisLabel,
            showYLabel: this.showYAxisLabel,
            showLegend: this.legend,
            legendPosition: this.legendPosition
        });
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.setScales();
        this.setColors();
        this.legendOptions = this.getLegendOptions();
        this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    }
    setColors() {
        let domain = [];
        if (this.schemeType === ScaleType.Ordinal) {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    }
    setScales() {
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
        this.yScale = this.getYScale(this.yDomain, this.dims.height);
    }
    getXScale(domain, width) {
        const scale = scaleBand()
            .domain(domain.map(d => d.toString()))
            .rangeRound([0, width])
            .padding(0.5);
        return scale;
    }
    getYScale(domain, height) {
        const scale = scaleLinear().domain(domain).range([height, 0]);
        return this.roundDomains ? scale.nice() : scale;
    }
    getUniqueBoxChartXDomainValues(results) {
        const valueSet = new Set();
        for (const result of results) {
            valueSet.add(result.name);
        }
        return Array.from(valueSet);
    }
    getXDomain() {
        let domain = [];
        const values = this.getUniqueBoxChartXDomainValues(this.results);
        let min;
        let max;
        if (typeof values[0] === 'string') {
            domain = values.map(val => val.toString());
        }
        else if (typeof values[0] === 'number') {
            const mappedValues = values.map(v => Number(v));
            min = Math.min(...mappedValues);
            max = Math.max(...mappedValues);
            domain = [min, max];
        }
        else {
            const mappedValues = values.map(v => Number(new Date(v)));
            min = Math.min(...mappedValues);
            max = Math.max(...mappedValues);
            domain = [new Date(min), new Date(max)];
        }
        return domain;
    }
    getYDomain() {
        const domain = [];
        for (const results of this.results) {
            for (const d of results.series) {
                if (domain.indexOf(d.value) < 0) {
                    domain.push(d.value);
                }
            }
        }
        const values = [...domain];
        const mappedValues = values.map(v => Number(v));
        const min = Math.min(...mappedValues);
        const max = Math.max(...mappedValues);
        return [min, max];
    }
    getSeriesDomain() {
        return this.results.map(d => `${d.name}`);
    }
    updateYAxisWidth({ width }) {
        this.yAxisWidth = width;
        this.update();
    }
    updateXAxisHeight({ height }) {
        this.xAxisHeight = height;
        this.update();
    }
    onClick(data) {
        this.select.emit(data);
    }
    onActivate(data) {
        this.activate.emit(data);
    }
    onDeactivate(data) {
        this.deactivate.emit(data);
    }
    getLegendOptions() {
        const legendOpts = {
            scaleType: this.schemeType,
            colors: this.colors,
            domain: [],
            position: this.legendPosition,
            title: this.legendTitle
        };
        if (this.schemeType === ScaleType.Ordinal) {
            legendOpts.domain = this.xDomain;
            legendOpts.colors = this.colors;
        }
        else {
            legendOpts.domain = this.yDomain;
            legendOpts.colors = this.colors.scale;
        }
        return legendOpts;
    }
}
BoxChartComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BoxChartComponent, deps: null, target: i0.ɵɵFactoryTarget.Component });
BoxChartComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.2.1", type: BoxChartComponent, selector: "ngx-charts-box-chart", inputs: { legend: "legend", legendPosition: "legendPosition", legendTitle: "legendTitle", legendOptionsConfig: "legendOptionsConfig", showGridLines: "showGridLines", xAxis: "xAxis", yAxis: "yAxis", showXAxisLabel: "showXAxisLabel", showYAxisLabel: "showYAxisLabel", roundDomains: "roundDomains", xAxisLabel: "xAxisLabel", yAxisLabel: "yAxisLabel", roundEdges: "roundEdges", strokeColor: "strokeColor", strokeWidth: "strokeWidth", tooltipDisabled: "tooltipDisabled", gradient: "gradient" }, outputs: { select: "select", activate: "activate", deactivate: "deactivate" }, queries: [{ propertyName: "tooltipTemplate", first: true, predicate: ["tooltipTemplate"], descendants: true }], usesInheritance: true, ngImport: i0, template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
    >
      <svg:g [attr.transform]="transform" class="box-chart chart">
        <svg:g
          ngx-charts-x-axis
          [showGridLines]="showGridLines"
          [dims]="dims"
          [xScale]="xScale"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          (dimensionsChanged)="updateXAxisHeight($event)"
        />
        <svg:g
          ngx-charts-y-axis
          [showGridLines]="showGridLines"
          [dims]="dims"
          [yScale]="yScale"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          (dimensionsChanged)="updateYAxisWidth($event)"
        />
      </svg:g>
      <svg:g [attr.transform]="transform">
        <svg:g *ngFor="let result of results; trackBy: trackBy">
          <svg:g
            ngx-charts-box-series
            [xScale]="xScale"
            [yScale]="yScale"
            [colors]="colors"
            [roundEdges]="roundEdges"
            [strokeColor]="strokeColor"
            [strokeWidth]="strokeWidth"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipTemplate]="tooltipTemplate"
            [series]="result"
            [dims]="dims"
            [animations]="animations"
            [gradient]="gradient"
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)"
            (select)="onClick($event)"
          />
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `, isInline: true, styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"], dependencies: [{ kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "component", type: i2.XAxisComponent, selector: "g[ngx-charts-x-axis]", inputs: ["xScale", "dims", "trimTicks", "rotateTicks", "maxTickLength", "tickFormatting", "showGridLines", "showLabel", "labelText", "ticks", "xAxisTickCount", "xOrient", "xAxisOffset"], outputs: ["dimensionsChanged"] }, { kind: "component", type: i3.YAxisComponent, selector: "g[ngx-charts-y-axis]", inputs: ["yScale", "dims", "trimTicks", "maxTickLength", "tickFormatting", "ticks", "showGridLines", "showLabel", "labelText", "yAxisTickCount", "yOrient", "referenceLines", "showRefLines", "showRefLabels", "yAxisOffset"], outputs: ["dimensionsChanged"] }, { kind: "component", type: i4.ChartComponent, selector: "ngx-charts-chart", inputs: ["view", "showLegend", "legendOptions", "legendType", "activeEntries", "animations"], outputs: ["legendLabelClick", "legendLabelActivate", "legendLabelDeactivate"] }, { kind: "component", type: i5.BoxSeriesComponent, selector: "g[ngx-charts-box-series]", inputs: ["dims", "series", "xScale", "yScale", "colors", "animations", "strokeColor", "strokeWidth", "tooltipDisabled", "tooltipTemplate", "tooltipPlacement", "tooltipType", "roundEdges", "gradient"], outputs: ["select", "activate", "deactivate"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: BoxChartComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ngx-charts-box-chart', template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
    >
      <svg:g [attr.transform]="transform" class="box-chart chart">
        <svg:g
          ngx-charts-x-axis
          [showGridLines]="showGridLines"
          [dims]="dims"
          [xScale]="xScale"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          (dimensionsChanged)="updateXAxisHeight($event)"
        />
        <svg:g
          ngx-charts-y-axis
          [showGridLines]="showGridLines"
          [dims]="dims"
          [yScale]="yScale"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          (dimensionsChanged)="updateYAxisWidth($event)"
        />
      </svg:g>
      <svg:g [attr.transform]="transform">
        <svg:g *ngFor="let result of results; trackBy: trackBy">
          <svg:g
            ngx-charts-box-series
            [xScale]="xScale"
            [yScale]="yScale"
            [colors]="colors"
            [roundEdges]="roundEdges"
            [strokeColor]="strokeColor"
            [strokeWidth]="strokeWidth"
            [tooltipDisabled]="tooltipDisabled"
            [tooltipTemplate]="tooltipTemplate"
            [series]="result"
            [dims]="dims"
            [animations]="animations"
            [gradient]="gradient"
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)"
            (select)="onClick($event)"
          />
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, styles: [".ngx-charts-outer{-webkit-animation:chartFadeIn linear .6s;animation:chartFadeIn linear .6s}@-webkit-keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}@keyframes chartFadeIn{0%{opacity:0}20%{opacity:0}to{opacity:1}}.ngx-charts{float:left;overflow:visible}.ngx-charts .circle,.ngx-charts .cell,.ngx-charts .bar,.ngx-charts .arc{cursor:pointer}.ngx-charts .bar.active,.ngx-charts .bar:hover,.ngx-charts .cell.active,.ngx-charts .cell:hover,.ngx-charts .arc.active,.ngx-charts .arc:hover,.ngx-charts .card.active,.ngx-charts .card:hover{opacity:.8;transition:opacity .1s ease-in-out}.ngx-charts .bar:focus,.ngx-charts .cell:focus,.ngx-charts .arc:focus,.ngx-charts .card:focus{outline:none}.ngx-charts .bar.hidden,.ngx-charts .cell.hidden,.ngx-charts .arc.hidden,.ngx-charts .card.hidden{display:none}.ngx-charts g:focus{outline:none}.ngx-charts .line-series.inactive,.ngx-charts .line-series-range.inactive,.ngx-charts .polar-series-path.inactive,.ngx-charts .polar-series-area.inactive,.ngx-charts .area-series.inactive{transition:opacity .1s ease-in-out;opacity:.2}.ngx-charts .line-highlight{display:none}.ngx-charts .line-highlight.active{display:block}.ngx-charts .area{opacity:.6}.ngx-charts .circle:hover{cursor:pointer}.ngx-charts .label{font-size:12px;font-weight:400}.ngx-charts .tooltip-anchor{fill:#000}.ngx-charts .gridline-path{stroke:#ddd;stroke-width:1;fill:none}.ngx-charts .refline-path{stroke:#a8b2c7;stroke-width:1;stroke-dasharray:5;stroke-dashoffset:5}.ngx-charts .refline-label{font-size:9px}.ngx-charts .reference-area{fill-opacity:.05;fill:#000}.ngx-charts .gridline-path-dotted{stroke:#ddd;stroke-width:1;fill:none;stroke-dasharray:1,20;stroke-dashoffset:3}.ngx-charts .grid-panel rect{fill:none}.ngx-charts .grid-panel.odd rect{fill:#0000000d}\n"] }]
        }], propDecorators: { legend: [{
                type: Input
            }], legendPosition: [{
                type: Input
            }], legendTitle: [{
                type: Input
            }], legendOptionsConfig: [{
                type: Input
            }], showGridLines: [{
                type: Input
            }], xAxis: [{
                type: Input
            }], yAxis: [{
                type: Input
            }], showXAxisLabel: [{
                type: Input
            }], showYAxisLabel: [{
                type: Input
            }], roundDomains: [{
                type: Input
            }], xAxisLabel: [{
                type: Input
            }], yAxisLabel: [{
                type: Input
            }], roundEdges: [{
                type: Input
            }], strokeColor: [{
                type: Input
            }], strokeWidth: [{
                type: Input
            }], tooltipDisabled: [{
                type: Input
            }], gradient: [{
                type: Input
            }], select: [{
                type: Output
            }], activate: [{
                type: Output
            }], deactivate: [{
                type: Output
            }], tooltipTemplate: [{
                type: ContentChild,
                args: ['tooltipTemplate', { static: false }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm94LWNoYXJ0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2JveC1jaGFydC9ib3gtY2hhcnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFlBQVksRUFDWixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFFTixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDcEUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBRXJELE9BQU8sRUFBRSxXQUFXLEVBQWUsU0FBUyxFQUFhLE1BQU0sVUFBVSxDQUFDO0FBQzFFLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTNFLE9BQU8sRUFBRSxjQUFjLEVBQWlCLE1BQU0sOEJBQThCLENBQUM7QUFDN0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGlDQUFpQyxDQUFDOzs7Ozs7O0FBOEQ1RCxNQUFNLE9BQU8saUJBQWtCLFNBQVEsa0JBQWtCO0lBNUR6RDs7UUE2REUsK0JBQStCO1FBQ3RCLFdBQU0sR0FBWSxLQUFLLENBQUM7UUFDeEIsbUJBQWMsR0FBbUIsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUN0RCxnQkFBVyxHQUFXLFFBQVEsQ0FBQztRQUcvQixrQkFBYSxHQUFZLElBQUksQ0FBQztRQUM5QixVQUFLLEdBQVksSUFBSSxDQUFDO1FBQ3RCLFVBQUssR0FBWSxJQUFJLENBQUM7UUFDdEIsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IsbUJBQWMsR0FBWSxJQUFJLENBQUM7UUFDL0IsaUJBQVksR0FBWSxLQUFLLENBQUM7UUFHOUIsZUFBVSxHQUFZLElBQUks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QjtzQkFBM0IsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLEtBQUs7c0JBQWIsS0FBSztnQkFDRyxLQUFLO3NCQUFiLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFSSxNQUFNO3NCQUFmLE1BQU07Z0JBQ0csUUFBUTtzQkFBakIsTUFBTTtnQkFDRyxVQUFVO3NCQUFuQixNQUFNO2dCQUU2QyxlQUFlO3NCQUFsRSxZQUFZO3VCQUFDLGlCQUFpQixFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZCxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IEJhc2VDaGFydENvbXBvbmVudCB9IGZyb20gJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb2xvckhlbHBlciB9IGZyb20gJy4uL2NvbW1vbi9jb2xvci5oZWxwZXInO1xuaW1wb3J0IHsgQm94Q2hhcnRNdWx0aVNlcmllcywgQm94Q2hhcnRTZXJpZXMsIElCb3hNb2RlbCwgU3RyaW5nT3JOdW1iZXJPckRhdGUgfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG5pbXBvcnQgeyBzY2FsZUxpbmVhciwgU2NhbGVMaW5lYXIsIHNjYWxlQmFuZCwgU2NhbGVCYW5kIH0gZnJvbSAnZDMtc2NhbGUnO1xuaW1wb3J0IHsgY2FsY3VsYXRlVmlld0RpbWVuc2lvbnMgfSBmcm9tICcuLi9jb21tb24vdmlldy1kaW1lbnNpb25zLmhlbHBlcic7XG5pbXBvcnQgeyBWaWV3RGltZW5zaW9ucyB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy92aWV3LWRpbWVuc2lvbi5pbnRlcmZhY2UnO1xuaW1wb3J0IHsgTGVnZW5kUG9zaXRpb24sIExlZ2VuZE9wdGlvbnMgfSBmcm9tICcuLi9jb21tb24vdHlwZXMvbGVnZW5kLm1vZGVsJztcbmltcG9ydCB7IFNjYWxlVHlwZSB9IGZyb20gJy4uL2NvbW1vbi90eXBlcy9zY2FsZS10eXBlLmVudW0nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtY2hhcnRzLWJveC1jaGFydCcsXG4gIHRlbXBsYXRlOiBgXG4gICAgPG5neC1jaGFydHMtY2hhcnRcbiAgICAgIFt2aWV3XT1cIlt3aWR0aCwgaGVpZ2h0XVwiXG4gICAgICBbc2hvd0xlZ2VuZF09XCJsZWdlbmRcIlxuICAgICAgW2xlZ2VuZE9wdGlvbnNdPVwibGVnZW5kT3B0aW9uc1wiXG4gICAgICBbYW5pbWF0aW9uc109XCJhbmltYXRpb25zXCJcbiAgICAgIChsZWdlbmRMYWJlbENsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiXG4gICAgICAobGVnZW5kTGFiZWxBY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxuICAgICAgKGxlZ2VuZExhYmVsRGVhY3RpdmF0ZSk9XCJvbkRlYWN0aXZhdGUoJGV2ZW50KVwiXG4gICAgPlxuICAgICAgPHN2ZzpnIFthdHRyLnRyYW5zZm9ybV09XCJ0cmFuc2Zvcm1cIiBjbGFzcz1cImJveC1jaGFydCBjaGFydFwiPlxuICAgICAgICA8c3ZnOmdcbiAgICAgICAgICBuZ3gtY2hhcnRzLXgtYXhpc1xuICAgICAgICAgIFtzaG93R3JpZExpbmVzXT1cInNob3dHcmlkTGluZXNcIlxuICAgICAgICAgIFtkaW1zXT1cImRpbXNcIlxuICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcbiAgICAgICAgICBbc2hvd0xhYmVsXT1cInNob3dYQXhpc0xhYmVsXCJcbiAgICAgICAgICBbbGFiZWxUZXh0XT1cInhBeGlzTGFiZWxcIlxuICAgICAgICAgIChkaW1lbnNpb25zQ2hhbmdlZCk9XCJ1cGRhdGVYQXhpc0hlaWdodCgkZXZlbnQpXCJcbiAgICAgICAgLz5cbiAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgbmd4LWNoYXJ0cy15LWF4aXNcbiAgICAgICAgICBbc2hvd0dyaWRMaW5lc109XCJzaG93R3JpZExpbmVzXCJcbiAgICAgICAgICBbZGltc109XCJkaW1zXCJcbiAgICAgICAgICBbeVNjYWxlXT1cInlTY2FsZVwiXG4gICAgICAgICAgW3Nob3dMYWJlbF09XCJzaG93WUF4aXNMYWJlbFwiXG4gICAgICAgICAgW2xhYmVsVGV4dF09XCJ5QXhpc0xhYmVsXCJcbiAgICAgICAgICAoZGltZW5zaW9uc0NoYW5nZWQpPVwidXBkYXRlWUF4aXNXaWR0aCgkZXZlbnQpXCJcbiAgICAgICAgLz5cbiAgICAgIDwvc3ZnOmc+XG4gICAgICA8c3ZnOmcgW2F0dHIudHJhbnNmb3JtXT1cInRyYW5zZm9ybVwiPlxuICAgICAgICA8c3ZnOmcgKm5nRm9yPVwibGV0IHJlc3VsdCBvZiByZXN1bHRzOyB0cmFja0J5OiB0cmFja0J5XCI+XG4gICAgICAgICAgPHN2ZzpnXG4gICAgICAgICAgICBuZ3gtY2hhcnRzLWJveC1zZXJpZXNcbiAgICAgICAgICAgIFt4U2NhbGVdPVwieFNjYWxlXCJcbiAgICAgICAgICAgIFt5U2NhbGVdPVwieVNjYWxlXCJcbiAgICAgICAgICAgIFtjb2xvcnNdPVwiY29sb3JzXCJcbiAgICAgICAgICAgIFtyb3VuZEVkZ2VzXT1cInJvdW5kRWRnZXNcIlxuICAgICAgICAgICAgW3N0cm9rZUNvbG9yXT1cInN0cm9rZUNvbG9yXCJcbiAgICAgICAgICAgIFtzdHJva2VXaWR0aF09XCJzdHJva2VXaWR0aFwiXG4gICAgICAgICAgICBbdG9vbHRpcERpc2FibGVkXT1cInRvb2x0aXBEaXNhYmxlZFwiXG4gICAgICAgICAgICBbdG9vbHRpcFRlbXBsYXRlXT1cInRvb2x0aXBUZW1wbGF0ZVwiXG4gICAgICAgICAgICBbc2VyaWVzXT1cInJlc3VsdFwiXG4gICAgICAgICAgICBbZGltc109XCJkaW1zXCJcbiAgICAgICAgICAgIFthbmltYXRpb25zXT1cImFuaW1hdGlvbnNcIlxuICAgICAgICAgICAgW2dyYWRpZW50XT1cImdyYWRpZW50XCJcbiAgICAgICAgICAgIChhY3RpdmF0ZSk9XCJvbkFjdGl2YXRlKCRldmVudClcIlxuICAgICAgICAgICAgKGRlYWN0aXZhdGUpPVwib25EZWFjdGl2YXRlKCRldmVudClcIlxuICAgICAgICAgICAgKHNlbGVjdCk9XCJvbkNsaWNrKCRldmVudClcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3ZnOmc+XG4gICAgICA8L3N2ZzpnPlxuICAgIDwvbmd4LWNoYXJ0cy1jaGFydD5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4uL2NvbW1vbi9iYXNlLWNoYXJ0LmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lXG59KVxuZXhwb3J0IGNsYXNzIEJveENoYXJ0Q29tcG9uZW50IGV4dGVuZHMgQmFzZUNoYXJ0Q29tcG9uZW50IHtcbiAgLyoqIFNob3cgb3IgaGlkZSB0aGUgbGVnZW5kLiAqL1xuICBASW5wdXQoKSBsZWdlbmQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgbGVnZW5kUG9zaXRpb246IExlZ2VuZFBvc2l0aW9uID0gTGVnZW5kUG9zaXRpb24uUmlnaHQ7XG4gIEBJbnB1dCgpIGxlZ2VuZFRpdGxlOiBzdHJpbmcgPSAnTGVnZW5kJztcbiAgLyoqIEkgdGhpbmsgaXQgaXMgYmV0dGVyIHRvIGhhbmRsZSBsZWdlbmQgb3B0aW9ucyBhcyBzaW5nbGUgSW5wdXQgb2JqZWN0IG9mIHR5cGUgSUxlZ2VuZE9wdGlvbnMgKi9cbiAgQElucHV0KCkgbGVnZW5kT3B0aW9uc0NvbmZpZzogTGVnZW5kT3B0aW9ucztcbiAgQElucHV0KCkgc2hvd0dyaWRMaW5lczogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHhBeGlzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgeUF4aXM6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBzaG93WEF4aXNMYWJlbDogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIHNob3dZQXhpc0xhYmVsOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgcm91bmREb21haW5zOiBib29sZWFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHhBeGlzTGFiZWw6IHN0cmluZztcbiAgQElucHV0KCkgeUF4aXNMYWJlbDogc3RyaW5nO1xuICBASW5wdXQoKSByb3VuZEVkZ2VzOiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgc3Ryb2tlQ29sb3I6IHN0cmluZyA9ICcjRkZGRkZGJztcbiAgQElucHV0KCkgc3Ryb2tlV2lkdGg6IG51bWJlciA9IDI7XG4gIEBJbnB1dCgpIHRvb2x0aXBEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBASW5wdXQoKSBncmFkaWVudDogYm9vbGVhbjtcblxuICBAT3V0cHV0KCkgc2VsZWN0OiBFdmVudEVtaXR0ZXI8SUJveE1vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8SUJveE1vZGVsPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQE91dHB1dCgpIGRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxJQm94TW9kZWw+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIEBDb250ZW50Q2hpbGQoJ3Rvb2x0aXBUZW1wbGF0ZScsIHsgc3RhdGljOiBmYWxzZSB9KSB0b29sdGlwVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XG5cbiAgLyoqIElucHV0IERhdGEsIHRoaXMgY2FtZSBmcm9tIEJhc2UgQ2hhcnQgQ29tcG9uZW50LiAqL1xuICByZXN1bHRzOiBCb3hDaGFydE11bHRpU2VyaWVzO1xuICAvKiogQ2hhcnQgRGltZW5zaW9ucywgdGhpcyBjYW1lIGZyb20gQmFzZSBDaGFydCBDb21wb25lbnQuICovXG4gIGRpbXM6IFZpZXdEaW1lbnNpb25zO1xuICAvKiogQ29sb3IgZGF0YS4gKi9cbiAgY29sb3JzOiBDb2xvckhlbHBlcjtcbiAgLyoqIFRyYW5zZm9ybSBzdHJpbmcgY3NzIGF0dHJpYnV0ZSBmb3IgdGhlIGNoYXJ0IGNvbnRhaW5lciAqL1xuICB0cmFuc2Zvcm06IHN0cmluZztcblxuICAvKiogQ2hhcnQgTWFyZ2lucyAoRm9yIGVhY2ggc2lkZSwgY291bnRlcmNsb2NrIHdpc2UpLiAqL1xuICBtYXJnaW46IFtudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdID0gWzEwLCAyMCwgMTAsIDIwXTtcblxuICAvKiogTGVnZW5kIE9wdGlvbnMgb2JqZWN0IHRvIGhhbmRsZSBwb3NpdGlvbmluZywgdGl0bGUsIGNvbG9ycyBhbmQgZG9tYWluLiAqL1xuICBsZWdlbmRPcHRpb25zOiBMZWdlbmRPcHRpb25zO1xuXG4gIHhTY2FsZTogU2NhbGVCYW5kPHN0cmluZz47XG4gIHlTY2FsZTogU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+O1xuICB4RG9tYWluOiBTdHJpbmdPck51bWJlck9yRGF0ZVtdO1xuICB5RG9tYWluOiBudW1iZXJbXTtcbiAgc2VyaWVzRG9tYWluOiBzdHJpbmdbXTtcbiAgLyoqIENoYXJ0IFggYXhpcyBkaW1lbnNpb24uICovXG4gIHhBeGlzSGVpZ2h0OiBudW1iZXIgPSAwO1xuICAvKiogQ2hhcnQgWSBheGlzIGRpbWVuc2lvbi4gKi9cbiAgeUF4aXNXaWR0aDogbnVtYmVyID0gMDtcblxuICB0cmFja0J5KGluZGV4OiBudW1iZXIsIGl0ZW06IEJveENoYXJ0U2VyaWVzKTogU3RyaW5nT3JOdW1iZXJPckRhdGUge1xuICAgIHJldHVybiBpdGVtLm5hbWU7XG4gIH1cblxuICB1cGRhdGUoKTogdm9pZCB7XG4gICAgc3VwZXIudXBkYXRlKCk7XG5cbiAgICB0aGlzLmRpbXMgPSBjYWxjdWxhdGVWaWV3RGltZW5zaW9ucyh7XG4gICAgICB3aWR0aDogdGhpcy53aWR0aCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHQsXG4gICAgICBtYXJnaW5zOiB0aGlzLm1hcmdpbixcbiAgICAgIHNob3dYQXhpczogdGhpcy54QXhpcyxcbiAgICAgIHNob3dZQXhpczogdGhpcy55QXhpcyxcbiAgICAgIHhBeGlzSGVpZ2h0OiB0aGlzLnhBeGlzSGVpZ2h0LFxuICAgICAgeUF4aXNXaWR0aDogdGhpcy55QXhpc1dpZHRoLFxuICAgICAgc2hvd1hMYWJlbDogdGhpcy5zaG93WEF4aXNMYWJlbCxcbiAgICAgIHNob3dZTGFiZWw6IHRoaXMuc2hvd1lBeGlzTGFiZWwsXG4gICAgICBzaG93TGVnZW5kOiB0aGlzLmxlZ2VuZCxcbiAgICAgIGxlZ2VuZFBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uXG4gICAgfSk7XG5cbiAgICB0aGlzLnhEb21haW4gPSB0aGlzLmdldFhEb21haW4oKTtcbiAgICB0aGlzLnlEb21haW4gPSB0aGlzLmdldFlEb21haW4oKTtcbiAgICB0aGlzLnNlcmllc0RvbWFpbiA9IHRoaXMuZ2V0U2VyaWVzRG9tYWluKCk7XG4gICAgdGhpcy5zZXRTY2FsZXMoKTtcbiAgICB0aGlzLnNldENvbG9ycygpO1xuXG4gICAgdGhpcy5sZWdlbmRPcHRpb25zID0gdGhpcy5nZXRMZWdlbmRPcHRpb25zKCk7XG4gICAgdGhpcy50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7dGhpcy5kaW1zLnhPZmZzZXR9ICwgJHt0aGlzLm1hcmdpblswXX0pYDtcbiAgfVxuXG4gIHNldENvbG9ycygpOiB2b2lkIHtcbiAgICBsZXQgZG9tYWluOiBzdHJpbmdbXSB8IG51bWJlcltdID0gW107XG4gICAgaWYgKHRoaXMuc2NoZW1lVHlwZSA9PT0gU2NhbGVUeXBlLk9yZGluYWwpIHtcbiAgICAgIGRvbWFpbiA9IHRoaXMuc2VyaWVzRG9tYWluO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb21haW4gPSB0aGlzLnlEb21haW47XG4gICAgfVxuXG4gICAgdGhpcy5jb2xvcnMgPSBuZXcgQ29sb3JIZWxwZXIodGhpcy5zY2hlbWUsIHRoaXMuc2NoZW1lVHlwZSwgZG9tYWluLCB0aGlzLmN1c3RvbUNvbG9ycyk7XG4gIH1cblxuICBzZXRTY2FsZXMoKSB7XG4gICAgdGhpcy54U2NhbGUgPSB0aGlzLmdldFhTY2FsZSh0aGlzLnhEb21haW4sIHRoaXMuZGltcy53aWR0aCk7XG4gICAgdGhpcy55U2NhbGUgPSB0aGlzLmdldFlTY2FsZSh0aGlzLnlEb21haW4sIHRoaXMuZGltcy5oZWlnaHQpO1xuICB9XG5cbiAgZ2V0WFNjYWxlKGRvbWFpbjogQXJyYXk8c3RyaW5nIHwgbnVtYmVyIHwgRGF0ZT4sIHdpZHRoOiBudW1iZXIpOiBTY2FsZUJhbmQ8c3RyaW5nPiB7XG4gICAgY29uc3Qgc2NhbGUgPSBzY2FsZUJhbmQoKVxuICAgICAgLmRvbWFpbihkb21haW4ubWFwKGQgPT4gZC50b1N0cmluZygpKSlcbiAgICAgIC5yYW5nZVJvdW5kKFswLCB3aWR0aF0pXG4gICAgICAucGFkZGluZygwLjUpO1xuXG4gICAgcmV0dXJuIHNjYWxlO1xuICB9XG5cbiAgZ2V0WVNjYWxlKGRvbWFpbjogbnVtYmVyW10sIGhlaWdodDogbnVtYmVyKTogU2NhbGVMaW5lYXI8bnVtYmVyLCBudW1iZXI+IHtcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlTGluZWFyKCkuZG9tYWluKGRvbWFpbikucmFuZ2UoW2hlaWdodCwgMF0pO1xuXG4gICAgcmV0dXJuIHRoaXMucm91bmREb21haW5zID8gc2NhbGUubmljZSgpIDogc2NhbGU7XG4gIH1cblxuICBnZXRVbmlxdWVCb3hDaGFydFhEb21haW5WYWx1ZXMocmVzdWx0czogQm94Q2hhcnRNdWx0aVNlcmllcykge1xuICAgIGNvbnN0IHZhbHVlU2V0ID0gbmV3IFNldDxzdHJpbmcgfCBudW1iZXIgfCBEYXRlPigpO1xuICAgIGZvciAoY29uc3QgcmVzdWx0IG9mIHJlc3VsdHMpIHtcbiAgICAgIHZhbHVlU2V0LmFkZChyZXN1bHQubmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHZhbHVlU2V0KTtcbiAgfVxuXG4gIGdldFhEb21haW4oKTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyIHwgRGF0ZT4ge1xuICAgIGxldCBkb21haW46IEFycmF5PHN0cmluZyB8IG51bWJlciB8IERhdGU+ID0gW107XG4gICAgY29uc3QgdmFsdWVzOiBBcnJheTxzdHJpbmcgfCBudW1iZXIgfCBEYXRlPiA9IHRoaXMuZ2V0VW5pcXVlQm94Q2hhcnRYRG9tYWluVmFsdWVzKHRoaXMucmVzdWx0cyk7XG4gICAgbGV0IG1pbjogbnVtYmVyO1xuICAgIGxldCBtYXg6IG51bWJlcjtcbiAgICBpZiAodHlwZW9mIHZhbHVlc1swXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGRvbWFpbiA9IHZhbHVlcy5tYXAodmFsID0+IHZhbC50b1N0cmluZygpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZXNbMF0gPT09ICdudW1iZXInKSB7XG4gICAgICBjb25zdCBtYXBwZWRWYWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4gTnVtYmVyKHYpKTtcbiAgICAgIG1pbiA9IE1hdGgubWluKC4uLm1hcHBlZFZhbHVlcyk7XG4gICAgICBtYXggPSBNYXRoLm1heCguLi5tYXBwZWRWYWx1ZXMpO1xuICAgICAgZG9tYWluID0gW21pbiwgbWF4XTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbWFwcGVkVmFsdWVzID0gdmFsdWVzLm1hcCh2ID0+IE51bWJlcihuZXcgRGF0ZSh2KSkpO1xuICAgICAgbWluID0gTWF0aC5taW4oLi4ubWFwcGVkVmFsdWVzKTtcbiAgICAgIG1heCA9IE1hdGgubWF4KC4uLm1hcHBlZFZhbHVlcyk7XG4gICAgICBkb21haW4gPSBbbmV3IERhdGUobWluKSwgbmV3IERhdGUobWF4KV07XG4gICAgfVxuICAgIHJldHVybiBkb21haW47XG4gIH1cblxuICBnZXRZRG9tYWluKCk6IG51bWJlcltdIHtcbiAgICBjb25zdCBkb21haW46IEFycmF5PG51bWJlciB8IERhdGU+ID0gW107XG4gICAgZm9yIChjb25zdCByZXN1bHRzIG9mIHRoaXMucmVzdWx0cykge1xuICAgICAgZm9yIChjb25zdCBkIG9mIHJlc3VsdHMuc2VyaWVzKSB7XG4gICAgICAgIGlmIChkb21haW4uaW5kZXhPZihkLnZhbHVlKSA8IDApIHtcbiAgICAgICAgICBkb21haW4ucHVzaChkLnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHZhbHVlcyA9IFsuLi5kb21haW5dO1xuICAgIGNvbnN0IG1hcHBlZFZhbHVlcyA9IHZhbHVlcy5tYXAodiA9PiBOdW1iZXIodikpO1xuXG4gICAgY29uc3QgbWluOiBudW1iZXIgPSBNYXRoLm1pbiguLi5tYXBwZWRWYWx1ZXMpO1xuICAgIGNvbnN0IG1heDogbnVtYmVyID0gTWF0aC5tYXgoLi4ubWFwcGVkVmFsdWVzKTtcblxuICAgIHJldHVybiBbbWluLCBtYXhdO1xuICB9XG5cbiAgZ2V0U2VyaWVzRG9tYWluKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5yZXN1bHRzLm1hcChkID0+IGAke2QubmFtZX1gKTtcbiAgfVxuXG4gIHVwZGF0ZVlBeGlzV2lkdGgoeyB3aWR0aCB9KTogdm9pZCB7XG4gICAgdGhpcy55QXhpc1dpZHRoID0gd2lkdGg7XG4gICAgdGhpcy51cGRhdGUoKTtcbiAgfVxuXG4gIHVwZGF0ZVhBeGlzSGVpZ2h0KHsgaGVpZ2h0IH0pOiB2b2lkIHtcbiAgICB0aGlzLnhBeGlzSGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMudXBkYXRlKCk7XG4gIH1cblxuICBvbkNsaWNrKGRhdGE6IElCb3hNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuc2VsZWN0LmVtaXQoZGF0YSk7XG4gIH1cblxuICBvbkFjdGl2YXRlKGRhdGE6IElCb3hNb2RlbCk6IHZvaWQge1xuICAgIHRoaXMuYWN0aXZhdGUuZW1pdChkYXRhKTtcbiAgfVxuXG4gIG9uRGVhY3RpdmF0ZShkYXRhOiBJQm94TW9kZWwpOiB2b2lkIHtcbiAgICB0aGlzLmRlYWN0aXZhdGUuZW1pdChkYXRhKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGVnZW5kT3B0aW9ucygpOiBMZWdlbmRPcHRpb25zIHtcbiAgICBjb25zdCBsZWdlbmRPcHRzOiBMZWdlbmRPcHRpb25zID0ge1xuICAgICAgc2NhbGVUeXBlOiB0aGlzLnNjaGVtZVR5cGUsXG4gICAgICBjb2xvcnM6IHRoaXMuY29sb3JzLFxuICAgICAgZG9tYWluOiBbXSxcbiAgICAgIHBvc2l0aW9uOiB0aGlzLmxlZ2VuZFBvc2l0aW9uLFxuICAgICAgdGl0bGU6IHRoaXMubGVnZW5kVGl0bGVcbiAgICB9O1xuICAgIGlmICh0aGlzLnNjaGVtZVR5cGUgPT09IFNjYWxlVHlwZS5PcmRpbmFsKSB7XG4gICAgICBsZWdlbmRPcHRzLmRvbWFpbiA9IHRoaXMueERvbWFpbjtcbiAgICAgIGxlZ2VuZE9wdHMuY29sb3JzID0gdGhpcy5jb2xvcnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlZ2VuZE9wdHMuZG9tYWluID0gdGhpcy55RG9tYWluO1xuICAgICAgbGVnZW5kT3B0cy5jb2xvcnMgPSB0aGlzLmNvbG9ycy5zY2FsZTtcbiAgICB9XG4gICAgcmV0dXJuIGxlZ2VuZE9wdHM7XG4gIH1cbn1cbiJdfQ==