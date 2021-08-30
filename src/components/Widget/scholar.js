import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import { instanceOf,PropTypes } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import 'regenerator-runtime/runtime'

import InternetCheck from './InternetCheck';
import * as ts from './TimeStamp';
import _FromFirebase from './firebaseInterface';
import Interface from './Interface';

import { errorObject } from './errorObject';
import LargeSize from './largeSize';

class ScholarWidget extends React.Component {

	constructor(props){ 
		super(props);
		this.state = {
			message:'',
		};
	}
	// static propTypes = {
	// 	message:{
	// 		citations: PropTypes.isRequired,
	// 		email: PropTypes.string.isRequired,
	// 		h_index: PropTypes.isRequired,
	// 		name: PropTypes.number.isRequired,
	// 		picture: PropTypes.string.isRequired,
	// 	}
	// };
	// static defaultProps={
	// 	message:{
	// 		citations: 'error',
	// 		email: "error@gmail.com.tw",
	// 		h_index: 'error',
	// 		name: 'error',
	// 		picture: 'https://lh3.googleusercontent.com/proxy/8oPEikQeskYtYQuJg0UmMxUGMSY4UZ4CHcFbsd3LTZkIkSITj7QqPw_uiHOxfoZT8uW3RGxCnJPibp98iOkMjboMX7PpcZs50y--UWIduTXm1jtBhQqa61iBG9n_r_2oCI9Vxj3DkjYusS1Wp3J7XChuQPYvETUsu0y7pafPDvmiP16mispjQpov_3K70A85uWnvkcPH5Id7JANx37fymO6XDATQeRQSX7pYJXzFNpZi_eVpe_J20IDsHB1NLPM6',
	// 	}
	// }
	static propTypes = {
		cookies: instanceOf(Cookies).isRequired,
	};

	componentDidMount() {
		console.log(this.props);
		const { cookies } = this.props;
		
		const id=this.props.id;
		
		var timeStamp=undefined;
		timeStamp=ts.afterHourMinuteSecond(0,0,86400)
		console.log(timeStamp);
		
		cookies.remove(id);		

		
		async function setdata(id,self){
			try{
				const Expires=timeStamp;
				const temp= await _FromFirebase(id);
				console.log('get data! '+temp);
				
				setCookie(id,temp,Expires);

				// setCookie('Expires',Expires,Expires);
				// console.log(new Date(readCookie('Expires')));

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
		
		
		if(readCookie(id)){ //未過期
			this.setState({ message:readCookie(id)});
			console.log("readCookie");
		}
		else{  //過期
			if(InternetCheck()){ //有連線
				var self=this;
				setdata(id,self); //有符合資料
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
