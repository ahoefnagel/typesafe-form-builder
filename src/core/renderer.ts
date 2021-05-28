import {Entities, Rendered} from "./entities";
import {customTypeOf, extendTypeOf, getKeys} from "../utilities/object-utilities";
export type RenderFunctions<T> = {
  string:  <K>(key: K, value: string) => T,
  number: <K>(key: K, value: number) => T
  boolean: <K>(key: K, value: boolean) => T
  date: <K>(key: K, value: Date) => T
  array: <U,K>(key: K, value: U[]) => T
  object: <U,K>(key: K, value: U) => T

} 
type Renderer<RenderData extends Object,RenderOutput> = {
  data: RenderData
  render: ((callback: RenderFunctions<RenderOutput>) => RenderOutput[])
}

export const Renderer = <RenderData ,RenderOutput>(data:RenderData): Renderer<RenderData,RenderOutput> => {
  return {
    data: data,
    render: function (this: Renderer<RenderData,RenderOutput>, callback:RenderFunctions<RenderOutput>):RenderOutput[] {
      return getKeys(this.data).map(key => {
        const value = this.data[key];
        if (customTypeOf(value, "string")){
          return callback.string(key,value);
        }
        else if (customTypeOf(value, "number")){
          return  callback.number(key,value);
        }
        else if (customTypeOf(value, "boolean")){
          return  callback.boolean(key,value);
        }
        else if (customTypeOf(value, "date")){
          return callback.date(key,value);
        }
        else if (customTypeOf(value, "array")) {
          return callback.array(key,  Renderer(value).render(callback));
        }
        else if (customTypeOf(value, "object")){
          return callback.object(key, Renderer(value).render(callback));

        }
        else
            throw "Unsupported type"
      })
    }
  }
}



///
// const value = this.data[key]
// callback[typeof(value)](key,value)
// ----
// const type = typeof(value)
// callback[type !== "object"?type:objectHandler(value)](key,value)
//

// of
///
// Object.keys(this.data).forEach(key => {
//   switch(typeof(this.data[key])){
//     case "string":
//       callback(key,this.data[key],"string");
//       break;
//     case "number":
//       callback(key,this.data[key],"number");
//       break;
//     case "boolean":
//       callback(key,this.data[key],"boolean");
//       break;
//     case "object":
//     //Other cases such as array,Date etc.
//      // Checks:
//       callback(key,this.data[key],"array");
//       callback(key,this.data[key],"Date");
//       callback(key,this.data[key],"object");
//     // Renderer(this.data[key]).render(callback)
//     default:
//       throw "Unsupported type";
//   }
// })



// Uitzoeken of Functie of object?
//
/// Generate HTML op basis van react of angular specs html?
// Callback, based?

// render(callback){
// Object.keys(this.data).forEach(prop => callback(prop) )
// }
// callback generates the html
// renderer(print)

function deepCopy(obj: any): any {
  let clonedObj: any
  if (obj instanceof Array) {
    clonedObj = []
    for (let i = 0, len = obj.length; i < len; i++) {
      (typeof (obj[i]) === "object") ? clonedObj[i] = deepCopy(obj[i]) : clonedObj[i] = obj[i];
    }
    return clonedObj;
  }
  if (obj instanceof Object) {
    clonedObj = {}
    Object.keys(obj).forEach(key => {
      (typeof (obj[key]) === "object") ? clonedObj[key] = deepCopy(obj[key]) : clonedObj[key] = obj[key];
    })
    return clonedObj;
  }
}
