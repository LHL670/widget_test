import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import 'regenerator-runtime/runtime'
import db from './connect';
import LargeSize from './largeSize';
import { errorObject } from './errorObject';
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

		//var self=this;
		var timeStamp=undefined;
		var today = new Date();
		var currentTime=parseInt(Date.now()/1000);
		//console.log("c1:"+currentTime);

		var tomorrow = new Date();
		tomorrow.setDate(today.getDate()+1);
		console.log(tomorrow);

		//checkTimestamp(要改cookie timestamp)
		// var firebaseTimeRef=db.collection('cguscholar').doc(`${id}`).collection('updata_time').orderBy('time','desc').limit(1).get()
		// firebaseTimeRef.then((dataSnapshot)=>{
		// 	dataSnapshot.docs.forEach(doc=>{
				
		// 		timeStamp=doc.data().time.seconds;
		// 		//console.log("t1:"+timeStamp);
		// 		return timeStamp;							
		// 	})	
		// }).then(()=>{
		// 	//getFirebaseData
		// 	console.log("c2:"+currentTime);
		// 	console.log("t2:"+timeStamp);	
		// 	console.log(currentTime-timeStamp);		
				
		// 	if(currentTime-timeStamp<2592000){//約1個月
		// 		var firebaseRef=db.collection('cguscholar').doc(`${id}`).get()
		// 		firebaseRef.then((dataSnapshot)=>{
		// 			var temp=dataSnapshot.data();
		// 			console.log("1");
		// 			setCookie(id,temp,tomorrow);
		// 			console.log("2");
		// 			//cookies.remove("faE3_ksAAAAJ");
		// 			//console.log(JSON.parse(JSON.stringify(temp)));

		// 				/*self.setState({
		// 				message:dataSnapshot.data(),					
		// 			})*/		
		// 		}).catch(error => {
		// 			console.log(error);							
		// 		})
		// 	}
		// 	else{
		// 		console.log('Data expired');				
		// 	}
		// }).then(()=> {
		// 	console.log("3");
		// 	this.setState({ message:readCookie(`${id}`)});
		// }).catch(error => {
		// 	console.log(error);		
		// })
		
		//getdataFromFirebase
		//cookies.remove("faE3_ksAAAAJ");
		async function getdataFromFirebase(id,self){
			
			var temp=undefined;
			var firebaseRef=db.collection('cguscholar').doc(`${id}`).get()
			firebaseRef.then((dataSnapshot)=>{
				
				if (dataSnapshot.exists){
					setDocument(dataSnapshot.data());
					console.log("set fin");
				}
				else{
					self.setState({ message:errorObject});
					console.log("No such document!");
				}				
			}).then(()=>{
				//console.log(temp);
				const Expires=tomorrow;
				setCookie(id,temp,Expires);
				self.setState({ message:readCookie(id)});
				
			}).catch(error => {
				self.setState({ message:errorObject});
				console.log(error);							
			})
		
			async function setDocument(data){			
				temp= data;
				console.log("set start")
				
			}
		}
		//console.log("ob:"+getdataFromFirebase(id));
		//setCookie
		function setCookie(Name,Value,Expires) {  
			try{
				cookies.set(`${Name}`, JSON.stringify(Value), {expires:Expires},{path:"/"});
			}
			catch(err){
				console.log(err);
			}
		}
		//readCookie
		function readCookie(Name) {    
			try{
				var cookieDataTemp=JSON.stringify(cookies.get(`${Name}`));
				var cookieData=JSON.parse(cookieDataTemp);
				//console.log(cookieData);
				return cookieData;
			}
			catch(err){
				console.log(err);			
			}			
		}
		//InternetCheck
		function InternetCheck(){
			var ifConnected = window.navigator.onLine;
			if (ifConnected) {
				console.log('Connection available');
				return true;
			} else {
				alert('Connection not available');
				return false;
			}
		}
		//InternetCheck();
		
		
			if(readCookie(id)){ //未過期
			    this.setState({ message:readCookie(id)});
				console.log("readCookie");
			}
            else{  //過期
				if(InternetCheck()){ //有連線
					var self=this;
					getdataFromFirebase(id,self); //有符合資料
					console.log("getdataFromFirebase");	
				}
				else{  //沒有連線
					//Error:Internet disconnect
					this.setState({ message:errorObject});
				}
			}				
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
