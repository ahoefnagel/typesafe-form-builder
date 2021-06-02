import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// type Item = PrimitiveTypes | Array<Item> | Object;
type Item = any;

@Component({
    selector: 'lib-form-item[item]',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent implements OnInit {

    @Input() item: Item = 0;
    @Output() itemChange: EventEmitter<Item> = new EventEmitter<Item>();

    constructor() { }

    ngOnInit(): void {
    }

    onItemChange(newItem: Item) {
        this.item = newItem;
        this.itemChange.emit(newItem);
    }

    onItemPropChange(prop: any, value: Item[typeof prop]) {
        this.item[prop] = value;
    }

    propTrackByFn<K, V>(index: number, keyVal: KeyValue<K, V>) {
        return index;
    }

    isPrimitive<InputType>(val: InputType): boolean {
        return !(val instanceof Object) || val instanceof Date
    }

    isArray<InputType>(val: InputType): boolean {
        return val instanceof Array;
    }

    isObject<InputType>(val: InputType): boolean {
        return (val instanceof Object) && !(val instanceof Date) && !(val instanceof Array);
    }

}
