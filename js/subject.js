// this file contains the implementation of the Observer pattern, it has the
// Subject Object to subscribe and unscubscribe, and the Observer element to
// encapsulte the notifications.

/****************************************
* this is the subject definition object
****************************************/

function Subject() {
  this.observers = [];
}

// subscribe observer are added to the list and their subject is set
Subject.prototype.subscribe = function( observer ) {
  this.observers.push( observer );
  observer.setSubject( this );
};

// unsubscribe the observer and reset the subject
Subject.prototype.unsubscribe = function( observer ) {
  observer.subject = '';
  var index = this.observers.indexOf(observer);
  if( index > -1 ) {
    this.observers.splice(index, 1);
  }
};

// return the number of subscribed elements
Subject.prototype.count = function() {
  return this.observers.length;
};

// receive action informs from the observers
Subject.prototype.inform = function(actionId, args, scope) {
  this.lastAction = actionId;
  this.notify(actionId, args, scope);
}

Subject.prototype.notify = function(actionId, args, scope) {
  // notify the observer of the action
  this.observers.map(function(observer) {
    if( observer !== scope ) {
      observer.execute(actionId, args, scope);
    }
  });
}

/****************************************
* this is the observer definition object
****************************************/

function Observer() {
  this.actions = {};
  this.lastActionId = '';
  this.subject = '';
}


// set the subject of the observer
Observer.prototype.setSubject = function(subject) {
  this.subject = subject;
}

// register actions into the observer
Observer.prototype.register = function( actionId, fn ) {
  this.actions[actionId] = fn;
};

// unregister actions of the observer
Observer.prototype.unregister = function( actionId) {
  var index = this.actions.indexOf(actionId);
  if( index > -1 ) {
    this.actions.splice(index, 1);
  }
}

// get the last executed action
Observer.prototype.getLastAction = function( ) {
  return this.lastActionId;
}

// execute observer action
Observer.prototype.execute = function( actionId, args, scope ) {
  // set the scope of the action
  scope = scope || this;
  this.lastActionId = actionId;

  // action exist?
  if( this.actions[actionId] ) {
    //execute the regitered action
    this.actions[actionId].apply( scope, args );
  }

  // scope is different from the executed action notify other elements
  if( scope === this ) {
    if( this.subject ) {
      this.subject.inform( actionId, args, scope );
    }
  }

};
