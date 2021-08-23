import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';

class H_index extends React.Component {
	render() {
		const h_index=this.props.h_index;
		return (
			<div className="H-index">
				<h2 id="text-H-index" className="text-H-index">H-index</h2>
				<div id="num-H-index" className="num-H-index">{h_index}</div>

			</div>


		);
	}
}


export default H_index;