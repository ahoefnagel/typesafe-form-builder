import { KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { getKeys } from 'typesafe-form-builder';

@Pipe({
    name: 'objectKeyValue'
})
export class ObjectKeyValuePipe implements PipeTransform {

    /**
     * Pipe used by the form-item template to iterate over an object's keys.
     * The behaviour of this type is similair to that of Angular's
     * KeyValuePipe (https://angular.io/api/common/KeyValuePipe),
     * but with added type safety.
     * @param obj object whose keys will be mapped.
     * @returns An array of KeyValue objects, containing the keys and values
     * of the given object.
     * This array retains the typing of each key and value.
     */
    transform = <Obj extends Object>(obj: Obj): KeyValue<keyof Obj, Obj[keyof Obj]>[] => 
        getKeys(obj).map(key => ({ key: key, value: obj[key] }));

}
