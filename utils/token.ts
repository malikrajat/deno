import {
  validateJwt,
  parseAndDecode,
  validateJwtObject,
} from "https://deno.land/x/djwt/validate.ts";
import {
  makeJwt,
  setExpiration,
  Jose,
  Payload,
} from "https://deno.land/x/djwt/create.ts";
const key = "your-secret";
const header: Jose = {
  alg: "HS256",
  typ: "JWT",
};
export default {
  generateToken(userId: string): string {
    const payload: Payload = {
      iss: userId,
      exp: setExpiration(new Date().getTime() + 60000 * 60),
    };
    return makeJwt({ header, payload, key });
  },
  async validate(jwt: string) {
    return (await validateJwt(jwt, key)).isValid;
  },
  fetchUserId(token: string) {
    return validateJwtObject(parseAndDecode(token)).payload;
  },
};
