var Imagine = require('../../src/imagine.js');
var imagine = new Imagine();
var obj = {};
describe('component/object', function(){
  beforeEach(function(){
    imagine.reset();
    obj = imagine.register({});
  });
  describe('addComponent', function(){
    it('should be defined', function(){
      expect(obj.addComponent).toBeDefined();
    });
    it('should error if passed in nothing', function(){
      expect(function(){obj.addComponent();}).toThrow(new Error('component undefined'));
    });
    it('should return the component', function(){
      var com = obj.addComponent({com:'test'});
      expect(com.com).toBe('test');
    });
    iit('should set a reference to the object', function(){
      expect(obj.addComponent({}).object).toBe(obj);
    });
  });
});
