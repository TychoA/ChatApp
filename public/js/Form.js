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
