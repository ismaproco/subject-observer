describe('List', function() {

  var list = new List();
  var item = new Item('Carrot');

  it('should get items by name', function() {
    list.add( item );
    expect(list.get('Carrot') ).toBe( item );
  });


  it('should get items by index', function() {
    expect(list.get(0) ).toBe( item );
  });


  it('should add items to the List', function() {
    list.add( new Item('Fish') );
    expect(list.count() ).toBeGreaterThan(0);
  });

  it('should remove items from the List', function() {
    list.remove(list.get('Carrot'));
    expect(typeof( list.get('Carrot') ) ).toBe('undefined');
  });

  it('should get the number of items in the list', function() {

    list.clear();
    expect(list.count() ).toBe(0);

    list.add( new Item('Milk') );
    expect(list.count() ).toBe(1);

    list.add( new Item('Pears') );
    list.add( new Item('Bread') );
    expect(list.count() ).toBe(3);

    list.remove(list.get(0));
    list.remove(list.get('Pears'));
    expect(list.count() ).toBe(1);

  });
});
