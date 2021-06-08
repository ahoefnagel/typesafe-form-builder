import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { getKeys } from 'typesafe-form-builder';

@Pipe({
    name: 'objectKeyValue'
})
export class ObjectKeyValuePipe implements PipeTransform {

    transform = <Obj extends Object>(obj: Obj): KeyValue<keyof Obj, Obj[keyof Obj]>[] => 
        getKeys(obj).map(key => ({ key: key, value: obj[key] }));

}
