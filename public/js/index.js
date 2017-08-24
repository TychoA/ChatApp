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
