import { Body, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CrudService } from './crud.service';

/**
 * Contrôleur CRUD générique. Les contrôleurs d'entité étendent cette
 * classe et fournissent uniquement leur route (@Controller) et leur
 * service, ce qui évite de dupliquer les 5 routes REST standards
 * (GET liste, GET détail, POST, PUT, DELETE) sur chaque module.
 */
export abstract class CrudController<T extends { id: number }, CreateDto, UpdateDto> {
  protected constructor(protected readonly service: CrudService<T>) {}

  @Get()
  findAll() {
    return this.service.findAll();
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
