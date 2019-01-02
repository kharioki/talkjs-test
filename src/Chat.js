import React, { Component } from 'react';
import './App.css';

import * as Talk from 'talkjs';

const users = [
  {
    id: '654321',
    name: 'Abigail',
    email: 'sebastian@example.com'
  },
  {
    id: '456789',
    name: 'James',
    email: 'steve@example.com'
  }
];

class App extends Component {
  constructor(props) {
    super(props);
    this.talkSession = undefined;
  }

  componentDidMount() {
    // Promise can be `then`ed multiple times
    Talk.ready
      .then(() => {
        const me = new Talk.User({
          id: '12345231',
          name: 'George Looney',
          email: 'george@looney.net',
          welcomeMessage: 'Hey there! How are you? :-)'
        });

        this.talkSession = new Talk.Session({
          appId: 'taR2RDUA',
          me: me
        });

        // users.map(user => {
        //   conversation.setParticipant(new Talk.User(user));
        // })

        // You control the ID of a conversation. oneOnOneId is a helper method that generates
        // a unique conversation ID for a given pair of users.
        // const conversationId = Talk.oneOnOneId(me, other1);

        const conversation = this.talkSession.getOrCreateConversation(
          'sydney_12345'
        );
        // const conversation = this.talkSession.getOrCreateConversation(
        //   '12345231'
        // );
        conversation.setParticipant(me);

        users.map(user => {
          conversation.setParticipant(new Talk.User(user));
        });
        conversation.setAttributes({
          photoUrl: 'https://demo.talkjs.com/img/11.jpg',
          subject: 'Beautiful Steel Preserve for rent!'
        });

        const chatbox = this.talkSession.createChatbox(conversation);
        chatbox.mount(this.container);
      })
      .catch(e => console.error(e));
  }

  render() {
    return (
      <div className="App">
        <div
          ref={c => (this.container = c)}
          id="talkjs-container"
          style={{ width: '90%', margin: '30px', height: '500px' }}
        >
          Loading...
        </div>
      </div>
    );
  }
}

export default App;
