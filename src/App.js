import React, { Component } from "react";
import search from "./search";
import "./App.css";

/*
 * This React component holds the Smiley Autofill UI. You'll need
 * to contact the API and update the UI to show the result in the
 * correct div.
 *
 * If you haven't used React before, here are its docs:
 *
 * https://reactjs.org/docs/hello-world.html
 *
 * React is one of the most popular UI frameworks. It is easy to learn,
 * and is extremely powerful.
 *
 * To launch the test suite for this component, launch the API and the
 * UI, and then run the test script for Task 3:
 *
 *     ... in the first window
 *     $ npm run task2:start
 *
 *     ... in another window
 *     $ npm run task3:start
 *
 *     ... in yet another window
 *     $ npm run task3:test
 */

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', messages : [], emojis : []};

        this.checkForMessage = this.checkForMessage.bind(this);
        this.saveMessage = this.saveMessage.bind(this);
        this.changeText = this.changeText.bind(this);

    }
    componentDidMount() {
        window.addEventListener('onbeforeunload', this.retrieveMessages())
    }
    changeText(event) {
        event.preventDefault();

        this.setState({"value" : this.state.value.replace(":" + this.state.value.split(":")[1].split(" ")[0], event.target.value)});
        this.setState({"emojis" : []});
    }
    saveMessage(event) {
        event.preventDefault();
        fetch('http://localhost:3000/messages', {
            method: 'post',
            body: JSON.stringify({"message":this.state.value}),
            headers: {"Content-Type": "application/json"}
        }).then(response => {
            this.state.messages.push(this.state.value)
            this.setState({"messages" : this.state.messages, "value" : ''})

        });

        /**
         * You'll probably want to use the HTML fetch to contact the API
         * to store the message. If you haven't used fetch
         * before, here is some documentation:
         *
         * https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
         */
        console.log("Contact the API and store the message.");
    }
    checkForMessage(event)
    {
        this.setState({"value" : event.target.value})
      if(event.target.value.includes(":") && event.target.value.split(":")[1].split(" ")[0] !== '') {
          this.setState({"emojis" : search(event.target.value.split(":")[1].split(" ")[0])})
      }

    }
    retrieveMessages() {
        fetch('http://localhost:3000/messages/')
            .then(response => response.json())
            .then(data => {
                this.setState({ "messages" : data })});
        /**
         * You'll want to retrieve messages when UI is reloaded to show
         * previously sent messages.
         */
        console.log("Contact the API and retrieve all stored messages.");
    }

    render() {
        let messages = [];

        for(let i=0;i < this.state.messages.length;i++) {
            messages.push(<div className="app__message" key={i}>{this.state.messages[i]}</div>)
        }

        let emojis = [];

        for(let i=0;i < this.state.emojis.length;i++) {
            emojis.push( <span key={i}>
                          <button className="app__emoji-select-button"
                                  value={this.state.emojis[i].emoji}
                                    onClick={this.changeText}
                          >{this.state.emojis[i].emoji} {this.state.emojis[i].name}</button>
                  </span>)
        }

        return (
            <div className="root">
                <div className="app__sidebar" />

                <div className="app__chat-block">
                    <div className="app__chat-block-header">
                        <b>#Hackकर </b>
                        <br />
                        Coding challege
                    </div>
                    <div className="app__messages-block">
                        <div className="app__message-block">
                            {messages}
                        </div>
                        {emojis.length ? (<div className="app__emoji-popup" >
                            <div className="app__emoji-popup-header">Matching Emoji</div>
                            <div className="app__emoji-popup-body">
                                {emojis}
                            </div>
                        </div>) : ''}


                        <div className="app__message-box">
                            <div className="app__message-box-input">
                                <form id="app__message-form" onSubmit={this.saveMessage}>
                                    <input
                                        className="app__message-box-input"
                                        id="app__message-box-input"
                                        type="text"
                                        autoComplete="off"
                                        placeholder="Message #Hackकर"
                                        value={this.state.value}
                                        onChange={this.checkForMessage}
                                        onSubmit={this.saveMessage}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
