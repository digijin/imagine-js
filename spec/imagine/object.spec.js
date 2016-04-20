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
      expect(com.hasTag).toBeDefined();
      expect(com.removeTag).toBeDefined();
      expect(com.notify).toBeDefined();
    });
    it('should call start on component', function(){
      var com = {start:function(){}};
      spyOn(com, 'start');
      obj.addComponent(com);
      expect(com.start).toHaveBeenCalled();
    });
  });
  describe('getComponent', function(){
    it('should find a component by type', function(){
      obj.addComponent({type: 'test'});
			expect(obj.getComponent('test')).toBeDefined();
    });
  });
  describe('addTag', function(){
    it('should add a tag', function(){
      expect(obj.tags.length).toBe(0);
      obj.addTag("swag");
      expect(obj.tags.length).toBe(1);
    });
  });
  describe('hasTag', function(){
    it('should return true if object has a tag', function(){
      obj.addTag("swag");
      expect(obj.hasTag('swag')).toBe(true);
    });
    it('should return false if object doesnt have a tag', function(){
      expect(obj.hasTag('swag')).toBe(false);
    });
  });
});
