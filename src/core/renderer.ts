import {Entities, Rendered} from "./entities";
import {extendTypeOf} from "../utilities/object-utilities";
export type RenderFunctions<T> = {
  String:  (key: string, value: string) => T,
  Number: (key: string, value: number) => T
  Boolean: (key: string, value: boolean) => T
  // Nested: <U>(key: string, value: U) => T
  // Date: (key: string, value: Date) => T
  // Array: (key: string, value: array) => T
  // Object: (key: string, value: object) => T
  // :(key: string, value: string) => string,
  // [key: string]: string;

}
//TODO helper props gebruiken

type Renderer<RenderData extends Object,RenderOutput> = {
  data: RenderData
  render: ((callback: RenderFunctions<RenderOutput>) => void)
}

export const Renderer = <RenderData ,RenderOutput>(data:RenderData): Renderer<RenderData,RenderOutput> => {
  return {
    data: data,
    render: function (this: Renderer<RenderData,RenderOutput>, callback:RenderFunctions<RenderOutput>): void {
      return Object.keys(this.data).forEach(key => {
        switch(extendTypeOf(this.data[key])){
          case "string":
            return callback.String(key,this.data[key]);
          case "number":
            return callback.Number(key,this.data[key]);
          case "boolean":
            return callback.Boolean(key,this.data[key]);
          case "object":
            // if(this.data[key] instanceof Date){
            //   // callback.Date(key,this.data[key])
            // }
            //Other cases such as array,object etc.
            // if(this.data[key] instanceof Array){
            //   return callback.Nested(key,Renderer(this.data[key]).render(callback))
            // }

          default:
            throw "Unsupported type";
        }
        // console.log(key)
        // return callback[extendTypeOf(this.data[key])](key,this.data[key])

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


