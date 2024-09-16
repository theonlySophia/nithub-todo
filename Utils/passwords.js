import bcrypt from "bcrypt";

const saltRounds = 10;
export const hashPassword = async(originalPassword)=>{
    let salt = await bcrypt.genSalt(saltRounds);
    let hash = await bcrypt.hash(originalPassword, salt);
    return hash;
};

export const comparePasswords = async(hash, password)=>{
    let validate = await bcrypt.compare(password, hash);
    return validate;
};

