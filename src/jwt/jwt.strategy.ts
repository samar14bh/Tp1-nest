import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          ignoreExpiration: false,
          secretOrKey: 'SECRET_KEY', // Replace with your actual secret key
        });
      }
    
      async validate(payload: any) {
        return { userId: payload.sub, username: payload.username, role: payload.role };
      }

}
  