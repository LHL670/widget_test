import db from './connect';
var returnSchalor={data:2};
	
export default function getdata(sid){
	//console.log(SID);
	const ID=sid;
	console.log("id"+ID);
	
	const promise=db.collection('cguscholar').doc(`${ID}`).get()
	
	const p2= promise.then(snapshot => {
		const temp=snapshot.data();
		console.log("temp:"+temp);
		
		//console.log("test"+doc.data());
		/*temp={
			citations: doc.data().citations,
			email: doc.data().email,
			h_index: doc.data().h_index,
			name: doc.data().name,
			picture: doc.data().picture,
		}*/
		returnSchalor=temp;		
	});
	p2.catch(error => {
		console.log(error);
	});
	console.log("re:"+returnSchalor);
	return returnSchalor;
			
}

