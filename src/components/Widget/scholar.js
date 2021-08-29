import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import 'regenerator-runtime/runtime'
import LargeSize from './largeSize';
import { errorObject } from './errorObject';
import InternetCheck from './InternetCheck';
import * as ts from './TimeStamp';
import promise from './firebaseInterface';
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


		async function getdataFromFirebase(id,self){
			try{
				const Expires=timeStamp;
				const temp= await promise(id);
				console.log(temp);
				
				setCookie(id,temp,Expires);
				self.setState({ message:readCookie(id)});
			}
			catch(err){
				self.setState({ message:errorObject});
				console.log(err);			
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
