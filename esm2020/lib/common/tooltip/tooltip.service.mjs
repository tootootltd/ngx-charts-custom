import { Injectable } from '@angular/core';
import { TooltipContentComponent } from './tooltip.component';
import { InjectionRegisteryService } from './injection-registery.service';
import * as i0 from "@angular/core";
import * as i1 from "./injection.service";
export class TooltipService extends InjectionRegisteryService {
    constructor(injectionService) {
        super(injectionService);
        this.type = TooltipContentComponent;
    }
}
TooltipService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipService, deps: [{ token: i1.InjectionService }], target: i0.ɵɵFactoryTarget.Injectable });
TooltipService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.2.1", ngImport: i0, type: TooltipService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.InjectionService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdG9tbXlkZWFrcy9uZ3gtY2hhcnRzL3NyYy9saWIvY29tbW9uL3Rvb2x0aXAvdG9vbHRpcC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFM0MsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDOUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sK0JBQStCLENBQUM7OztBQUUxRSxNQUFNLE9BQU8sY0FBZSxTQUFRLHlCQUFrRDtJQUdwRixZQUFZLGdCQUFrQztRQUM1QyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUgxQixTQUFJLEdBQVEsdUJBQXVCLENBQUM7SUFJcEMsQ0FBQzs7MkdBTFUsY0FBYzsrR0FBZCxjQUFjOzJGQUFkLGNBQWM7a0JBRDFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJbmplY3Rpb25TZXJ2aWNlIH0gZnJvbSAnLi9pbmplY3Rpb24uc2VydmljZSc7XG5pbXBvcnQgeyBUb29sdGlwQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vdG9vbHRpcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgSW5qZWN0aW9uUmVnaXN0ZXJ5U2VydmljZSB9IGZyb20gJy4vaW5qZWN0aW9uLXJlZ2lzdGVyeS5zZXJ2aWNlJztcbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUb29sdGlwU2VydmljZSBleHRlbmRzIEluamVjdGlvblJlZ2lzdGVyeVNlcnZpY2U8VG9vbHRpcENvbnRlbnRDb21wb25lbnQ+IHtcbiAgdHlwZTogYW55ID0gVG9vbHRpcENvbnRlbnRDb21wb25lbnQ7XG5cbiAgY29uc3RydWN0b3IoaW5qZWN0aW9uU2VydmljZTogSW5qZWN0aW9uU2VydmljZSkge1xuICAgIHN1cGVyKGluamVjdGlvblNlcnZpY2UpO1xuICB9XG59XG4iXX0=