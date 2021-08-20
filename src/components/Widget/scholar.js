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
		};
	}
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired
	};

	componentDidMount() {
		console.log(this.props);
		const { cookies } = this.props;
		
		const id=this.props.id;

		var self=this;
		var timeStamp=undefined;
		var today = new Date();
		var currentTime=parseInt(Date.now()/1000);
		console.log("c1:"+currentTime);			
		var tomorrow = new Date();
		tomorrow.setDate(today.getDate()+1);
		console.log(tomorrow);
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
					var temp=dataSnapshot.data();
					cookies.set(`${id}`, JSON.stringify(temp), {expires:tomorrow},{path:"/"});
					//console.log(JSON.parse(JSON.stringify(temp)));

						/*self.setState({
						message:dataSnapshot.data(),					
					})*/		
				}).catch(error => {
					console.log(error);
							
				})
			}
			else{
				console.log('Data expired')
				
			}
		})

		var cookieDataTemp=JSON.stringify(cookies.get(`${id}`));
		var cookieData=JSON.parse(cookieDataTemp);
		this.setState({ message:cookieData });
		/*//getdataFromCookie
			if(有拿到資料) 
			//timeStamp 
			if(有過期) 
				//checkInternet
				if(有連線)
					//getdataFromFirebase
					if(有符合資料)
						//return object
							//update state
					else(沒有符合資料)
						//Error:No such data
				else(沒有連線)
					//Error:Internet disconnect
			else(沒有過期)
				//update state
			else(沒有)
			//checkInternet
				if(有連線)
					//getdataFromFirebase
					if(有符合資料)
						//return object
							//update state
					else(沒有符合資料)
						//Error:No such data
				else(沒有連線)
					//Error:Internet disconnect*/
							
	}
	

	
	render() {
		console.log(this.state.message);
		if(this.props.size === 'medium'){
			//m size
		}
		else if(this.props.size === 'small'){
			//s size
		}
		else{
			
			return(
				<div><LargeSize message={this.state.message} />
				<p>Cookie set successful: {this.props.id}</p></div>
			);
		}
	}
}
export default withCookies(ScholarWidget);
