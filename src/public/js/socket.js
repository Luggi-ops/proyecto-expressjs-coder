const socket = io();


socket.on('Welcome', (arg) => {
    console.log(arg)
})