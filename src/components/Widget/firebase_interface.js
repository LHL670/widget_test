import db from './connect';
var returnSchalor={};

function getdata(){
	var data={};
	db.collection('cguscholar').where('name','==','Jeffrey M. Wooldridge').get().then(snapshot => {
		snapshot.docs.forEach(doc => {
			//console.log(doc.data());
			data={
				citations: doc.data().citations,
				email: doc.data().email,
				h_index: doc.data().h_index,
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