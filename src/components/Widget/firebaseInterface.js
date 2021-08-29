import db from './connect';

export default function promise (id){
	return new Promise((resolve, reject) => {
		
		var temp=undefined;
		var firebaseRef=db.collection('cguscholar').doc(`${id}`).get()
		firebaseRef.then((dataSnapshot)=>{
			
			if (dataSnapshot.exists){
				setDocument(dataSnapshot.data());
			}
			else{
				console.error("No such document!");
			}				
		}).then(()=>{

			console.log('promise:'+temp);
			temp ? resolve(temp):reject('No such document!');

		}).catch(error => {
			console.log(error);							
		})
	
		function setDocument(data){			
			temp= data;	
		}	
	});
}
//	var firebaseRef=db.collection('cguscholar').doc(`${id}`).collection('updata_time').get()