import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import H_index from './h_index';
import Citations_color from './citations_color';
import Citations from './citations';
import db from './connect';
const scholar = (doc) => {
		const id=doc.id;
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
				var timeStamp=undefined;

				var currentTime=parseInt(Date.now()/1000);
				console.log("c1:"+currentTime);			
				
				//checkTimestamp
				var firebaseTimeRef=db.collection('cguscholar').doc(`${id}`).collection('updata_time').orderBy('time','desc').limit(1).get()
				firebaseTimeRef.then((dataSnapshot)=>{
					dataSnapshot.docs.forEach(doc=>{
						
						timeStamp=doc.data().time.seconds;
						console.log("t1:"+timeStamp);
						return timeStamp;							
					})	
				}).then(()=>{
					//getFirebaseData
					console.log("c2:"+currentTime);
					console.log("t2:"+timeStamp);	
					console.log(currentTime-timeStamp);		
						
					if(currentTime-timeStamp<2592000){//約1個月
						var firebaseRef=db.collection('cguscholar').doc(`${id}`).get()
						firebaseRef.then((dataSnapshot)=>{
								self.setState({
								message:dataSnapshot.data(),					
							})		
						});
					}
					else{
						console.log('Data expired')
					}
				})
				
								
			}
			
			render() {
				console.log(this.state.message);
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
			document.getElementById(`${doc.targetElementId}`)
		);
	
}

export default scholar;