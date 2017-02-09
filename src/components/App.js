import React from 'react';
import Formulaire from './Formulaire'
import Message from './Message'
import base from '../base'
// CSS
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import '../animation.css';

class App extends React.Component {

    state = {
        messages: {}
    }

    componentWillMount() {
        this.ref = base.syncState('/', {
            context: this,
            state: 'messages'
        });
    }

    addMessage = message => {
        // Copier le state
        const messages = {...this.state.messages};
        // Add timeStamp key
        const timestamp = Date.now();
        messages[`message-${timestamp}`] = message;
        // Suppression messages
        Object.keys(messages).slice(0, -10).map(key => messages[key] = null);
        // Mettre à jour le state
        this.setState({ messages });
    };

    render() {
        const messages = Object
        .keys(this.state.messages)
        .map(key => <Message key={key} details={this.state.messages[key]} />)

        return (
            <div className="box">
                <div>
                    <div className="messages">
                        <ReactCSSTransitionGroup
                            component="div"
                            className="message"
                            transitionName="message"
                            transitionEnterTimeout={200}
                            transitionLeaveTimeout={200}
                        >
                            {messages}
                        </ReactCSSTransitionGroup>
                    </div>
                    <Formulaire
                        addMessage={this.addMessage}
                        pseudo={this.props.params.pseudo}
                        length="140"
                    />
                </div>
            </div>
        )
    }
}

export default App;
