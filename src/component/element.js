const utils = require('../imagine/utils');

module.exports = class Element {
  constructor(el){
    if(!utils.isElement(el)){
      throw new Error('Not a HTML object');
    }
    this.type = 'element';
    this.tags = ['element'];
    this.raw = el;
  }
};
