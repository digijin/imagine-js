'use strict';

// import _ from 'underscore';
console.log("imagine.js");

export default class Imagine {
  constructor(params) {
    this.objects = [];

    this.engine = require('./imagine/engine.js');

    return Imagine.process(params);
  }
  process(params) {

  }
}

window.Imagine = Imagine;
