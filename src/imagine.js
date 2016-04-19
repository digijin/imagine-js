'use strict';

let utils = require('./imagine/utils.js');

class Imagine {
  constructor(params) {
    this.objects = [];
    this.process(params);
  }
  process(params) {
   if (Array.isArray(params)) {
     let i = 0;

     while (i < params.length) {
       this.process(params[i]);//recurse
       i++;
     }
   } else {

     if (utils.isElement(params)) {
       let el = new Imagine.Element(params);
       var out = this.process({}).addComponent(el);
     } else {
       var out = this.register(params);
     }
   }
   return out;
 }
 register(object){
   this.objects.push(object);
 }
 reset(){
   this.objects = [];
 }
 addEvent(element, eventName, callback) {
   if(element.addEventListener){
     element.addEventListener(eventName, callback, false);
   }else if(element.attachEvent){
     element.attachEvent('on'+eventName, callback);
   }else{
     element["on"+eventName] = callback;
   }
 }
 getComponent(name){
   for(let obj of this.objects){
     const com = obj.getComponent(name);
     if(com){
       return com;
     }
   }
 }
 getComponents(name){
   let out = [];
   for(let obj of this.objects){
     com = obj.getComponent(name);
     if(com){
       out.push(com);
     }
   }
   return out;
 }
 notify(func){
   for(let obj of this.objects){
     obj.notify(func);
   }
 }
 destroy(obj){
   for(let obj in this.objects){
     const ind = this.objects.indexOf(obj);
     this.objects.splice(ind, 1);
   }
 }
}
module.exports = Imagine;
