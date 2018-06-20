const socket = io();

Vue.component('chat-message', {
    props: ['message'],
    template: `
        <div class="message">
            <div class="message-content z-depth-1">
                {{message.text}}
            </div>
        </div>
    `
});

new Vue({
    el: '#app',
    data: {
        message: '',
        messages: []
    },
    methods: {
        sendMessage() {
            const message = {
                text: this.message
            };

            socket.emit('message:create', message, error => {
                if (error) {
                    console.error(error);
                } else {
                    this.message = '';
                }
            })
        },
        initConnection() {
            socket.on('message:new', messages => {
                this.messages.push(messages);
            });
        }
    },
    mounted() { // когда готов весь html
        this.initConnection();
    }
});