import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from 'src/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  private async ensureExists(id: number): Promise<ProductEntity> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  findAll() {
    return this.productRepository.find();
  }

  async findOne(id: number) {
    const productId = await this.productRepository.findOneBy({ id });
    if (!productId) throw new NotFoundException('Product id not found!');
    return productId;
  }

  create(productData: Partial<ProductEntity>) {
    const product = this.productRepository.create(productData);
    return this.productRepository.save(product);
  }

  async update(id: number, productData: Partial<ProductEntity>) {
    const product = await this.productRepository.preload({
      id,
      ...productData,
    });

    if (!product)
      throw new NotFoundException(`Product with id ${id} not found`);

    return this.productRepository.save(product);
  }

  async delete(id: number) {
    const product = await this.ensureExists(id);
    if (!product) throw new NotFoundException('Product id not found!');
    await this.productRepository.remove(product);
    return { deleted: true };
  }
}
