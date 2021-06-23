import { useState } from "react";
import './form-item.scss';
import { deepCopy, getKeys, isPrimitive, PrimitiveTypes } from "typesafe-form-builder";
import { FormPrimitiveInput } from "./form-primitive-input";

type FormItemProps<Item extends PrimitiveTypes | Object> = {
    item: Item,
    onItemChange: <R>(item: Item) => R | void
}

export function FormItem <Item extends PrimitiveTypes | Object>(props: FormItemProps<Item>) {
    const [item, setItem] = useState(props.item);

    /**
     * Called when the item is modified.
     * Updates the state and executes callback with new value.
     * @param newItem 
     */
    const onItemChange = (newItem: Item) => {
        props.onItemChange(newItem);
        setItem(newItem);
    }

    /**
     * Called when item is an object, and one of its properties is modified.
     * @param itemObj the current item.
     * @param prop the prop whose value was modified.
     * @param value the new value of the given property.
     */
    const onItemPropChange = <ItemObj extends Object & Item>(itemObj: ItemObj, prop: keyof ItemObj, value: ItemObj[typeof prop]) => {
        const newItemObj = deepCopy(itemObj);
        newItemObj[prop] = value;
        onItemChange(newItemObj);
    }

    /**
     * Called when item is an array, and one of its elements is modified.
     * @param itemArr the current item.
     * @param index index of the element that was changed.
     * @param value new value for the given index.
     */
    const onArrayElementChange = <Element, ItemArr extends Array<Element> & Item>(itemArr: ItemArr, index: number, value: Element) => {
        const newItemArr = deepCopy(itemArr);
        newItemArr[index] = value;
        onItemChange(newItemArr);
    }

    if (isPrimitive(item))
        return <FormPrimitiveInput value={item} onValueChange={onItemChange} />
    else if (item instanceof Array)
        return <>
        <br/>
        <ul className="array">
            {item.map((arrayItem, i) => <li key={i}>
                {item.length > 1 ? <span className="num">{i+1}</span> : null}
                <FormItem item={arrayItem} onItemChange={newArrayItem => onArrayElementChange(item, i, newArrayItem)} />
            </li>)}
        </ul>
        </>
    else if (item instanceof Object)
        return <div className="object">
            {getKeys(item).map(key => 
            <div key={String(key)} className="keyValue">
                <label>{key}</label>
                <FormItem item={item[key]} onItemChange={(newItem) => onItemPropChange(item, key, newItem)}/>
            </div>)}
        </div>
    return <span>Form Item</span>
}
