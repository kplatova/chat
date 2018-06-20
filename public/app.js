const socket = io();

new Vue({
    el: '#app',
    data: {
        message: ''
    },
    methods: {
        sendMessage() {
            const message = {
                text: this.message
            };

            socket.emit('createMessage', message, error => {
                if (error) {
                    console.error(error);
                } else {
                    this.message = '';
                }
            })
        }
    }
});