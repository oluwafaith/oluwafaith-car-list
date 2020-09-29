import jwt from 'jsonwebtoken';
import { User, validateUser, userSchema } from './models/userModel'
import dotenv from 'dotenv';

dotenv.config();

export async function auth (req: any) {
  //  const input = "faithyuuuuuu@email.com";
    
     const input = "faithy@email.com";
    
    const user: any= await User.findOne({ email: input });
    if(!user){
        throw Error(" failed auth")
    }
    console.log(user);
    
    const payload = {
        id: user.id,
        email: user["email"]
    };
    const token = jwt.sign(payload, "mysecret", {
        expiresIn: '2h'
    })
     req.headers.authorization = token;
    return req;
}

// export default auth;
