import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
class Citations extends React.Component {
	render() {
		const citations=this.props.citations;
		
		return (
				
            <div className="user-citations">
                <div id="citations" className="citations">{citations}</div>

            </div>

		);
	}
}

export default Citations;