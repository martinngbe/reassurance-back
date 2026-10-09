import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Décorateur pour marquer une route ou un contrôleur comme public.
 * Les routes publiques ne nécessitent pas d'authentification JWT.
 * 
 * @example
 * // Sur une méthode
 * @Public()
 * @Get('login')
 * login() { ... }
 * 
 * // Sur un contrôleur entier
 * @Public()
 * @Controller('health')
 * export class HealthController { ... }
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);