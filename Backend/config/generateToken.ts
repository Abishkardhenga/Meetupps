import jwt from 'jsonwebtoken';
const generateToken = (userId: any) => {
    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
    const expiresIn = '30d'; // Token expires in 30 days (1 month)
    const token = jwt.sign({ id: userId }, secretKey, { expiresIn });
    return token;
}
export default generateToken;