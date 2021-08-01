import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
//import './script';
import $ from 'jquery';
import { getdata } from './firebase_interface';
const scholar = ({returnSchalor,sid}) => {
		console.log(sid);

		//console.log(returnSchalor);
		class ScholarData extends React.Component {
			constructor(props){ 
				super(props);
				this.state = {
				citations: '',
				email: '',
				h_index: '',
				id: '',
				name: '',
				picture: '',
				school_icon: '',

				};
			}
			componentDidMount() {
				console.log(this.props.source);
				const data = this.props.source;
				if (data) {
					this.setState({
						citations: data.citations,
						email: data.email,
						h_index: data.h_index,
						id: data.id,
						name: data.name,
						picture: data.picture,
						school_icon: data.school_icon,
					});
				}
			
			}
			
			render() {
				const citation_num=this.state.citations;
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
					<div id="chart" className="chart"> 
	
					<div id="school-icon" className="school-icon"></div>	
					<i id="picture" className="picture" style={cssProperties}>
						<img id="picture-img" className="picture-img"  src={this.state.picture} alt="picture" />
					</i>
					
					<div className="H-index">
						<h2 id="text-H-index" className="text-H-index">H-index</h2>
						<div id="num-H-index" className="num-H-index">{this.state.h_index}</div>
					</div>
		
					<div className="profile">
						<div className="name-email">
							<a id="name-email" href={'https://scholar.google.ca/citations?user='+this.state.id} />
							<div id="scholar_name" className="name">{this.state.name}</div>
							<div id="email" className="email">{this.state.email}</div>
						</div>
						<div className="user-citations">
							<div id="citations" className="citations">{this.state.citations}</div>
						</div>
					</div>
				</div>
				);
			}
		}
		ReactDOM.render(
			<ScholarData source={returnSchalor}/>,
			document.getElementById('root')
		);
	
}

export default scholar;