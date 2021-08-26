export default function InternetCheck(){
    var ifConnected = window.navigator.onLine;
    if (ifConnected) {
        console.log('Connection available');
        return true;
    } else {
        alert('Connection not available');
        return false;
    }
}