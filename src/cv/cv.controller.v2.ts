import { BadRequestException, Body, Controller, Delete,Get,Param,  Post, Put, Query, Req, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { CvService } from "./cv.service";
import { CreateCvDto } from "./dto/create-cv.dto";
import { Cv } from "./entities/cv.entity";
import { PaginationService } from "src/services/pagination.service";
import { ImageUploadInterceptor } from "src/Interceptor/image-upload.Interceptor";



@Controller({ path: 'cv', version: '2' })
export class CvControllerV2 {
    constructor(private readonly cvService:CvService,    private readonly paginationService: PaginationService
    ) {    
    }

    @Get()
    async getAll(
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ) {
      const data = await this.paginationService.paginate<Cv>(
        this.cvService.getRepository(), // Use the repository from CvService
        page,
        limit,
      );
      return data;
    }
    @Post()
    async create(@Body() cvDto: CreateCvDto, @Req() req): Promise<Cv> {
    return this.cvService.createWithOwner({
        ...cvDto,
        userId: req.userId,
    });

    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCvDto, @Request() req) {
        
        
        return await this.cvService.updateIfOwner(id, updateCvDto, req.userId);
    }
    @Delete(':id')
    async remove(@Param('id') id: string, @Request() req) {
        
        
        return await  this.cvService.removeIfOwner(id, req.userId);
    }

    @Post('upload')
  @UseInterceptors(ImageUploadInterceptor.imageInterceptor())
  async uploadCvImage(@UploadedFile() file: Express.Multer.File,@Body() body: { cvId: string}) {
    if (!file) {
      throw new BadRequestException('No valid image uploaded');
    }
    const path = file.path;
    const updatedCv = await this.cvService.setImagePath(body.cvId, path);
    return {
      message: 'Image uploaded successfully',
      cv:updatedCv,
    };
  }
  

 

 

}