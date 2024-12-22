import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipDirective } from './tooltip.directive';
import { TooltipContentComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';
import { InjectionService } from './injection.service';
import * as i0 from "@angular/core";
export class TooltipModule {
}
TooltipModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
TooltipModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.2.1", ngImport: i0, type: TooltipModule, declarations: [TooltipContentComponent, TooltipDirective], imports: [CommonModule], exports: [TooltipContentComponent, TooltipDirective] });
TooltipModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipModule, providers: [InjectionService, TooltipService], imports: [CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [TooltipContentComponent, TooltipDirective],
                    providers: [InjectionService, TooltipService],
                    exports: [TooltipContentComponent, TooltipDirective],
                    imports: [CommonModule]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vdG9vbHRpcC90b29sdGlwLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUUvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0scUJBQXFCLENBQUM7O0FBUXZELE1BQU0sT0FBTyxhQUFhOzswR0FBYixhQUFhOzJHQUFiLGFBQWEsaUJBTFAsdUJBQXVCLEVBQUUsZ0JBQWdCLGFBRzlDLFlBQVksYUFEWix1QkFBdUIsRUFBRSxnQkFBZ0I7MkdBRzFDLGFBQWEsYUFKWCxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxZQUVuQyxZQUFZOzJGQUViLGFBQWE7a0JBTnpCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFLENBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3pELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztvQkFDN0MsT0FBTyxFQUFFLENBQUMsdUJBQXVCLEVBQUUsZ0JBQWdCLENBQUM7b0JBQ3BELE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztpQkFDMUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuaW1wb3J0IHsgVG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJy4vdG9vbHRpcC5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgVG9vbHRpcENvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL3Rvb2x0aXAuY29tcG9uZW50JztcbmltcG9ydCB7IFRvb2x0aXBTZXJ2aWNlIH0gZnJvbSAnLi90b29sdGlwLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBJbmplY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbmplY3Rpb24uc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gICAgZGVjbGFyYXRpb25zOiBbVG9vbHRpcENvbnRlbnRDb21wb25lbnQsIFRvb2x0aXBEaXJlY3RpdmVdLFxuICAgIHByb3ZpZGVyczogW0luamVjdGlvblNlcnZpY2UsIFRvb2x0aXBTZXJ2aWNlXSxcbiAgICBleHBvcnRzOiBbVG9vbHRpcENvbnRlbnRDb21wb25lbnQsIFRvb2x0aXBEaXJlY3RpdmVdLFxuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIFRvb2x0aXBNb2R1bGUge31cbiJdfQ==