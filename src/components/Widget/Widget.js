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
            targetElementId:'root',
            size:'large',
        };
    }
    componentDidMount() {
        console.log(this.props);  
        if (this.props) {
            this.setState({
                id:this.props.id,
                targetElementId:this.props.root,
                size:this.props.size,
            });
        }    
    }
    
    render() {
        if(!this.state.id){
			return <div className="widget-container"><h1>Welcome to CGU Scholar</h1></div>;
		}
        else{
            return (
                <div>
                <div>{scholar(this.state)}</div>                
                </div>               
            );
        }        
    }
};

export default Widget;