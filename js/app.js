// Controller of the application
function Controller() {
  self = this;
  // get the html elements of the page
  var itemText = document.getElementById('itemText');
  var addButton = document.getElementById('addButton');
  var itemsList = document.getElementById('itemsList');
  var itemsCounter = document.getElementById('itemsCounter');

  // ***********************************
  // Model Operations

  // create the application list
  self.list = new List();

  // create a subject to manage the application observers
  var subject = new Subject();

  // create observers for the page elements
  var ulObserver = new Observer();
  subject.subscribe( ulObserver );

  var listObserver = new Observer();
  subject.subscribe(listObserver);

  var counterObserver = new Observer();
  subject.subscribe(counterObserver);

  //function to execute to add a list item to the model
  self.addListItem = function (item) {
    self.list.add( item );
  };

  // function to execute to remove a model element
  self.removeListElement = function (item) {
    self.list.remove(item);
  };

  // register the function with the observer
  listObserver.register('addListItem', self.addListItem );
  listObserver.register('removeListElement', self.removeListElement );

  // ***********************************
  // DOM Operations

  //function to execute to add a list item to the DOM
  self.addLiDOMItem = function(item) {
    var li = document.createElement('li');
    var content = document.createElement('span');
    content.innerHTML = item.text;

    var button = document.createElement('input');
    button.type = 'button';
    button.value = 'Delete';

    button.dataset.identifier = item.text;
    li.dataset.identifier = item.text;
    
    li.appendChild(content);
    li.appendChild(button);
    itemsList.appendChild(li);
  };

  self.removeLiDOMItem = function(item,li) {
    itemsList.removeChild(li);
  };

  //register the function with the observer
  ulObserver.register('addListItem', self.addLiDOMItem );
  ulObserver.register('removeListElement', self.removeLiDOMItem );

  //function to update the counter of items
  self.updateCounter = function () {
    itemsCounter.innerHTML = self.list.count();
  };

  // register the function with the observer
  counterObserver.register('addListItem', self.updateCounter );
  counterObserver.register('removeListElement', self.updateCounter );

  // ***********************************
  // Action Listener

  // addEvent listener to the addButton
  addButton.addEventListener('click',function() {
    if( itemText.value.trim().length > 0 )
    {
      if( typeof( self.list.get(itemText.value) ) === 'undefined' ) {
        self.addItem(new Item(itemText.value));
        itemText.value = '';
      }
    }
  });

  // add event listener to the ul using bubblig to get the button action
  itemsList.addEventListener('click',function(evt){
    if( evt.srcElement.type === "button" ) {
      var item = self.list.get(evt.srcElement.dataset.identifier);
      var li = evt.srcElement.parentNode;
      // call the controller method
      self.removeItem( item, li );
    }
  }, true);

  // ***********************************
  // controller exposed operations

  self.addItem = function (item) {
    listObserver.execute( 'addListItem', [item] );
  }

  self.removeItem = function removeItem(item,li) {
    listObserver.execute('removeListElement',[ item, li ]);
  }

  // ***********************************
  // init
  self.init = function() {
    // add element by default
    self.addItem(new Item('Carrots'));
    self.addItem(new Item('Pears'));
    self.addItem(new Item('Fish'));
    self.addItem(new Item('Milk'));
    self.addItem(new Item('Bread'));

    //execute the updateCounter in init.
    self.updateCounter();
  }
}

var controller = new Controller();
controller.init();
