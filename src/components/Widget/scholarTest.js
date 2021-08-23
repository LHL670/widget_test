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
		//console.log("c1:"+currentTime);

		var tomorrow = new Date();
		tomorrow.setDate(today.getDate()+1);
		console.log(tomorrow);

		//checkTimestamp(要改cookie timestamp)
		var firebaseTimeRef=db.collection('cguscholar').doc(`${id}`).collection('updata_time').orderBy('time','desc').limit(1).get()
		firebaseTimeRef.then((dataSnapshot)=>{
			dataSnapshot.docs.forEach(doc=>{
				
				timeStamp=doc.data().time.seconds;
				//console.log("t1:"+timeStamp);
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
					var temp=dataSnapshot.data();
					console.log("1");
					setCookie(id,temp,tomorrow);
					console.log("2");
					//cookies.remove("faE3_ksAAAAJ");
					//console.log(JSON.parse(JSON.stringify(temp)));

						/*self.setState({
						message:dataSnapshot.data(),					
					})*/		
				}).catch(error => {
					console.log(error);							
				})
			}
			else{
				console.log('Data expired');				
			}
		}).then(()=> {
			console.log("3");
			this.setState({ message:readCookie(`${id}`)});
		}).catch(error => {
			console.log(error);		
		})
		
		
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
		InternetCheck();

		
		/*//getdataFromCookie
			if(readCookie(`${id}`)) //未過期
			    this.setState({ message:readCookie(`${id}`)});
            
            else  //過期
				if(InternetCheck()) //有連線
					
					if(getdataFromFirebase()) //有符合資料
						//return (Value)
                            //setCookie(Name,Value,Expires)
							    //this.setState({ message:readCookie(`${id}`)});
                                    

					else  //沒有符合資料
						//Error:No such data

				else  //沒有連線
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
