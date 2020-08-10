import { getRepository, Repository, In } from 'typeorm';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';
import IUpdateProductsQuantityDTO from '@modules/products/dtos/IUpdateProductsQuantityDTO';
import Product from '../entities/Product';

interface IFindProducts {
  id: string;
}

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    return { id: '', order_products: [], name, price, quantity, created_at: new Date(), updated_at: new Date() };
  }

  public async findByName(name: string): Promise<Product | undefined> {
    return undefined;
  }

  public async findAllById(products: IFindProducts[]): Promise<Product[]> {
    return [{ id: '', order_products: [], name, price: 0, quantity: 0, created_at: new Date(), updated_at: new Date() }];
  }

  public async updateQuantity(
    products: IUpdateProductsQuantityDTO[],
  ): Promise<Product[]> {
    return [{ id: '', order_products: [], name, price: 0, quantity: 0, created_at: new Date(), updated_at: new Date() }];
  }
}

export default ProductsRepository;
