import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import H_index from './h_index';
import Citations_color from './citations_color';
import Citations from './citations';
class LargeSize extends React.Component {
	render() {
		const message=this.props.message;
		
		return (
            <div id="chart" className="chart"> 

            <div id="school-icon" className="school-icon"></div>	
            <Citations_color citations={message.citations} picture={message.picture}/>
            
            <H_index h_index={message.h_index} />

            <div className="profile">
                <div className="name-email">
                    <a id="name-email" href={'https://scholar.google.ca/citations?user='+message.id} />
                    <div id="scholar_name" className="name">{message.name}</div>
                    <div id="email" className="email">{message.email}</div>
                </div>
                <Citations citations={message.citations} />
                
            </div>
        </div>
        
        );
	}
}

export default LargeSize;