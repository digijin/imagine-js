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
    it('should set a reference to the object', function(){
      expect(obj.addComponent({}).object).toBe(obj);
    });
    it('should add it to the objects componets', function(){
      expect(obj.addComponent({}).object.components.length).toBe(1);
    });
    it('should copy functions onto the component', function(){
      var com = obj.addComponent({});
      expect(com.addComponent).toBeDefined();
      expect(com.getComponent).toBeDefined();
      expect(com.addTag).toBeDefined();
      expect(com.getTag).toBeDefined();
      expect(com.hasTag).toBeDefined();
      expect(com.removeTag).toBeDefined();
      expect(com.notify).toBeDefined();
    });
    it('should call start on component', function(){
      var com = {start:function(){}};
      spyOn(com, 'start');
      obj.addComponent(com);
      expect(com.start).toHaveBeenCalled()
    });
  });
});
