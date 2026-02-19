import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { PrismaService } from '../../prisma/prisma.service';

@ApiTags('Uploads')
@Controller('upload')
export class VideoCallbackController {
    private readonly logger = new Logger(VideoCallbackController.name);

    constructor(private readonly prisma: PrismaService) { }

    @Post('callback')
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads/Video',
                filename: (req, file, cb) => {
                    // Use the video_id from the body if available, otherwise random
                    // Note: In multer, req.body might not be fully populated yet depending on order
                    // But for filename generation we usually want a safe random name or the original name
                    // Let's stick to the existing pattern or use video_id if we can ensure it's passed first.
                    // For safety, let's just generate a clean name.
                    const randomName = Array(32)
                        .fill(null)
                        .map(() => Math.round(Math.random() * 16).toString(16))
                        .join('');
                    return cb(null, `${randomName}${extname(file.originalname)}`);
                },
            }),
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                video_id: {
                    type: 'string',
                },
                organization_id: {
                    type: 'string',
                },
            },
        },
    })
    @ApiOperation({ summary: 'Callback from Video Compression Service' })
    async handleCallback(
        @UploadedFile() file: any,
        @Body() body: { video_id: string; organization_id: string },
    ) {
        if (!file) {
            throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
        }

        const { video_id, organization_id } = body;
        this.logger.log(`Received callback for video_id: ${video_id}, org: ${organization_id}`);

        if (!video_id) {
            throw new HttpException('video_id is required', HttpStatus.BAD_REQUEST);
        }

        const videoUrl = `/uploads/Video/${file.filename}`;

        await this.prisma.systemSetting.upsert({
            where: { key: `video_upload:${video_id}` },
            update: { value: videoUrl },
            create: {
                key: `video_upload:${video_id}`,
                value: videoUrl,
                description: 'Uploaded compressed video URL',
            },
        });

        return { status: 'ok', url: videoUrl };
    }

    @Post('check-status')
    @ApiBody({ schema: { properties: { video_id: { type: 'string' } } } })
    async checkStatus(@Body() body: { video_id: string }) {
        const { video_id } = body;
        const setting = await this.prisma.systemSetting.findUnique({
            where: { key: `video_upload:${video_id}` },
        });

        if (setting) {
            return { status: 'completed', url: setting.value };
        }
        return { status: 'pending' };
    }
}
