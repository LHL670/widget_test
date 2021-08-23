import React from 'react'
import ReactDOM from 'react-dom';
import Config from '../../config';
import './widget.css';
import Scholar from './scholar';
const widgetName = Config.name;

class Widget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            size:'large',
        };
    }
    componentDidMount() {
        console.log(this.props);  
        if (this.props) {
            this.setState({
                id:this.props.id,
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
                <Scholar detail={this.state} />              
                </div>               
            );
        }        
    }
};

export default Widget;