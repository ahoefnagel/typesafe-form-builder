import {customTypeOf, getKeys} from "../utilities/object-utilities";
/**
 * Renderer Functions Interface
 * Callbacks are used for talking with the render function.
 */
export type RenderFunctions<T> = {
  string:  <K>(key: K, value: string) => T,
  number: <K>(key: K, value: number) => T
  boolean: <K>(key: K, value: boolean) => T
  date: <K>(key: K, value: Date) => T
  array: <U,K>(key: K, value: U[]) => T
  object: <U,K>(key: K, value: U) => T

}

/**
 * Renderer Interface
 */
type Renderer<RenderData extends Object> = {
  data: RenderData
  render: <RenderOutput>(callback: RenderFunctions<RenderOutput>) => RenderOutput[]
}
/**
 * Renderer function, creates a renderer object.
 *  @param data  - Contains the specification and its data.
 *  @param render - Render function for the renderer object, needs a callback based on the RenderFunctions interface. Will return all info from data and pass it to their respective callbacks.

 */
export const Renderer = <RenderData>(data:RenderData): Renderer<RenderData> => {
  return {
    data: data,
    render: function <RenderOutput>(this: Renderer<RenderData>, callback:RenderFunctions<RenderOutput>):RenderOutput[] {
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