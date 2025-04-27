import jwt from 'jsonwebtoken';
const generateToken = (userId: any) => {
    const secretKey = process.env.JWT_SECRET || 'your_jwt_secret';
    const expiresIn = '1h'; // Token expiration time
    const token = jwt.sign({ id: userId }, secretKey, { expiresIn });
    return token;
}
export default generateToken;