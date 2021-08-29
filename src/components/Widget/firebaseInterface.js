import db from './connect';

export default function promise (id,time=0){
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			var temp=undefined;
			var firebaseRef=db.collection('cguscholar').doc('2').get()
			firebaseRef.then((dataSnapshot)=>{
				
				if (dataSnapshot.exists){
					setDocument(dataSnapshot.data());
					console.log("fset fin");
				}
				else{
					console.error("No such document!");
				}				
			}).then(()=>{
				console.log('promise:'+temp);
				return temp;
				
			}).then(()=>{
				temp ? resolve(temp):reject('失敗');
				
			}).catch(error => {
				console.log(error);							
			})
		
			function setDocument(data){			
				temp= data;
				console.log("fset start")
				
			}
			
			
		}, time);
	  });
}