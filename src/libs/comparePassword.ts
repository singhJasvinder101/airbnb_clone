import bcrypt from 'bcrypt'

export const comparePassword = async (hashedPassword: string, password: string) => {
    const ans = await bcrypt.compare(hashedPassword, password);
    return ans;
}