import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Get,
    Param,
    Res,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiConsumes, ApiBody, ApiOperation } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Response } from 'express';
import * as fs from 'fs';

@ApiTags('Uploads')
@Controller('upload')
export class UploadController {
    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: (req, file, cb) => {
                    let folder = './uploads/Files';
                    if (file.mimetype.startsWith('image/')) {
                        folder = './uploads/Image';
                    } else if (file.mimetype.startsWith('video/')) {
                        folder = './uploads/Video';
                    }

                    // Ensure directory exists
                    if (!fs.existsSync(folder)) {
                        fs.mkdirSync(folder, { recursive: true });
                    }

                    cb(null, folder);
                },
                filename: (req, file, cb) => {
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
            },
        },
    })
    @ApiOperation({ summary: 'Upload a file' })
    uploadFile(@UploadedFile() file: any) {
        if (!file) {
            throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
        }

        // Determine subfolder based on mimetype to return correct URL
        let subfolder = 'Files';
        if (file.mimetype.startsWith('image/')) {
            subfolder = 'Image';
        } else if (file.mimetype.startsWith('video/')) {
            subfolder = 'Video';
        }

        return {
            url: `/uploads/${subfolder}/${file.filename}`,
            filename: file.filename,
            originalName: file.originalname,
            size: file.size,
            mimetype: file.mimetype,
        };
    }
}
