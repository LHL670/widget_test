import db from './connect';
var returnSchalor={};

function getdata(data){
	
	db.collection('cguscholar').where('id','==','faE3_ksAAAAJ').get().then(snapshot => {
		snapshot.docs.forEach(doc => {
			//console.log(doc.data());
			data={
				citations: doc.data().citations,
				email: doc.data().email,
				h_index: doc.data().h_index,
				id: doc.data().id,
				name: doc.data().name,
				picture: doc.data().picture,
				school_icon: doc.data().school_icon,
			}
			returnSchalor=data;
		});
	});
	
}

getdata();
//console.log(returnSchalor);
export {returnSchalor};