import { KeyValue } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { customTypeOf, PrimitiveTypes, isPrimitive } from 'typesafe-form-builder';

@Component({
    selector: 'lib-form-item[item]',
    templateUrl: './form-item.component.html',
    styleUrls: ['./form-item.component.scss']
})
export class FormItemComponent<Item extends PrimitiveTypes | Object> {

    @Input() item: Item = null!; // Angular guarantees that item will have a value when the component is initialized because of the @Input decorator.
    @Output() itemChange: EventEmitter<Item> = new EventEmitter<Item>();

    /**
     * If `item` contains a primitive value, this callback will be called when
     * it changes.
     * The parent element will then be notified through the event emitter.
     * @param newItem new value for item.
     */
    onItemChange(newItem: Item) {
        this.item = newItem;
        this.itemChange.emit(newItem);
    }

    /**
     * If `item` is an object, this callback will be called when the value of
     * one of its properties changes.
     * @param prop the key of the property that changed.
     * @param value the new value belonging to that property.
     */
    onItemPropChange(prop: keyof Item, value: Item[typeof prop]) {
        this.item[prop] = value;
    }

    /**
     * Used when rendering object keys with an ngFor loop.
     * If this is not used the input field loses focus everytime
     * a character is entered by the user.
     * source: https://stackoverflow.com/a/46565538
     */
    propTrackByFn<K, V>(index: number, keyVal: KeyValue<K, V>) {
        return index;
    }

    /**
     * isPrimitive function as property of this component so it can be used
     * in the Angular template.
     *
     * @memberof FormItemComponent
     */
    isPrimitive = isPrimitive;

    /**
     * customTypeOf function as property of this component so it can be used
     * in the Angular template.
     *
     * @memberof FormItemComponent
     */
    customTypeOf = customTypeOf;

    /**
     * Wrapper of customTypeOf function for checking the type of array.
     * Added as property so it can be used in the Angular template.
     * @param val value that will be checked whether it's an array.
     * @returns true if val is an array, otherwise false.
     */
    isArray = <ArrEllement extends Item>(val: any): val is Array<ArrEllement> => customTypeOf(val, "array");

}
