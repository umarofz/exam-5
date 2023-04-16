import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        const decoded = await this.jwtService.verify(authHeader);
        req.user = decoded;
        next();
      } catch (err) {
        res.status(401).send({ message: 'Invalid or expired JWT token' });
      }
    } else {
      res
        .status(401)
        .send({ message: 'JWT token not found in Authorization header' });
    }
  }
}
