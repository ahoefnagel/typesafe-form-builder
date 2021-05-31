import {Renderer, RenderFunctions} from "../core/renderer";
import {getKeys} from "./object-utilities";

const createDate = function(date:Date):string {
  const month = (date.getMonth()+1) < 10? "0" + (date.getMonth()+1) : date.getMonth()+1
  return `${date.getFullYear()}-${month}-${date.getDate()}`
}


export const renderToString:RenderFunctions<string> = {
  string: function <K>(key:K , value: string):string {return `${key}: ${value}`},
  number: function <K>(key:K, value: number):string { return `${key}: ${value}`},
  boolean: function  <K>(key: K, value: boolean):string { return `${key}: ${value}`},
  date: function  <K>(key: K, value: Date):string { return `${key}: ${createDate(value)}`},
  object: function <T,K>(key: K, value:T):string {
    let res = ""
    getKeys(value).forEach(key => res += '\n' + value[key])
    return res
  },
  array: function <T,K>(key: K, value:T[]):string {
    let res = ""
    value.forEach(v => res += v)
    return `${key} ${res}`}
}

export const renderToHtml:RenderFunctions<string> = {
  string: function <K>(key:K , value: string):string {return `<p><label>${key}</label><input type="text" id="${key}" value="${value}"</p>`},
  number: function <K>(key:K, value: number):string { return `<p><label>${key}</label><input type="number" id="${key}" value="${value}"</p>`},
  boolean: function  <K>(key: K, value: boolean):string { return `<p><label>${key}</label><input type="checkbox" id="${key}" value="${value}"</p>`},
  date: function  <K>(key: K, value: Date):string { return `<p><label>${key}</label><input type="date" id="${key}" value="${createDate(value)}"</p>`},
  object: function <T,K>(key: K, value:T):string {
    let res = "<li>"
    getKeys(value).forEach(key => res +=  `<ul> ${value[key]}</ul>`)
    return res + "</li>"
  },
  array: function <T,K>(key: K, value:T[]):string {
    let res = ""
    value.forEach(v => res += v)
    return `<p>${key}</p>${res}`}
}
