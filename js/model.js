// Object model for the list items
function Item(text) {
  this.text = text || '';
  this.index = -1;
}

// Object model for the List
function List() {
  var self = this;
  self.list = [];

  self.add = function(item) {
    item.index = self.list.length;
    self.list.push(item);
  };

  self.get = function(identifier) {
    if( typeof( identifier ) === 'number' ) {
      return self.list[identifier];
    } else {
      for(var i = 0; i < self.list.length; i++ ) {
        if(self.list[i].text === identifier ) {
          return self.list[i];
        }
      }
    }
  };

  self.count = function() {
    return self.list.length;
  }

  self.remove = function(item) {
    var index = self.list.indexOf(item);
    if(index > -1 ) {
      self.list.splice(index, 1);
    }
  }

  function reindex() {
    for(var i = 0; i < self.list.length; i++) {
      self.list[i].index = i;
    }
  }

  self.clear = function() {
    self.list.length = 0;
  }
}
