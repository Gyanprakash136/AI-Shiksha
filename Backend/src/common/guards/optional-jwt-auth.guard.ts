import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Optional JWT guard — populates req.user if a valid Bearer token is present,
 * but does NOT throw a 401 when no token is provided.
 * Use this on endpoints that need to support both authenticated and public access.
 */
@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
    handleRequest(err: any, user: any) {
        // Return the user if authenticated, or null/undefined if not — never throw
        return user || null;
    }
}
