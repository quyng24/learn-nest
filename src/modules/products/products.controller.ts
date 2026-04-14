import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  PipeTransform,
  Post,
} from '@nestjs/common';
import type { Request } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { REQUEST } from '@nestjs/core';

interface CreateDto {
  name: string;
}

export class ValidationPipe implements PipeTransform {
  constructor(@Inject(REQUEST) private readonly request: Request) {}
  transform(value: CreateDto): CreateDto {
    const id = this.request['params'].id;
    const { name } = value;
    if (name === 'TV 1' && +id === 5) {
      throw new BadRequestException('error');
    }
    return value;
  }
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getAll() {
    return this.productsService.findAll();
  }

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Patch('/:id')
  updateProduct(
    @Param('id') id: string,
    @Body(ValidationPipe) productData: UpdateProductDto,
  ) {
    return this.productsService.update(+id, productData);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    return this.productsService.delete(+id);
  }
}
