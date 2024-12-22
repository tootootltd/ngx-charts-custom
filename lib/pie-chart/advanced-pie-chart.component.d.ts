import { EventEmitter, TemplateRef } from '@angular/core';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { DataItem } from '../models/chart-data.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import * as i0 from "@angular/core";
export declare class AdvancedPieChartComponent extends BaseChartComponent {
    gradient: boolean;
    activeEntries: any[];
    tooltipDisabled: boolean;
    tooltipText: any;
    label: string;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    tooltipTemplate: TemplateRef<any>;
    dims: ViewDimensions;
    domain: string[];
    outerRadius: number;
    innerRadius: number;
    transform: string;
    colors: ColorHelper;
    legendWidth: number;
    margin: number[];
    valueFormatting: (value: number) => any;
    nameFormatting: (value: string) => any;
    percentageFormatting: (value: number) => any;
    update(): void;
    getDomain(): string[];
    onClick(data: DataItem): void;
    setColors(): void;
    onActivate(item: any, fromLegend?: boolean): void;
    onDeactivate(item: any, fromLegend?: boolean): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AdvancedPieChartComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AdvancedPieChartComponent, "ngx-charts-advanced-pie-chart", never, { "gradient": "gradient"; "activeEntries": "activeEntries"; "tooltipDisabled": "tooltipDisabled"; "tooltipText": "tooltipText"; "label": "label"; "valueFormatting": "valueFormatting"; "nameFormatting": "nameFormatting"; "percentageFormatting": "percentageFormatting"; }, { "activate": "activate"; "deactivate": "deactivate"; }, ["tooltipTemplate"], never, false>;
}
