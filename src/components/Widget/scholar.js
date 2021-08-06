import React from 'react'
import ReactDOM from 'react-dom';
import './scholar.css';
import H_index from './h_index';
import Citations_color from './citations_color';
import Citations from './citations';
const scholar = (returnSchalor) => {

		console.log(returnSchalor);
		class ScholarData extends React.Component {
			constructor(props){ 
				super(props);
				this.state = {
				citations: '',
				email: '',
				h_index: '',
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
						name: data.name,
						picture: data.picture,
						school_icon: data.school_icon,
					});
				}
			
			}
			
			render() {
				
				return (
					<div id="chart" className="chart"> 
	
					<div id="school-icon" className="school-icon"></div>	
					<Citations_color citations={this.state.citations} picture={this.state.picture}/>
					
					<H_index h_index={this.state.h_index} />
		
					<div className="profile">
						<div className="name-email">
							<a id="name-email" href={'https://scholar.google.ca/citations?user='+this.state.id} />
							<div id="scholar_name" className="name">{this.state.name}</div>
							<div id="email" className="email">{this.state.email}</div>
						</div>
						<Citations citations={this.state.citations} />
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