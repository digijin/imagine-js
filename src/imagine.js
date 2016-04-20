'use strict';

const utils = require('./imagine/utils.js');
const objectFunctions = require('./imagine/object.js');
const _ = require('lodash');

class Imagine {
  constructor(params) {
    this.objects = [];
    this.register(params);
  }
  // enable object to be tracked by Imagine
  register(params) {
   if (utils.isArray(params)) {
     let i = 0;

     while (i < params.length) {
       this.register(params[i]);//recurse
       i++;
     }
   } else {

     if (utils.isElement(params)) {
       let el = new Imagine.Element(params);
       var out = this.process({}).addComponent(el);
     } else {
       var out = this.registerObject(params);
     }
   }
   return out;
 }
 //private
 registerObject(object){
   _.assign(object, objectFunctions);
   this.objects.push(object);
   return object;
 }
 reset(){
   this.objects = [];
 }

 destroy(obj){
   for(let obj in this.objects){
     const ind = this.objects.indexOf(obj);
     this.objects.splice(ind, 1);
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
}
module.exports = Imagine;
