import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './widget.css';
import scholar from './scholar';
import getdata from './firebase_interface';

import test from './test';
const widgetName = Config.name;

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: null,
        };
    }
    
    
    render() {
        console.log(this.state.message);
        //console.log(this.state.data);
        if(!this.state.message){
			return <div className="widget-container"><h1>Welcome to CGU Scholar</h1></div>;
		}
        /*else if(this.state.data===undefined){
            return <div className="widget-container"><h1>No data input</h1></div>;
        }*/       
        
        else{
            return (
                <div>
                <div>{scholar(this.state.message)}</div>                
                </div>               
            );
        }        
    }
    setMessage(message){
        this.setState({message: message});        
    }
};

export default Widget;