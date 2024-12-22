import { PlacementTypes } from './placement-type.enum';
const caretOffset = 7;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === PlacementTypes.Top) {
        return elDimensions.top - caretOffset;
    }
    if (alignment === PlacementTypes.Bottom) {
        return elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === PlacementTypes.Center) {
        return elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return undefined;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    if (alignment === PlacementTypes.Left) {
        return elDimensions.left - caretOffset;
    }
    if (alignment === PlacementTypes.Right) {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === PlacementTypes.Center) {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return undefined;
}
/**
 * Position helper for the popover directive.
 *
 * @export
 */
export class PositionHelper {
    /**
     * Calculate vertical alignment position
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    }
    /**
     * Calculate vertical caret position
     *
     * @memberOf PositionHelper
     */
    static calculateVerticalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === PlacementTypes.Top) {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === PlacementTypes.Bottom) {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === PlacementTypes.Center) {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        const popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += popoverPosition + popoverDimensions.height - window.innerHeight;
        }
        return result;
    }
    /**
     * Calculate horz alignment position
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalAlignment(elDimensions, popoverDimensions, alignment) {
        let result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    }
    /**
     * Calculate horz caret position
     *
     * @memberOf PositionHelper
     */
    static calculateHorizontalCaret(elDimensions, popoverDimensions, caretDimensions, alignment) {
        let result;
        if (alignment === PlacementTypes.Left) {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === PlacementTypes.Right) {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === PlacementTypes.Center) {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        const popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += popoverPosition + popoverDimensions.width - window.innerWidth;
        }
        return result;
    }
    /**
     * Checks if the element's position should be flipped
     *
     * @memberOf PositionHelper
     */
    static shouldFlip(elDimensions, popoverDimensions, placement, spacing) {
        let flip = false;
        if (placement === PlacementTypes.Right) {
            if (elDimensions.left + elDimensions.width + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === PlacementTypes.Left) {
            if (elDimensions.left - popoverDimensions.width - spacing < 0) {
                flip = true;
            }
        }
        if (placement === PlacementTypes.Top) {
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
                flip = true;
            }
        }
        if (placement === PlacementTypes.Bottom) {
            if (elDimensions.top + elDimensions.height + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    }
    /**
     * Position caret
     *
     * @memberOf PositionHelper
     */
    static positionCaret(placement, elmDim, hostDim, caretDimensions, alignment) {
        let top = 0;
        let left = 0;
        if (placement === PlacementTypes.Right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.Left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.Top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === PlacementTypes.Bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top, left };
    }
    /**
     * Position content
     *
     * @memberOf PositionHelper
     */
    static positionContent(placement, elmDim, hostDim, spacing, alignment) {
        let top = 0;
        let left = 0;
        if (placement === PlacementTypes.Right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.Left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.Top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === PlacementTypes.Bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top, left };
    }
    /**
     * Determine placement based on flip
     *
     * @memberOf PositionHelper
     */
    static determinePlacement(placement, elmDim, hostDim, spacing) {
        const shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, spacing);
        if (shouldFlip) {
            if (placement === PlacementTypes.Right) {
                return PlacementTypes.Left;
            }
            else if (placement === PlacementTypes.Left) {
                return PlacementTypes.Right;
            }
            else if (placement === PlacementTypes.Top) {
                return PlacementTypes.Bottom;
            }
            else if (placement === PlacementTypes.Bottom) {
                return PlacementTypes.Top;
            }
        }
        return placement;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zaXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90b21teWRlYWtzL25neC1jaGFydHMvc3JjL2xpYi9jb21tb24vdG9vbHRpcC9wb3NpdGlvbi9wb3NpdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFdkQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDO0FBRXRCLFNBQVMsZ0JBQWdCLENBQUMsWUFBcUIsRUFBRSxpQkFBMEIsRUFBRSxTQUF5QjtJQUNwRyxJQUFJLFNBQVMsS0FBSyxjQUFjLENBQUMsR0FBRyxFQUFFO1FBQ3BDLE9BQU8sWUFBWSxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUM7S0FDdkM7SUFFRCxJQUFJLFNBQVMsS0FBSyxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3ZDLE9BQU8sWUFBWSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLGlCQUFpQixDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7S0FDeEY7SUFFRCxJQUFJLFNBQVMsS0FBSyxjQUFjLENBQUMsTUFBTSxFQUFFO1FBQ3ZDLE9BQU8sWUFBWSxDQUFDLEdBQUcsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0tBQ2xGO0lBRUQsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVELFNBQVMsa0JBQWtCLENBQUMsWUFBcUIsRUFBRSxpQkFBMEIsRUFBRSxTQUF5QjtJQUN0RyxJQUFJLFNBQVMsS0FBSyxjQUFjLENBQUMsSUFBSSxFQUFFO1FBQ3JDLE9BQU8sWUFBWSxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7S0FDeEM7SUFFRCxJQUFJLFNBQVMsS0FBSyxjQUFjLENBQUMsS0FBSyxFQUFFO1FBQ3RDLE9BQU8sWUFBWSxDQUFDLElB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Q0FBQyxNQUFNLEVBQUU7Z0JBQzlDLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQzthQUMzQjtTQUNGO1FBRUQsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGxhY2VtZW50VHlwZXMgfSBmcm9tICcuL3BsYWNlbWVudC10eXBlLmVudW0nO1xuXG5jb25zdCBjYXJldE9mZnNldCA9IDc7XG5cbmZ1bmN0aW9uIHZlcnRpY2FsUG9zaXRpb24oZWxEaW1lbnNpb25zOiBET01SZWN0LCBwb3BvdmVyRGltZW5zaW9uczogRE9NUmVjdCwgYWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlcyk6IG51bWJlciB7XG4gIGlmIChhbGlnbm1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlRvcCkge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMudG9wIC0gY2FyZXRPZmZzZXQ7XG4gIH1cblxuICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Cb3R0b20pIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLnRvcCArIGVsRGltZW5zaW9ucy5oZWlnaHQgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgKyBjYXJldE9mZnNldDtcbiAgfVxuXG4gIGlmIChhbGlnbm1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkNlbnRlcikge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMudG9wICsgZWxEaW1lbnNpb25zLmhlaWdodCAvIDIgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLyAyO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9uczogRE9NUmVjdCwgcG9wb3ZlckRpbWVuc2lvbnM6IERPTVJlY3QsIGFsaWdubWVudDogUGxhY2VtZW50VHlwZXMpOiBudW1iZXIge1xuICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5MZWZ0KSB7XG4gICAgcmV0dXJuIGVsRGltZW5zaW9ucy5sZWZ0IC0gY2FyZXRPZmZzZXQ7XG4gIH1cblxuICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5SaWdodCkge1xuICAgIHJldHVybiBlbERpbWVuc2lvbnMubGVmdCArIGVsRGltZW5zaW9ucy53aWR0aCAtIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoICsgY2FyZXRPZmZzZXQ7XG4gIH1cblxuICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5DZW50ZXIpIHtcbiAgICByZXR1cm4gZWxEaW1lbnNpb25zLmxlZnQgKyBlbERpbWVuc2lvbnMud2lkdGggLyAyIC0gcG9wb3ZlckRpbWVuc2lvbnMud2lkdGggLyAyO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBQb3NpdGlvbiBoZWxwZXIgZm9yIHRoZSBwb3BvdmVyIGRpcmVjdGl2ZS5cbiAqXG4gKiBAZXhwb3J0XG4gKi9cbmV4cG9ydCBjbGFzcyBQb3NpdGlvbkhlbHBlciB7XG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgdmVydGljYWwgYWxpZ25tZW50IHBvc2l0aW9uXG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIGNhbGN1bGF0ZVZlcnRpY2FsQWxpZ25tZW50KFxuICAgIGVsRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBwb3BvdmVyRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBhbGlnbm1lbnQ6IFBsYWNlbWVudFR5cGVzXG4gICk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdCA9IHZlcnRpY2FsUG9zaXRpb24oZWxEaW1lbnNpb25zLCBwb3BvdmVyRGltZW5zaW9ucywgYWxpZ25tZW50KTtcblxuICAgIGlmIChyZXN1bHQgKyBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgIHJlc3VsdCA9IHdpbmRvdy5pbm5lckhlaWdodCAtIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSB2ZXJ0aWNhbCBjYXJldCBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBjYWxjdWxhdGVWZXJ0aWNhbENhcmV0KFxuICAgIGVsRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBwb3BvdmVyRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBjYXJldERpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgYWxpZ25tZW50OiBQbGFjZW1lbnRUeXBlc1xuICApOiBudW1iZXIge1xuICAgIGxldCByZXN1bHQ7XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Ub3ApIHtcbiAgICAgIHJlc3VsdCA9IGVsRGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXREaW1lbnNpb25zLmhlaWdodCAvIDIgKyBjYXJldE9mZnNldDtcbiAgICB9XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Cb3R0b20pIHtcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAtIGVsRGltZW5zaW9ucy5oZWlnaHQgLyAyIC0gY2FyZXREaW1lbnNpb25zLmhlaWdodCAvIDIgLSBjYXJldE9mZnNldDtcbiAgICB9XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5DZW50ZXIpIHtcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAvIDIgLSBjYXJldERpbWVuc2lvbnMuaGVpZ2h0IC8gMjtcbiAgICB9XG5cbiAgICBjb25zdCBwb3BvdmVyUG9zaXRpb24gPSB2ZXJ0aWNhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgaWYgKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgcmVzdWx0ICs9IHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCAtIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIENhbGN1bGF0ZSBob3J6IGFsaWdubWVudCBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBjYWxjdWxhdGVIb3Jpem9udGFsQWxpZ25tZW50KFxuICAgIGVsRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBwb3BvdmVyRGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBhbGlnbm1lbnQ6IFBsYWNlbWVudFR5cGVzXG4gICk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdCA9IGhvcml6b250YWxQb3NpdGlvbihlbERpbWVuc2lvbnMsIHBvcG92ZXJEaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuXG4gICAgaWYgKHJlc3VsdCArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgIHJlc3VsdCA9IHdpbmRvdy5pbm5lcldpZHRoIC0gcG9wb3ZlckRpbWVuc2lvbnMud2lkdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBDYWxjdWxhdGUgaG9yeiBjYXJldCBwb3NpdGlvblxuICAgKlxuICAgKiBAbWVtYmVyT2YgUG9zaXRpb25IZWxwZXJcbiAgICovXG4gIHN0YXRpYyBjYWxjdWxhdGVIb3Jpem9udGFsQ2FyZXQoXG4gICAgZWxEaW1lbnNpb25zOiBET01SZWN0LFxuICAgIHBvcG92ZXJEaW1lbnNpb25zOiBET01SZWN0LFxuICAgIGNhcmV0RGltZW5zaW9uczogRE9NUmVjdCxcbiAgICBhbGlnbm1lbnQ6IFBsYWNlbWVudFR5cGVzXG4gICk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdDtcblxuICAgIGlmIChhbGlnbm1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkxlZnQpIHtcbiAgICAgIHJlc3VsdCA9IGVsRGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldERpbWVuc2lvbnMud2lkdGggLyAyICsgY2FyZXRPZmZzZXQ7XG4gICAgfVxuXG4gICAgaWYgKGFsaWdubWVudCA9PT0gUGxhY2VtZW50VHlwZXMuUmlnaHQpIHtcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC0gZWxEaW1lbnNpb25zLndpZHRoIC8gMiAtIGNhcmV0RGltZW5zaW9ucy53aWR0aCAvIDIgLSBjYXJldE9mZnNldDtcbiAgICB9XG5cbiAgICBpZiAoYWxpZ25tZW50ID09PSBQbGFjZW1lbnRUeXBlcy5DZW50ZXIpIHtcbiAgICAgIHJlc3VsdCA9IHBvcG92ZXJEaW1lbnNpb25zLndpZHRoIC8gMiAtIGNhcmV0RGltZW5zaW9ucy53aWR0aCAvIDI7XG4gICAgfVxuXG4gICAgY29uc3QgcG9wb3ZlclBvc2l0aW9uID0gaG9yaXpvbnRhbFBvc2l0aW9uKGVsRGltZW5zaW9ucywgcG9wb3ZlckRpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgaWYgKHBvcG92ZXJQb3NpdGlvbiArIHBvcG92ZXJEaW1lbnNpb25zLndpZHRoID4gd2luZG93LmlubmVyV2lkdGgpIHtcbiAgICAgIHJlc3VsdCArPSBwb3BvdmVyUG9zaXRpb24gKyBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAtIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZSBlbGVtZW50J3MgcG9zaXRpb24gc2hvdWxkIGJlIGZsaXBwZWRcbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgc2hvdWxkRmxpcChcbiAgICBlbERpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgcG9wb3ZlckRpbWVuc2lvbnM6IERPTVJlY3QsXG4gICAgcGxhY2VtZW50OiBQbGFjZW1lbnRUeXBlcyxcbiAgICBzcGFjaW5nOiBudW1iZXJcbiAgKTogYm9vbGVhbiB7XG4gICAgbGV0IGZsaXAgPSBmYWxzZTtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlJpZ2h0KSB7XG4gICAgICBpZiAoZWxEaW1lbnNpb25zLmxlZnQgKyBlbERpbWVuc2lvbnMud2lkdGggKyBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCArIHNwYWNpbmcgPiB3aW5kb3cuaW5uZXJXaWR0aCkge1xuICAgICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5MZWZ0KSB7XG4gICAgICBpZiAoZWxEaW1lbnNpb25zLmxlZnQgLSBwb3BvdmVyRGltZW5zaW9ucy53aWR0aCAtIHNwYWNpbmcgPCAwKSB7XG4gICAgICAgIGZsaXAgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlRvcCkge1xuICAgICAgaWYgKGVsRGltZW5zaW9ucy50b3AgLSBwb3BvdmVyRGltZW5zaW9ucy5oZWlnaHQgLSBzcGFjaW5nIDwgMCkge1xuICAgICAgICBmbGlwID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Cb3R0b20pIHtcbiAgICAgIGlmIChlbERpbWVuc2lvbnMudG9wICsgZWxEaW1lbnNpb25zLmhlaWdodCArIHBvcG92ZXJEaW1lbnNpb25zLmhlaWdodCArIHNwYWNpbmcgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgZmxpcCA9IHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsaXA7XG4gIH1cblxuICAvKipcbiAgICogUG9zaXRpb24gY2FyZXRcbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgcG9zaXRpb25DYXJldChwbGFjZW1lbnQsIGVsbURpbSwgaG9zdERpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQ6IFBsYWNlbWVudFR5cGVzKTogYW55IHtcbiAgICBsZXQgdG9wID0gMDtcbiAgICBsZXQgbGVmdCA9IDA7XG5cbiAgICBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5SaWdodCkge1xuICAgICAgbGVmdCA9IC03O1xuICAgICAgdG9wID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlVmVydGljYWxDYXJldChob3N0RGltLCBlbG1EaW0sIGNhcmV0RGltZW5zaW9ucywgYWxpZ25tZW50KTtcbiAgICB9IGVsc2UgaWYgKHBsYWNlbWVudCA9PT0gUGxhY2VtZW50VHlwZXMuTGVmdCkge1xuICAgICAgbGVmdCA9IGVsbURpbS53aWR0aDtcbiAgICAgIHRvcCA9IFBvc2l0aW9uSGVscGVyLmNhbGN1bGF0ZVZlcnRpY2FsQ2FyZXQoaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlRvcCkge1xuICAgICAgdG9wID0gZWxtRGltLmhlaWdodDtcbiAgICAgIGxlZnQgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVIb3Jpem9udGFsQ2FyZXQoaG9zdERpbSwgZWxtRGltLCBjYXJldERpbWVuc2lvbnMsIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkJvdHRvbSkge1xuICAgICAgdG9wID0gLTc7XG4gICAgICBsZWZ0ID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlSG9yaXpvbnRhbENhcmV0KGhvc3REaW0sIGVsbURpbSwgY2FyZXREaW1lbnNpb25zLCBhbGlnbm1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB7IHRvcCwgbGVmdCB9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIGNvbnRlbnRcbiAgICpcbiAgICogQG1lbWJlck9mIFBvc2l0aW9uSGVscGVyXG4gICAqL1xuICBzdGF0aWMgcG9zaXRpb25Db250ZW50KHBsYWNlbWVudCwgZWxtRGltLCBob3N0RGltLCBzcGFjaW5nLCBhbGlnbm1lbnQpOiBhbnkge1xuICAgIGxldCB0b3AgPSAwO1xuICAgIGxldCBsZWZ0ID0gMDtcblxuICAgIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlJpZ2h0KSB7XG4gICAgICBsZWZ0ID0gaG9zdERpbS5sZWZ0ICsgaG9zdERpbS53aWR0aCArIHNwYWNpbmc7XG4gICAgICB0b3AgPSBQb3NpdGlvbkhlbHBlci5jYWxjdWxhdGVWZXJ0aWNhbEFsaWdubWVudChob3N0RGltLCBlbG1EaW0sIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkxlZnQpIHtcbiAgICAgIGxlZnQgPSBob3N0RGltLmxlZnQgLSBlbG1EaW0ud2lkdGggLSBzcGFjaW5nO1xuICAgICAgdG9wID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlVmVydGljYWxBbGlnbm1lbnQoaG9zdERpbSwgZWxtRGltLCBhbGlnbm1lbnQpO1xuICAgIH0gZWxzZSBpZiAocGxhY2VtZW50ID09PSBQbGFjZW1lbnRUeXBlcy5Ub3ApIHtcbiAgICAgIHRvcCA9IGhvc3REaW0udG9wIC0gZWxtRGltLmhlaWdodCAtIHNwYWNpbmc7XG4gICAgICBsZWZ0ID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlSG9yaXpvbnRhbEFsaWdubWVudChob3N0RGltLCBlbG1EaW0sIGFsaWdubWVudCk7XG4gICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkJvdHRvbSkge1xuICAgICAgdG9wID0gaG9zdERpbS50b3AgKyBob3N0RGltLmhlaWdodCArIHNwYWNpbmc7XG4gICAgICBsZWZ0ID0gUG9zaXRpb25IZWxwZXIuY2FsY3VsYXRlSG9yaXpvbnRhbEFsaWdubWVudChob3N0RGltLCBlbG1EaW0sIGFsaWdubWVudCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgdG9wLCBsZWZ0IH07XG4gIH1cblxuICAvKipcbiAgICogRGV0ZXJtaW5lIHBsYWNlbWVudCBiYXNlZCBvbiBmbGlwXG4gICAqXG4gICAqIEBtZW1iZXJPZiBQb3NpdGlvbkhlbHBlclxuICAgKi9cbiAgc3RhdGljIGRldGVybWluZVBsYWNlbWVudChwbGFjZW1lbnQ6IFBsYWNlbWVudFR5cGVzLCBlbG1EaW06IERPTVJlY3QsIGhvc3REaW06IERPTVJlY3QsIHNwYWNpbmc6IG51bWJlcik6IGFueSB7XG4gICAgY29uc3Qgc2hvdWxkRmxpcCA9IFBvc2l0aW9uSGVscGVyLnNob3VsZEZsaXAoaG9zdERpbSwgZWxtRGltLCBwbGFjZW1lbnQsIHNwYWNpbmcpO1xuXG4gICAgaWYgKHNob3VsZEZsaXApIHtcbiAgICAgIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlJpZ2h0KSB7XG4gICAgICAgIHJldHVybiBQbGFjZW1lbnRUeXBlcy5MZWZ0O1xuICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkxlZnQpIHtcbiAgICAgICAgcmV0dXJuIFBsYWNlbWVudFR5cGVzLlJpZ2h0O1xuICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLlRvcCkge1xuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMuQm90dG9tO1xuICAgICAgfSBlbHNlIGlmIChwbGFjZW1lbnQgPT09IFBsYWNlbWVudFR5cGVzLkJvdHRvbSkge1xuICAgICAgICByZXR1cm4gUGxhY2VtZW50VHlwZXMuVG9wO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwbGFjZW1lbnQ7XG4gIH1cbn1cbiJdfQ==