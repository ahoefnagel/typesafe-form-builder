import { KeyValue } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { customTypeOf, PrimitiveTypes, isPrimitive } from 'typesafe-form-builder';

@Component({
    selector: 'lib-form-item[item]',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent<Item extends PrimitiveTypes | Object> implements OnInit {

    @Input() item: Item = null!; // Angular guarantees that item will have a value when the component is initialized because of the @Input decorator.
    @Output() itemChange: EventEmitter<Item> = new EventEmitter<Item>();

    constructor() { }

    ngOnInit(): void {
    }

    onItemChange(newItem: Item) {
        this.item = newItem;
        this.itemChange.emit(newItem);
    }

    onItemPropChange(prop: keyof Item, value: Item[typeof prop]) {
        this.item[prop] = value;
    }

    propTrackByFn<K, V>(index: number, keyVal: KeyValue<K, V>) {
        return index;
    }

    isPrimitive = isPrimitive;

    customTypeOf = customTypeOf;

    isArray = <ArrEllement extends Item>(val: any): val is Array<ArrEllement> => customTypeOf(val, "array");

}
