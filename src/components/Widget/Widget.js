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
            id: null,
        };
    }
    componentDidMount() {
        console.log(this.props.id);        
        if (this.props.id) {
            this.setState({
                id:this.props.id,
            });
        }    
    }
    
    render() {
        console.log(this.state.id);
        if(!this.state.id){
			return <div className="widget-container"><h1>Welcome to CGU Scholar</h1></div>;
		}
        else{
            return (
                <div>
                <div>{scholar(this.state.id)}</div>                
                </div>               
            );
        }        
    }
};

export default Widget;