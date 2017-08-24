"use strict";

/**
 *  A component that handles the interface of the application
 */
var Form = function Form($parent) {

    // init main form
    var $form = $("<form>").appendTo($parent);

    // init chat name input
    var $name = $("<input type='text' name='username' placeholder='Type your username here...'>").appendTo($form);

    // init chat message input
    var $message = $("<input type='text' name='message' placeholder='Write a message...'>").appendTo($form);

    // init submit button
    var $submit = $("<button>").text('Send message').appendTo($form);

    // give access to the input
    this.form = function () {
        return $form;
    };

    // ability to get the form data as an object
    this.serialize = function () {
        return {
            username: $name.val(),
            message: $message.val()
        };
    };
};

// load interface for the index
$(function () {

    // access the websocket
    var socket = io();

    // get the main container
    var $container = $('.container');

    // init new interface
    var $form = new Form($container);

    // listen to submit event
    $form.form().on('submit', function (event) {

        // prevent default behavior
        event.preventDefault();

        // get data
        var data = $form.serialize();

        // emit message
        socket.emit('chat message', data);

        // empty form message
        $form.form().find('[name="message"]').val('');
    });

    // handle messages
    socket.on('chat message', function (data) {

        // show message
        var $message = new Message($container, data);
    });
});

/**
 *  An object representing an individual message
 *
 *  Data is expected to be = {
 *      username,
 *      message
 *  }
 */
var Message = function Message($parent, data) {

    // init a container
    var $container = $('<div class="message">').appendTo($parent);

    // init the message elements
    var $username = $('<p class="message-username">').text(data.username + ' said:').appendTo($container);
    var $message = $('<p class="message-message">').text(data.message).appendTo($container);

    // safely remove a message
    this.remove = function () {
        $container.remove();
    };
};

//# sourceMappingURL=concat.js.map
//# sourceMappingURL=es5.js.map
