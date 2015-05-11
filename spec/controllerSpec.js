describe('Controller', function() {
  var itemsList = document.getElementById('itemsList');
  var itemsCounter = document.getElementById('itemsCounter');

  it('addItem create a new LI element', function() {
    var initialItems = itemsList.childNodes.length;
    controller.addItem( new Item('Tomatoes') );
    expect(itemsList.childNodes.length).toBeGreaterThan(initialItems);
  });

  it('addItem create a new Model Item element', function() {
    var initialItems = controller.list.count();
    controller.addItem( new Item('Yogurt') );
    expect(controller.list.count()).toBeGreaterThan(initialItems);
  });

  it('addItem update items counter', function() {
    var initialItems = parseInt(itemsCounter.innerHTML);
    controller.addItem( new Item('Oranges') );
    expect(parseInt(itemsCounter.innerHTML)).toBeGreaterThan(initialItems);
  });

  it('removeItem remove LI element', function() {
    var initialItems = itemsList.childNodes.length;

    var item = self.list.get('Oranges');
    var li;

    for( var i = 0; i < itemsList.children.length; i++ ) {
      if( itemsList.children[i].dataset.identifier === item.text ) {
        li = itemsList.children[i];
      }
    }

    controller.removeItem( item, li );
    expect(itemsList.childNodes.length).toBeLessThan(initialItems);
  });

  it('removeItem remove Model Item element', function() {
    var initialItems = controller.list.count();
    var item = self.list.get('Tomatoes');
    var li;

    for( var i = 0; i < itemsList.children.length; i++ ) {
      if( itemsList.children[i].dataset.identifier === item.text ) {
        li = itemsList.children[i];
      }
    }

    controller.removeItem( item, li );
    expect(controller.list.count()).toBeLessThan(initialItems);
  });

  it('removeItem update items counter', function() {
    var initialItems = parseInt(itemsCounter.innerHTML);
    var item = self.list.get('Yogurt');
    var li;

    for( var i = 0; i < itemsList.children.length; i++ ) {
      if( itemsList.children[i].dataset.identifier === item.text ) {
        li = itemsList.children[i];
      }
    }

    controller.removeItem( item, li );
    expect(parseInt(itemsCounter.innerHTML)).toBeLessThan(initialItems);
  });

});
