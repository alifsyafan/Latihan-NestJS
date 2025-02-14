import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { CreateMahasiswaDTO } from './dto/create-mahasiswa.dto';
import { PassThrough } from 'stream';
import { plainToInstance } from 'class-transformer';
import { Response } from 'express';
import { User } from './entity/user.entity';
import { AuthGuard } from './auth.guard';
import { UserDecorator } from './user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Query } from '@nestjs/common'; // Import decorator Query
import { SearchMahasiswaDTO } from './dto/search-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // Endpoint pencarian mahasiswa menggunakan query
  @Get('mahasiswa/search')
  searchMahasiswa(@Query() filters: SearchMahasiswaDTO) {
    return this.appService.searchMahasiswa(filters);
  }

  @Post('mahasiswa/:nim/upload')
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
  @UseInterceptors(FileInterceptor(`file`))
  async uploadMahasiswaFoto(
    @UploadedFile() file: Express.Multer.File,
    @Param('nim') nim: string,
  ) {
    if (!file) throw new BadRequestException('File tidak boleh kosong');
    return this.appService.uploadMahasiswaFoto(file, nim);
  }

  @Get('mahasiswa/:nim/foto')
  async getMahasiswaFoto(@Param('nim') nim: string, @Res() res: Response) {
    const filename = await this.appService.getMahasiwaFoto(nim);
    return res.sendFile(filename, { root: 'uploads' });
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('mahasiswa')
  getMahasiswa() {
    return this.appService.getMahasiswa();
  }

  @Post('mahasiswa')
  @ApiBody({ type: CreateMahasiswaDTO })
  createMahasiswa(@Body() mahasiswa: CreateMahasiswaDTO) {
    return this.appService.addMahasiswa(mahasiswa);
  }

  @Delete('mahasiswa/:nim')
  deleteMahasiswa(@Param('nim') nim: string) {
    return this.appService.deleteMahasiswa(nim);
  }

  @Put('mahasiswa/:nim')
  @ApiBody({ type: CreateMahasiswaDTO })
  updateMahasiswa(
    @Param('nim') nim: string,
    @Body() mahasiswa: CreateMahasiswaDTO,
  ) {
    return this.appService.updateMahasiswa(nim, mahasiswa);
  }

  @Post('register')
  @ApiBody({ type: RegisterUserDTO })
  registerUser(@Body() user: RegisterUserDTO) {
    return this.appService.registerUser(user);
  }

  @Get('user')
  getUsers() {
    return this.appService.getUsers();
  }

  @Get('/auth')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user: User) {
    return user;
  }

  @Get('logout')
  getLogout(@Res() res: Response) {
    res.cookie('token', null, { maxAge: 0 });
    res.status(200).send({ message: 'Logout berhasil' });
  }
}