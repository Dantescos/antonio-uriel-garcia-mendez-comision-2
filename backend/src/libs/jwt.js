import { TOKEN_SECRET } from "../config";
function createAccessToken(payload){

new Promise((resolve,reject)=>{        
jwt.sign(
    payload,
    TOKEN_SECRET,
    { 
    expiresIn:"1d",
},
(err, token) => {
    if (err) reject(err);
    resolve(token)

     }
    );
 } );
  }