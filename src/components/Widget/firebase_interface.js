import db from './connect';
var returnSchalor=undefined;
	
export default function getdata(sid){
	
	const ID=sid;
	console.log("id:"+ID);
	
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


