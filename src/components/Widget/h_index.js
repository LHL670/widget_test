import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
//import './script';
import $ from 'jquery';
import { getdata } from './firebase_interface';
import './scholar.css';
const h_index = ({h_index_Data}) => {
		console.log(h_index_Data);

		//console.log(returnSchalor);
		class H_index extends React.Component {
			constructor(props){ 
				super(props);
				this.state = {
				h_index: '',

				};
			}
			componentDidMount() {
				
				if(h_index_Data){
					this.setState({
						h_index: h_index_Data,
						
					});
                }
			
			}
			
			render() {
				
				return (
					<div className="H-index">
						<h2 id="text-H-index" className="text-H-index">H-index</h2>
						<div id="num-H-index" className="num-H-index">{this.state.h_index}</div>
					</div>
		

				);
			}
		}
		ReactDOM.render(
			<H_index source={h_index_Data}/>,
			document.getElementById('root')
		);
	
}

export default h_index;