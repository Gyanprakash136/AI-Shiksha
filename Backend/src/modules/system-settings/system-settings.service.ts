import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class SystemSettingsService {
    constructor(private prisma: PrismaService) { }

    async getTerms() {
        const setting = await this.prisma.systemSetting.findUnique({
            where: { key: 'terms_and_conditions' },
        });
        return { content: setting?.value || '' };
    }

    async updateTerms(content: string) {
        return this.prisma.systemSetting.upsert({
            where: { key: 'terms_and_conditions' },
            update: { value: content },
            create: { key: 'terms_and_conditions', value: content },
        });
    }
}
