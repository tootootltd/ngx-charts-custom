import { ScaleType } from './types/scale-type.enum';
/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 */
export function getUniqueXDomainValues(results) {
    const valueSet = new Set();
    for (const result of results) {
        for (const d of result.series) {
            valueSet.add(d.name);
        }
    }
    return Array.from(valueSet);
}
/**
 * Get the scaleType of enumerable of values.
 * @returns  'time', 'linear' or 'ordinal'
 */
export function getScaleType(values, checkDateType = true) {
    if (checkDateType) {
        const allDates = values.every(value => value instanceof Date);
        if (allDates) {
            return ScaleType.Time;
        }
    }
    const allNumbers = values.every(value => typeof value === 'number');
    if (allNumbers) {
        return ScaleType.Linear;
    }
    return ScaleType.Ordinal;
}
export function getXDomainArray(values, xScaleMin, xScaleMax) {
    const scaleType = getScaleType(values);
    let xSet = [];
    let domain = [];
    if (scaleType === ScaleType.Linear) {
        values = values.map(v => Number(v));
    }
    let min;
    let max;
    if (scaleType === ScaleType.Time || scaleType === ScaleType.Linear) {
        const mappedValues = values.map(v => Number(v));
        min = xScaleMin ? xScaleMin : Math.min(...mappedValues);
        max = xScaleMax ? xScaleMax : Math.max(...mappedValues);
    }
    if (scaleType === ScaleType.Time) {
        domain = [new Date(min), new Date(max)];
        xSet = [...values].sort((a, b) => {
            const aDate = a.getTime();
            const bDate = b.getTime();
            if (aDate > bDate)
                return 1;
            if (bDate > aDate)
                return -1;
            return 0;
        });
    }
    else if (scaleType === ScaleType.Linear) {
        domain = [min, max];
        // Use compare function to sort numbers numerically
        xSet = [...values].sort((a, b) => a - b);
    }
    else {
        domain = values;
        xSet = values;
    }
    return { domain, xSet, scaleType };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tYWluLmhlbHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RvbW15ZGVha3Mvbmd4LWNoYXJ0cy9zcmMvbGliL2NvbW1vbi9kb21haW4uaGVscGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVwRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxzQkFBc0IsQ0FBQyxPQUFjO0lBQ25ELE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxFQUFFLENBQUM7SUFDM0IsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7UUFDNUIsS0FBSyxNQUFNLENBQUMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO1lBQzdCLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3RCO0tBQ0Y7SUFDRCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVEOzs7R0FHRztBQUNILE1BQU0sVUFBVSxZQUFZLENBQUMsTUFBYSxFQUFFLGdCQUF5QixJQUFJO0lBQ3ZFLElBQUksYUFBYSxFQUFFO1FBQ2pCLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUM7UUFDOUQsSUFBSSxRQUFRLEVBQUU7WUFDWixPQUFPLFNBQVMsQ0FBQyxJQUFJLENBQUM7U0FDdkI7S0FDRjtJQUVELE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQztJQUNwRSxJQUFJLFVBQVUsRUFBRTtRQUNkLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQztLQUN6QjtJQUVELE9BQU8sU0FBUyxDQUFDLE9BQU8sQ0FBQztBQUMzQixDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FDN0IsTUFBcUMsRUFDckMsU0FBa0IsRUFDbEIsU0FBa0I7SUFFbEIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLElBQUksSUFBSSxHQUEyQixFQUFFLENBQUM7SUFDdEMsSUFBSSxNQUFNLEdBQTJCLEVBQUUsQ0FBQztJQUV4QyxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ2xDLE1BQU0sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDckM7SUFFRCxJQUFJLEdBQVcsQ0FBQztJQUNoQixJQUFJLEdBQVcsQ0FBQztJQUNoQixJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsSUFBSSxJQUFJLFNBQVMsS0FBSyxTQUFTLENBQUMsTUFBTSxFQUFFO1FBQ2xFLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoRCxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztRQUN4RCxHQUFHLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztLQUN6RDtJQUVELElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxJQUFJLEVBQUU7UUFDaEMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN4QyxJQUFJLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQU8sRUFBRSxDQUFPLEVBQUUsRUFBRTtZQUMzQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDMUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQzFCLElBQUksS0FBSyxHQUFHLEtBQUs7Z0JBQUUsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBSSxLQUFLLEdBQUcsS0FBSztnQkFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQyxDQUFDLENBQUM7S0FDSjtTQUFNLElBQUksU0FBUyxLQUFLLFNBQVMsQ0FBQyxNQUFNLEVBQUU7UUFDekMsTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BCLG1EQUFtRDtRQUNuRCxJQUFJLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMxRDtTQUFNO1FBQ0wsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNoQixJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQztBQUNyQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2NhbGVUeXBlIH0gZnJvbSAnLi90eXBlcy9zY2FsZS10eXBlLmVudW0nO1xuaW1wb3J0IHsgU3RyaW5nT3JOdW1iZXJPckRhdGUgfSBmcm9tICcuLi9tb2RlbHMvY2hhcnQtZGF0YS5tb2RlbCc7XG4vKipcbiAqIEJhc2VkIG9uIHRoZSBkYXRhLCByZXR1cm4gYW4gYXJyYXkgd2l0aCB1bmlxdWUgdmFsdWVzLlxuICpcbiAqIEBleHBvcnRcbiAqIEByZXR1cm5zIGFycmF5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRVbmlxdWVYRG9tYWluVmFsdWVzKHJlc3VsdHM6IGFueVtdKTogYW55W10ge1xuICBjb25zdCB2YWx1ZVNldCA9IG5ldyBTZXQoKTtcbiAgZm9yIChjb25zdCByZXN1bHQgb2YgcmVzdWx0cykge1xuICAgIGZvciAoY29uc3QgZCBvZiByZXN1bHQuc2VyaWVzKSB7XG4gICAgICB2YWx1ZVNldC5hZGQoZC5uYW1lKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIEFycmF5LmZyb20odmFsdWVTZXQpO1xufVxuXG4vKipcbiAqIEdldCB0aGUgc2NhbGVUeXBlIG9mIGVudW1lcmFibGUgb2YgdmFsdWVzLlxuICogQHJldHVybnMgICd0aW1lJywgJ2xpbmVhcicgb3IgJ29yZGluYWwnXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY2FsZVR5cGUodmFsdWVzOiBhbnlbXSwgY2hlY2tEYXRlVHlwZTogYm9vbGVhbiA9IHRydWUpOiBTY2FsZVR5cGUge1xuICBpZiAoY2hlY2tEYXRlVHlwZSkge1xuICAgIGNvbnN0IGFsbERhdGVzID0gdmFsdWVzLmV2ZXJ5KHZhbHVlID0+IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSk7XG4gICAgaWYgKGFsbERhdGVzKSB7XG4gICAgICByZXR1cm4gU2NhbGVUeXBlLlRpbWU7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYWxsTnVtYmVycyA9IHZhbHVlcy5ldmVyeSh2YWx1ZSA9PiB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKTtcbiAgaWYgKGFsbE51bWJlcnMpIHtcbiAgICByZXR1cm4gU2NhbGVUeXBlLkxpbmVhcjtcbiAgfVxuXG4gIHJldHVybiBTY2FsZVR5cGUuT3JkaW5hbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFhEb21haW5BcnJheShcbiAgdmFsdWVzOiBBcnJheTxzdHJpbmcgfCBudW1iZXIgfCBEYXRlPixcbiAgeFNjYWxlTWluPzogbnVtYmVyLFxuICB4U2NhbGVNYXg/OiBudW1iZXJcbik6IHsgZG9tYWluOiBhbnlbXTsgeFNldDogYW55W107IHNjYWxlVHlwZTogc3RyaW5nIH0ge1xuICBjb25zdCBzY2FsZVR5cGUgPSBnZXRTY2FsZVR5cGUodmFsdWVzKTtcbiAgbGV0IHhTZXQ6IFN0cmluZ09yTnVtYmVyT3JEYXRlW10gPSBbXTtcbiAgbGV0IGRvbWFpbjogU3RyaW5nT3JOdW1iZXJPckRhdGVbXSA9IFtdO1xuXG4gIGlmIChzY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIpIHtcbiAgICB2YWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4gTnVtYmVyKHYpKTtcbiAgfVxuXG4gIGxldCBtaW46IG51bWJlcjtcbiAgbGV0IG1heDogbnVtYmVyO1xuICBpZiAoc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuVGltZSB8fCBzY2FsZVR5cGUgPT09IFNjYWxlVHlwZS5MaW5lYXIpIHtcbiAgICBjb25zdCBtYXBwZWRWYWx1ZXMgPSB2YWx1ZXMubWFwKHYgPT4gTnVtYmVyKHYpKTtcbiAgICBtaW4gPSB4U2NhbGVNaW4gPyB4U2NhbGVNaW4gOiBNYXRoLm1pbiguLi5tYXBwZWRWYWx1ZXMpO1xuICAgIG1heCA9IHhTY2FsZU1heCA/IHhTY2FsZU1heCA6IE1hdGgubWF4KC4uLm1hcHBlZFZhbHVlcyk7XG4gIH1cblxuICBpZiAoc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuVGltZSkge1xuICAgIGRvbWFpbiA9IFtuZXcgRGF0ZShtaW4pLCBuZXcgRGF0ZShtYXgpXTtcbiAgICB4U2V0ID0gWy4uLnZhbHVlc10uc29ydCgoYTogRGF0ZSwgYjogRGF0ZSkgPT4ge1xuICAgICAgY29uc3QgYURhdGUgPSBhLmdldFRpbWUoKTtcbiAgICAgIGNvbnN0IGJEYXRlID0gYi5nZXRUaW1lKCk7XG4gICAgICBpZiAoYURhdGUgPiBiRGF0ZSkgcmV0dXJuIDE7XG4gICAgICBpZiAoYkRhdGUgPiBhRGF0ZSkgcmV0dXJuIC0xO1xuICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoc2NhbGVUeXBlID09PSBTY2FsZVR5cGUuTGluZWFyKSB7XG4gICAgZG9tYWluID0gW21pbiwgbWF4XTtcbiAgICAvLyBVc2UgY29tcGFyZSBmdW5jdGlvbiB0byBzb3J0IG51bWJlcnMgbnVtZXJpY2FsbHlcbiAgICB4U2V0ID0gWy4uLnZhbHVlc10uc29ydCgoYTogbnVtYmVyLCBiOiBudW1iZXIpID0+IGEgLSBiKTtcbiAgfSBlbHNlIHtcbiAgICBkb21haW4gPSB2YWx1ZXM7XG4gICAgeFNldCA9IHZhbHVlcztcbiAgfVxuXG4gIHJldHVybiB7IGRvbWFpbiwgeFNldCwgc2NhbGVUeXBlIH07XG59XG4iXX0=