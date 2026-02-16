import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { CertificatesService } from './certificates.service';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Certificates')
@Controller('certificates')
export class CertificatesController {
    constructor(private readonly certificatesService: CertificatesService) { }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get my certificates' })
    getMyCertificates(@Request() req) {
        const userId = req.user?.id || 1;
        return this.certificatesService.getMyCertificates(userId);
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get certificate by ID' })
    getCertificateById(@Param('id') id: string, @Request() req) {
        const userId = req.user?.id || 1;
        return this.certificatesService.getCertificateById(parseInt(id), userId);
    }

    @Get(':id/download')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Download certificate PDF (placeholder)' })
    downloadCertificate(@Param('id') id: string, @Request() req) {
        const userId = req.user?.id || 1;
        return this.certificatesService.downloadCertificate(parseInt(id), userId);
    }
}
