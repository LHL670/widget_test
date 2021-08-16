import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';

import db from './connect';
import LargeSize from './largeSize';
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
				if(doc.size === 'large'){
					return(
						<LargeSize message={this.state.message} />
					);
				}
				else if(doc.size === 'medium'){
					//m size
				}
				else if(doc.size === 'small'){
					//s size
				}
			}
		}
		ReactDOM.render(
			<ScholarData source={id}/>,
			document.getElementById(`${doc.targetElementId}`)
		);
	
}

export default scholar;