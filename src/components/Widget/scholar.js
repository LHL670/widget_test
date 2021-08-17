import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import db from './connect';
import LargeSize from './largeSize';
class ScholarWidget extends React.Component {

	constructor(props){ 
		super(props);
		this.state = {
		message:'',
		user:'',
		};
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};
	state = {
		user: this.props.cookies.get("user") || ""
	};
	componentDidMount() {
		console.log(this.props);
		const id=this.props.id;

		var self=this;
		var timeStamp=undefined;
		
		var currentTime=parseInt(Date.now()/1000);
		console.log("c1:"+currentTime);			
		
		//checkTimestamp(要改cookie timestamp)
		var firebaseTimeRef=db.collection('cguscholar').doc(`${id}`).collection('updata_time').orderBy('time','desc').limit(1).get()
		firebaseTimeRef.then((dataSnapshot)=>{
			dataSnapshot.docs.forEach(doc=>{
				
				timeStamp=doc.data().time.seconds;
				console.log("t1:"+timeStamp);
				return timeStamp;							
			})	
		}).catch(error => {
			console.log(error);		
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
				}).catch(error => {
					console.log(error);
							
				})
			}
			else{
				console.log('Data expired')
				
			}
		})
		const { cookies } = this.props;
		cookies.set("user", "gowtham", { path: "/" }); // setting the cookie
		this.setState({ user: cookies.get("user") });			
	}
	

	
	render() {
		console.log(this.state.message);
		console.log("user"+this.state.user);
		if(this.props.size === 'medium'){
			//m size
		}
		else if(this.props.size === 'small'){
			//s size
		}
		else{
			
			return(
				<div><LargeSize message={this.state.message} />
				<p>Cookie set successful: {this.state.user}</p></div>
			);
		}
	}
}
export default withCookies(ScholarWidget);
