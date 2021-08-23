import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

function read_cookie(id) {
    
    var cookieDataTemp=JSON.stringify(cookies.get(`${id}`));
    var cookieData=JSON.parse(cookieDataTemp);
    return cookieData;
   }
export default withCookies(read_cookie);