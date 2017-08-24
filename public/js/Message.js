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
