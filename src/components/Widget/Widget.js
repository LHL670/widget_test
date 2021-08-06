import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './widget.css';
import scholar from './scholar';
import getdata from './firebase_interface';
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
        var sdata=getdata(sid);
        var t="ok";
        if(sdata===undefined){
			t="error";
		}
        console.log(sdata);
        
        if (this.state.message) {
            return (
                <div>
                <div>{t}</div>
                
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