import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { VideoCallbackController } from './video-callback.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [UploadController, VideoCallbackController],
})
export class UploadModule { }
