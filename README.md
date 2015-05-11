# GFT JavaScript Test

This is the explanation of the development process I performed to complete
the project.

- The first thing was to understand what I been asking to do,
and the constraints I have.

# Problem understanding

- I have to create a list where "text" elements can be added and deleted,
( assumption, elements cannot be updated).
- The elements will appear in a list with the delete action per item. (only Delete, they cannot be updated, and the order is in queus).
- An item count will be shown with the number of elements of the list.
- Cannot add duplicate Items (Assumption).
- Cannot add empty Items (Assumption).

The constraints give an idea of how to approach the problem. I prioritize them to have an action plan of how to proceed.

- Create a test suite for the implementation of the Observer Pattern
- Implement an Observer Pattern in JavaScript and test it using the test suit.
- Then I will start working in the tests for the List Implementation.
- With the tests done, I will start separating my concerns, identifying what are the Model objects, The actions to perform, in the Controller, and how update the DOM in the more useful and quick, that will be the View part in conjunction with the HTMl part.

# Design JavaScript Observer Pattern

I will have a "Subject" with a list of "Observers", each observer will be able to to "subscribe/unsubscribe" with the "Subject" via exposed methods.

The "Subject" will "notify" subscribed "Observers" when on action happen.

The action will be executed by the "Observer" and the subject will "notify" the other observers.

- Testing (observerSpec.js)
Check for subscribe/unsubscribe methods.
Check for notify events

# Design of the application

With the Pattern implementation completely tested I start developing the application, the design considerations are.

I will create a model object to manage the data of the application, in this case the items of the list, this will be the M(odel), then I will create an object that I will mediate the operations between Model Objects and the HTML elements, it will contain all the logic of the application, and the interactions between the controller and the page actions will be manage by the observer interface. All this will be the C(ontroller). Finally the view will be the HTML elements, no logic in here, only visual elements. So this will become our V(iew).

Thats how the MVC was be implemented in the page.

- Test (itemsSpec.js)

Before the model creation, I create the tests for the model operations in the itemsSpec.js file.

- Test (controller.js)

Before the application creation I create the test for the controller operations in the controller.js file.

# Explanation

the code is organized in the following way.

- Tests

The test are located in the spec/ folder and the runner is specRunner.html this runner executes all the specs, in a procedural way, starting with the observer. where the observer pattern operations are tested, for this it creates observers and add it and remove it from the subject, and execute actions and validate them.

Next the model, where it test the item operations of adding, removing and counting.

Then it test the front end side, I would like to use jQuery for the selector operations but at the end I did it in pure javascript as a challenge.

- The Application

The application uses the MVC pattern with a self-implemented observer pattern library, the library is located in js/subject.js. this file have to main classes the Subject class, and the Observer class. The observers can subscribe to the subject, and once this is done they can execute actions. This actions will be broadcasted to the other subscribed observers, and the notification will be done through the notify function in the subject class.

Then it comes the Model of the application, this is located in the js/model.js, there are two objects that represent the persistence of the application, the most simple one is the Items, that only has the Text anb the Index properties. The other object represent a List object that implement a Facade for the management of the Array of Item elements, all the List operation are manged from this object, the addition, removal and count of items.

Finally we have the controller, which is located in the file js/app.js. This file contains the operations for the interaction of the model and the UI, and the controller is divided in:

- The variable initialization for the html elements.
- The property observer objects that interact with the model and the HTML elements
- The action listeners for the html elements
- The general purpose methods
- The init function.

The most important part is the Observer objects interactions, because each one of them register with the subject, with a unique actionId, this will allow the subject to broadcast the action to them once get executed, for example the addListItem action was registered by the ulObserver, the listObserver and counterObserver. And once is executed by the controller.addItem method all of the observer will be notified with the respective actions. The great thing about it is the Subject-Observer implementation allows the execution of multiple arguments dynamically with modify the implementation perse. And not also this kind of architecture simplify the testing process, because the functions can be executed directly from the testing suite in Jasmine.

After completion I found that the Library could be improved by simplifying the registering of action with a more generic way, by the subscription method.
