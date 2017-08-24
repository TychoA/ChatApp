/**
 *  A component that handles the interface of the application
 */
const Form = function ($parent) {

    // init main form
    const $form = $("<form>").appendTo($parent);

    // init chat name input
    const $name = $("<input type='text' name='username' placeholder='Type your username here...'>").appendTo($form);

    // init chat message input
    const $message = $("<input type='text' name='message' placeholder='Write a message...'>").appendTo($form);

    // init submit button
    const $submit = $("<button>").text('Send message').appendTo($form);

    // give access to the input
    this.form = () => {
        return $form;
    };

    // ability to get the form data as an object
    this.serialize = () => {
        return {
            username: $name.val(),
            message: $message.val()
        }
    };
};

// load interface for the index
$(function () {

    // access the websocket
    const socket = io();

    // get the main container
    const $container = $('.container');

    // init new interface
    const $form = new Form($container);

    // listen to submit event
    $form.form().on('submit', (event) => {

        // prevent default behavior
        event.preventDefault();

        // get data
        let data = $form.serialize();

        // emit message
        socket.emit('chat message', data);

        // empty form message
        $form.form().find('[name="message"]').val('');
    });

    // handle messages
    socket.on('chat message', (data) => {

        // show message
        let $message = new Message($container, data);
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
const Message = function ($parent, data) {

    // init a container
    const $container = $('<div class="message">').appendTo($parent);

    // init the message elements
    const $username = $('<p class="message-username">').text(data.username + ' said:').appendTo($container);
    const $message = $('<p class="message-message">').text(data.message).appendTo($container);

    // safely remove a message
    this.remove = function () {
        $container.remove();
    };
};

//# sourceMappingURL=concat.js.map