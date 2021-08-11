import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import H_index from './h_index';
import Citations_color from './citations_color';
import Citations from './citations';
import db from './connect';
const scholar = (id) => {

		console.log(id);
		class ScholarData extends React.Component {
			constructor(props){ 
				super(props);
				this.state = {
				message:'',
				};
			}
			componentDidMount() {
				console.log(this.props.source);
				var self=this;
				var firebaseRef=db.collection('cguscholar').doc(`${id}`).get()
				firebaseRef.then(function(dataSnapshot){
					self.setState({
						message:dataSnapshot.data(),
					})
				});
				
			}
			
			render() {
							
				return (
					<div id="chart" className="chart"> 
	
					<div id="school-icon" className="school-icon"></div>	
					<Citations_color citations={this.state.message.citations} picture={this.state.message.picture}/>
					
					<H_index h_index={this.state.message.h_index} />
		
					<div className="profile">
						<div className="name-email">
							<a id="name-email" href={'https://scholar.google.ca/citations?user='+this.state.message.id} />
							<div id="scholar_name" className="name">{this.state.message.name}</div>
							<div id="email" className="email">{this.state.message.email}</div>
						</div>
						<Citations citations={this.state.message.citations} />
					</div>
				</div>
				);
			}
		}
		ReactDOM.render(
			<ScholarData source={id}/>,
			document.getElementById('root')
		);
	
}

export default scholar;