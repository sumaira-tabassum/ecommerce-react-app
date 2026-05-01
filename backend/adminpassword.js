import bcrypt from "bcryptjs";

const plainPassword = "5februarysumaira";
const hashedPassword = await bcrypt.hash(plainPassword, 10);

console.log(hashedPassword);
