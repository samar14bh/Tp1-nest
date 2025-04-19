const jwt=require ('jsonwebtoken');
const token=jwt.sign({userId:"b1e8c231-ffc4-41eb-a956-8e94c05c8f6e"},'SECRET_KEY')
console.log(token)