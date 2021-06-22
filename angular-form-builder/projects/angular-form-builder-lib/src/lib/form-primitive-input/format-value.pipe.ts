import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PrimitiveTypes } from 'typesafe-form-builder';
import { customTypeOf } from 'typesafe-form-builder';

@Pipe({
    name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

    /**
     * Transforms a primitive data to a correctly formatted string to
     * be used as value for an input element.
     * Mostly to ensure date's are formatted correctly.
     * @param value primitive data to be formatted.
     * @returns formatted data in the form of a string.
     */
    transform(value: PrimitiveTypes): string {
        if (customTypeOf(value, 'date'))
            return formatDate(value, 'yyyy-MM-dd', 'en-US');
        return String(value);
    }

}
