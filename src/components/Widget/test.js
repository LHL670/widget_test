import React from 'react'
import ReactDOM from 'react-dom';

const test = (sid) => {

		console.log(sid);
		class Data extends React.Component {
			constructor(props){ 
				super(props);
				this.state = {
				id:'',

				};
			}
			componentDidMount() {
				console.log(this.props.source);
				const data = this.props.source;
				if (data) {
					this.setState({
						id:data,
					});
				}
			
			}
			
			render() {
				var returnSchalor=undefined;
				const promise= db.collection('cguscholar').doc(`${ID}`).get()
	
                const p2= promise.then(snapshot => {
                    console.log('database');
                    var temp=undefined
                    if (snapshot.exists){
                        temp=snapshot.data();
                        console.log("temp:"+temp);
                    }
                    else{
                        console.log("No such document!");
                    }
                    //console.log("test"+doc.data());
                    /*temp={
                        citations: doc.data().citations,
                        email: doc.data().email,
                        h_index: doc.data().h_index,
                        name: doc.data().name,
                        picture: doc.data().picture,
                    }*/
                    returnSchalor=temp
                    });
                    p2.catch(error => {
                        console.log(error);
                        returnSchalor=error;		
                    });
                    console.log("return:"+returnSchalor);
                    return returnSchalor;
                }
    }
    ReactDOM.render(
        <Data source={sid}/>,
        
    );
	
}

export default test;