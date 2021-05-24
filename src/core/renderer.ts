import {defaultEntity, Entities, Rendered} from "./entities";
import {extendTypeOf} from "../utilities/object-utilities";

export type RenderFunctions<T> = {
  String: (key: string, value: string) => T,
  Number: (key: string, value: number) => T
  Boolean: (key: string, value: boolean) => T
  Array: <U>(key: string, value: U) => T
  Object: <U>(key: string, value: U) => T
  Date: (key: string, value: Date) => T
  // Array: (key: string, value: array) => T
  // Object: (key: string, value: object) => T
  // :(key: string, value: string) => string,
  // [key: string]: string;

}
//TODO helper props gebruiken

type Renderer<RenderData, RenderOutput> = {
  data: RenderData
  render: ((callback: RenderFunctions<RenderOutput>) => RenderOutput[])
}
export const Renderer = <RenderData, RenderOutput>(data: RenderData): Renderer<RenderData, RenderOutput> => {
  return {
    data: data,
    render: function (this: Renderer<RenderData, RenderOutput>, callback: RenderFunctions<RenderOutput>): RenderOutput[] {
      return useCallback(this.data, callback);
    }
  }
}

const useCallback = function <RenderData, T>(data: RenderData, callback: RenderFunctions<T>) {
  return Object.keys(data).map(function (key , index) {
    const value = data[key as keyof RenderData]  // Why does this work while data[key] should work as well.  Does .map and .foreach loose info of key? or Doesn't compiler know that keys of given object is a string
    switch (extendTypeOf(value)) {
      case "string":
        return callback.String(key, String(value));
      case "number":
        return callback.Number(key, Number(value));
      case "boolean":
        return callback.Boolean(key, Boolean(value));
      case "array":
        return callback.Array(key,Renderer(value).render(callback))
      case "object":
        return callback.Object(key,Renderer(value).render(callback))
      case "date":
        return callback.Date(key, new Date(String(value)));
      default:
        throw `Unsupported type - ${extendTypeOf(value)}`;
    }
  })

  // return Object.keys(data).forEach(key => {
  //    switch(extendTypeOf(value)){
  //      case "string":
  //        return callback.String(key,value);
  //      case "number":
  //        return callback.Number(key,value);
  //      case "boolean":
  //        return callback.Boolean(key,value);
  //      case "object":
  //      //   return callback.Nested(key,Renderer(this.data[key]).render(callback))
  //
  //      // if(this.data[key] instanceof Date){
  //      //   // callback.Date(key,this.data[key])
  //      // }
  //      //Other cases such as array,object etc.
  //      // if(this.data[key] instanceof Array){
  //      // }
  //
  //      default:
  //        throw "Unsupported type";
  //    }
  //    // console.log(key)
  //    // return callback[extendTypeOf(this.data[key])](key,this.data[key])
  //
  //  })
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


