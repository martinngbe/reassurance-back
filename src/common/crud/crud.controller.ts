import { 
  Body, Delete, Get, Param, ParseIntPipe, Post, Put, Query 
} from '@nestjs/common';
import { CrudService, PaginationParams } from './crud.service';

export abstract class CrudController<T extends { id: number }, CreateDto, UpdateDto> {
  protected constructor(protected readonly service: CrudService<T>) {}

  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    // Conversion des strings de l'URL en nombres avec des valeurs par défaut
    const pagination: PaginationParams = {
      page: page ? parseInt(page, 10) : 1,
      limit: limit ? parseInt(limit, 10) : 10,
    };
    const resulat = await this.service.findAllPaginated(pagination);
    console.log("_________ CrudController.findAll ___________")
    console.log("resulat:",resulat)
    return resulat;
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateDto) {
    return this.service.create(dto as any);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateDto) {
    return this.service.update(id, dto as any);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}