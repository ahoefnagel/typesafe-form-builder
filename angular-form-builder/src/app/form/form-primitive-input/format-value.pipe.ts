import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PrimitiveTypes } from 'typesafe-form-builder';
import { customTypeOf } from 'typesafe-form-builder';

@Pipe({
    name: 'formatValue'
})
export class FormatValuePipe implements PipeTransform {

    transform(value: PrimitiveTypes): string {
        if (customTypeOf(value, 'date'))
            return formatDate(value, 'yyyy-MM-dd', 'en-US');
        return String(value);
    }

}
