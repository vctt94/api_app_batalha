


// Chatroom

websocket.on('connection', function (socket) {

  socket.on('battle-update', function (data) {
    console.log('atualizando')
    console.log(data)
    // we tell the client to execute 'new message'
    socket.broadcast.emit('battle-updated');
    // socket.broadcast.emit('battleUpdated', {
    //   username: socket.username,
    //   message: data
    // });
  });

  socket.on('battle-updated', function () {
    console.log('atualizado')
    // we tell the client to execute 'new message'
    socket.broadcast.emit('battleUpdated');
  });

  // when the client emits 'add user', this listens and executes
  // socket.on('add user', function (username) {
  //   if (addedUser) return;
  //
  //   // we store the username in the socket session for this client
  //   socket.username = username;
  //   ++numUsers;
  //   addedUser = true;
  //   socket.emit('login', {
  //     numUsers: numUsers
  //   });
  //   // echo globally (all clients) that a person has connected
  //   socket.broadcast.emit('user joined', {
  //     username: socket.username,
  //     numUsers: numUsers
  //   });
  // });

  // when the client emits 'typing', we broadcast it to others
  // socket.on('typing', function () {
  //   socket.broadcast.emit('typing', {
  //     username: socket.username
  //   });
  // });

  // when the client emits 'stop typing', we broadcast it to others
  // socket.on('stop typing', function () {
  //   socket.broadcast.emit('stop typing', {
  //     username: socket.username
  //   });
  // });

  // when the user disconnects.. perform this
  // socket.on('disconnect', function () {
  //   if (addedUser) {
  //     --numUsers;
  //
  //     // echo globally that this client has left
  //     socket.broadcast.emit('user left', {
  //       username: socket.username,
  //       numUsers: numUsers
  //     });
  //   }
  // });
});