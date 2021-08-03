import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './widget.css';
import scholar from './scholar';
import getdata, {returnSchalor} from './firebase_interface';
const widgetName = Config.name;

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
        };
    }

    render() {
        const sid=this.state.message;
        if (this.state.message) {
            return (
                <div>
                <div>test</div>
                <div>{getdata(this.state.message)}</div>
                </div>

            );
        }
        else {
            return <div className="widget-container"><h1>Welcome to CGU Scholar</h1></div>;
        }
    }

    setMessage(message){
        this.setState({message: message});
    }
};

export default Widget;