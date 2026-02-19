import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && (await bcrypt.compare(pass, user.password_hash))) {
      const { password_hash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any, originFranchiseId?: string | null) {
    // STRICT FRANCHISE ISOLATION:
    // If request comes from a franchise domain (originFranchiseId exists),
    // user MUST belong to that franchise.
    // SUPER_ADMIN is exempt.
    if (originFranchiseId && user.role !== 'SUPER_ADMIN') {
      if (user.franchise_id !== originFranchiseId) {
        throw new UnauthorizedException('You do not have access to this franchise');
      }
    }

    // SYSTEM DOMAIN PROTECTION:
    // If request comes from System (originFranchiseId is null/undefined),
    // ONLY SUPER_ADMIN or users explicitly without franchise (if any) can login.
    // Franchise Users/Admins MUST login via their Franchise URL.
    if (!originFranchiseId && user.franchise_id && user.role !== 'SUPER_ADMIN') {
      throw new UnauthorizedException('Please login via your Franchise URL');
    }

    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role,
      franchise_id: user.franchise_id || null,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: this.normalizeRole(user.role),
        avatar_url: user.avatar_url,
        bio: user.bio,
        franchise_id: user.franchise_id || null,
        franchise: user.franchise || null,
      },
    };
  }

  async register(createUserDto: CreateUserDto) {
    // Check if user exists
    const existingUser = await this.usersService.findOne(createUserDto.email);
    if (existingUser) {
      throw new UnauthorizedException('User already exists'); // Or ConflictException
    }
    return this.usersService.create(createUserDto);
  }

  async getUserProfile(userId: string) {
    const user = await this.usersService.findById(userId);
    if (!user) return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: this.normalizeRole(user.role),
      avatar_url: user.avatar_url,
      bio: user.bio,
      franchise_id: (user as any).franchise_id || null,
      franchise: (user as any).franchise || null,
    };
  }

  private normalizeRole(role: string): string {
    if (role === 'INSTRUCTOR') return 'teacher';
    if (role === 'SUPER_ADMIN') return 'super_admin';
    if (role === 'FRANCHISE_ADMIN') return 'FRANCHISE_ADMIN'; // Keep uppercase for frontend checks or consistency
    return role.toLowerCase();
  }
}

