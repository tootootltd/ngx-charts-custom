import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { AreaChartSeries } from '../models/chart-data.model';
import { BarOrientation } from './types/bar-orientation.enum';
import { Gradient } from './types/gradient.interface';
import * as i0 from "@angular/core";
export declare class AreaComponent implements OnChanges {
    data: AreaChartSeries;
    path: string;
    startingPath: string;
    fill: string;
    opacity: number;
    startOpacity: number;
    endOpacity: number;
    gradient: boolean;
    stops: Gradient[];
    animations: boolean;
    select: EventEmitter<any>;
    element: HTMLElement;
    gradientId: string;
    gradientFill: string;
    areaPath: string;
    animationsLoaded: boolean;
    gradientStops: Gradient[];
    hasGradient: boolean;
    barOrientation: typeof BarOrientation;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    update(): void;
    loadAnimation(): void;
    updatePathEl(): void;
    getGradient(): Gradient[];
    static ɵfac: i0.ɵɵFactoryDeclaration<AreaComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AreaComponent, "g[ngx-charts-area]", never, { "data": "data"; "path": "path"; "startingPath": "startingPath"; "fill": "fill"; "opacity": "opacity"; "startOpacity": "startOpacity"; "endOpacity": "endOpacity"; "gradient": "gradient"; "stops": "stops"; "animations": "animations"; }, { "select": "select"; }, never, never, false>;
}
