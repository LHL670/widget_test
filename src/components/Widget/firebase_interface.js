import db from './connect';
var returnSchalor={};

	
function getdata(sid){
	
	const ID=sid;
	console.log(ID);
	var temp={};
	db.collection('cguscholar').doc(`${ID}`).get().then(doc => {
			//console.log(doc.data());
			temp={
				citations: doc.data().citations,
				email: doc.data().email,
				h_index: doc.data().h_index,
				id: doc.data().id,
				name: doc.data().name,
				picture: doc.data().picture,
				school_icon: doc.data().school_icon,
			}
			returnSchalor=temp;
			console.log(returnSchalor);
			
		});
	
	//console.log(returnSchalor);

}
/*var i={};
i=getdata();
console.log(i);*/


export default getdata;