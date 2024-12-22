/**
 * Throttle a function
 *
 */
export function throttle(func, wait, options) {
    options = options || {};
    let context;
    let args;
    let result;
    let timeout = null;
    let previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        const now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        const remaining = wait - (now - previous);
        context = this;
        // eslint-disable-next-line prefer-rest-params
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhyb3R0bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi91dGlscy90aHJvdHRsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsUUFBUSxDQUFDLElBQVMsRUFBRSxJQUFZLEVBQUUsT0FBYTtJQUM3RCxPQUFPLEdBQUcsT0FBTyxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLE9BQU8sQ0FBQztJQUNaLElBQUksSUFBSSxDQUFDO0lBQ1QsSUFBSSxNQUFNLENBQUM7SUFDWCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDbkIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0lBRWpCLFNBQVMsS0FBSztRQUNaLFFBQVEsR0FBRyxPQUFPLENBQUMsT0FBTyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUM7UUFDdkQsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQsT0FBTztRQUNMLE1BQU0sR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUV4QixJQUFJLENBQUMsUUFBUSxJQUFJLE9BQU8sQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzFDLFFBQVEsR0FBRyxHQUFHLENBQUM7U0FDaEI7UUFFRCxNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLENBQUM7UUFDMUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUNmLDhDQUE4QztRQUM5QyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBRWpCLElBQUksU0FBUyxJQUFJLENBQUMsRUFBRTtZQUNsQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdEIsT0FBTyxHQUFHLElBQUksQ0FBQztZQUNmLFFBQVEsR0FBRyxHQUFHLENBQUM7WUFDZixNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7YUFBTSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO1lBQ2pELE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUFDLFFBQWdCLEVBQUUsT0FBYTtJQUMxRCxPQUFPLFNBQVMsY0FBYyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsVUFBVTtRQUNwRCxPQUFPO1lBQ0wsWUFBWSxFQUFFLElBQUk7WUFDbEIsVUFBVSxFQUFFLFVBQVUsQ0FBQyxVQUFVO1lBQ2pDLEdBQUcsRUFBRSxTQUFTLE1BQU07Z0JBQ2xCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtvQkFDL0IsWUFBWSxFQUFFLElBQUk7b0JBQ2xCLFVBQVUsRUFBRSxVQUFVLENBQUMsVUFBVTtvQkFDakMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUM7aUJBQ3JELENBQUMsQ0FBQztnQkFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDO1NBQ0YsQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIFRocm90dGxlIGEgZnVuY3Rpb25cbiAqXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0aHJvdHRsZShmdW5jOiBhbnksIHdhaXQ6IG51bWJlciwgb3B0aW9ucz86IGFueSkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGV0IGNvbnRleHQ7XG4gIGxldCBhcmdzO1xuICBsZXQgcmVzdWx0O1xuICBsZXQgdGltZW91dCA9IG51bGw7XG4gIGxldCBwcmV2aW91cyA9IDA7XG5cbiAgZnVuY3Rpb24gbGF0ZXIoKSB7XG4gICAgcHJldmlvdXMgPSBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlID8gMCA6ICtuZXcgRGF0ZSgpO1xuICAgIHRpbWVvdXQgPSBudWxsO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IG5vdyA9ICtuZXcgRGF0ZSgpO1xuXG4gICAgaWYgKCFwcmV2aW91cyAmJiBvcHRpb25zLmxlYWRpbmcgPT09IGZhbHNlKSB7XG4gICAgICBwcmV2aW91cyA9IG5vdztcbiAgICB9XG5cbiAgICBjb25zdCByZW1haW5pbmcgPSB3YWl0IC0gKG5vdyAtIHByZXZpb3VzKTtcbiAgICBjb250ZXh0ID0gdGhpcztcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIGlmIChyZW1haW5pbmcgPD0gMCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICBwcmV2aW91cyA9IG5vdztcbiAgICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgfSBlbHNlIGlmICghdGltZW91dCAmJiBvcHRpb25zLnRyYWlsaW5nICE9PSBmYWxzZSkge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHJlbWFpbmluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaHJvdHRsZSBkZWNvcmF0b3JcbiAqXG4gKiAgY2xhc3MgTXlDbGFzcyB7XG4gKiAgICB0aHJvdHRsZWFibGUoMTApXG4gKiAgICBteUZuKCkgeyAuLi4gfVxuICogIH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRocm90dGxlYWJsZShkdXJhdGlvbjogbnVtYmVyLCBvcHRpb25zPzogYW55KSB7XG4gIHJldHVybiBmdW5jdGlvbiBpbm5lckRlY29yYXRvcih0YXJnZXQsIGtleSwgZGVzY3JpcHRvcikge1xuICAgIHJldHVybiB7XG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICBlbnVtZXJhYmxlOiBkZXNjcmlwdG9yLmVudW1lcmFibGUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldHRlcigpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsIGtleSwge1xuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiBkZXNjcmlwdG9yLmVudW1lcmFibGUsXG4gICAgICAgICAgdmFsdWU6IHRocm90dGxlKGRlc2NyaXB0b3IudmFsdWUsIGR1cmF0aW9uLCBvcHRpb25zKVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGhpc1trZXldO1xuICAgICAgfVxuICAgIH07XG4gIH07XG59XG4iXX0=