// This file include the observer specs
describe('Observer',function(){
  var observer = new Observer();
  var message = '';

  it('should be able to register actions', function() {
    var changeMessageText = function( text ) {
      message = text;
    };
    observer.register('changeMessageText',changeMessageText);
    expect(observer.actions['changeMessageText']).toBe(changeMessageText);
  });

  it('should be able to execute actions', function() {
    expect(message.length).toBe(0);
    observer.execute('changeMessageText',['new text']);
    expect(message).toBe('new text');
  });
});

describe('Subject',function() {
  var subject = new Subject();;
  var message = "";
  var observer;

  it('should be able to subscribe Observer', function() {
    observer = new Observer();
    subject.subscribe( observer );
    expect(subject.count()).toBe( 1 );
  });

  it('should be able to unsubscribe Observer', function() {
    subject.unsubscribe( observer );
    expect(subject.count()).toBe( 0 );
  });

  it('should be able to broadcast Notifications', function() {
    var observer1 = new Observer();

    subject.subscribe( observer1 );
    var updateMessage = function(text) {
      message = text;
    };
    observer1.register('update', updateMessage );

    subject.subscribe(observer1);

    var observer2 = new Observer();
    subject.subscribe(observer2);

    expect(observer2.getLastAction()).toBe( '' );
    observer1.execute('update', ['Another message']);

    expect(observer2.getLastAction()).toBe( 'update' );

  });

});
