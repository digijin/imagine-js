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
    it('should return nothing if there is nothing', function(){
      obj.addComponent({type: 'nothing'});
      expect(obj.getComponent('test')).not.toBeDefined();
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
  describe('removeTag', function(){
    it('should remove the tag', function(){
      expect(obj.hasTag("swag")).toBe(false);
      obj.addTag('pimp');
      obj.addTag('swag');
      obj.addTag('yolo');
      expect(obj.hasTag("swag")).toBe(true);
      obj.removeTag('swag');
      expect(obj.hasTag("swag")).toBe(false);
    });
    it('should do nothing if there is no tag', function(){
      obj.addTag('abc');
      obj.addTag('def');
      obj.removeTag('swag');
      expect(obj.tags.length).toBe(2);
    });
  });
  describe('notify', function(){
    it('should notify all components on object', function(){
      var com = {myfunc:function(){}};
      spyOn(com, "myfunc");
      obj.addComponent(com);
      obj.addComponent({});
      obj.addComponent({myfunc:'not a function'});
      obj.notify('myfunc');
      expect(com.myfunc).toHaveBeenCalled();
    });
    it('should have the right scope', function(){
      var com = {};
      com.myfunc = function(){expect(this).toBe(com);};
      obj.addComponent(com);
      obj.notify('myfunc');
    });
  });
});
