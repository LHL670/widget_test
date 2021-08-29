import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import 'regenerator-runtime/runtime'
import db from './connect';
import LargeSize from './largeSize';
import { errorObject } from './errorObject';
import InternetCheck from './InternetCheck';
import * as ts from './TimeStamp';
import getdactaFromFirebase from './firebaseInterface';
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

		var timeStamp=undefined;
		timeStamp=ts.afterHourMinuteSecond(0,0,86400)
		console.log(timeStamp);
		
		cookies.remove("faE3_ksAAAAJ");
		function promiseFn(num, time = 500) {
			return new Promise((resolve, reject) => {
			  setTimeout(() => {
				num ? resolve(`${num}`) : reject('失敗');
			  }, time);
			});
		  }
		async function getdataFromFirebase(id,self){
			
			var temp=undefined;
			var firebaseRef=db.collection('cguscholar').doc(`${id}`).get();
			const data2 = await promiseFn(2);
			console.log(data2);
			firebaseRef.then((dataSnapshot)=>{
				
				if (dataSnapshot.exists){
					//setDocument(dataSnapshot.data());
					console.log("set fin");
				}
				else{
					self.setState({ message:errorObject});
					console.error("No such document!");
				}
				setDocument(getdactaFromFirebase(id));
				console.log(temp);				
			}).then(()=>{
				console.log(temp);
				const Expires=timeStamp;
				setCookie(id,temp,Expires);
				self.setState({ message:readCookie(id)});
				
			}).catch(error => {
				self.setState({ message:errorObject});
				console.log(error);							
			})
		
			function setDocument(data){			
				temp= data;
				console.log("set start")
				
			}
		}
		
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
