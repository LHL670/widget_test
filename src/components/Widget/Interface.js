export default function Interface(url){
    return new Promise((resolve, reject) => {
        var data=undefined;
        const checkData = async () => {
            const response = await fetch(`${url}`);
            data = await response.json();
            console.log(await data.hits);            
            data? resolve(data):reject('data error');
        }
        checkData();
        
    })
}