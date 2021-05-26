import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { PrimitiveTypes } from '../../../../../src/utilities/helper-types';
import { customTypeOf } from '../../../../../src/utilities/object-utilities';

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
