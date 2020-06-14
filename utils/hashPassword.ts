import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";

export default {
  async bcrypt(password: string): Promise<string> {
    const hash = await bcrypt.hash(password);
    return hash;
  },
  async verify(hash: string, text: string): Promise<boolean> {
    const result = await bcrypt.compare(text, hash);
    return result;
  },
};
