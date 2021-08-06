import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import $ from 'jquery';

class Citations_color extends React.Component {
	render() {
		const citation_num=this.props.citations;
		const picture=this.props.picture;
		let cssProperties = {}
		if(citation_num<=10){
			cssProperties['--check-secondary']='#FF0000';
		}
		else if(11<=citation_num&&citation_num<=99){
		
			cssProperties['--check-secondary']= '#FF5809';
		}
		else if(100<=citation_num&&citation_num<=999){
			cssProperties['--check-secondary']= '#FFDC35';
		}
		else if(1000<=citation_num&&citation_num<=9999){
			cssProperties['--check-secondary']= '#00A600';
		}
		else if(10000<=citation_num&&citation_num<=99999){
			cssProperties['--check-secondary']= '#2894FF';
		}
		else if(100000<=citation_num&&citation_num<=999999){
			cssProperties['--check-secondary']= '#000093';
		}
		else {
			cssProperties['--check-secondary']= '#921AFF';
		}
		return (
				
			<i id="picture" className="picture" style={cssProperties}>
				<img id="picture-img" className="picture-img"  src={picture} alt="picture" />
			</i>

		);
	}
}

export default Citations_color;