import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICustomersRepository from '@modules/customers/repositories/ICustomersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

export interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository') private ordersRepository: IOrdersRepository,
    @inject('ProductsRepository') private productsRepository: IProductsRepository,
    @inject('CustomersRepository') private customersRepository: ICustomersRepository,
  ) { }

  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customer = await this.customersRepository.findById(customer_id);
    if (!customer) {
      throw new AppError(`Customer ${customer_id} not find`);
    }

    const savedProducts = await this.productsRepository.findAllById(products);
    if (savedProducts.length !== products.length) {
      throw new AppError('Some of product has invalid id');
    }
    const finalProducts = products.map(pr => {
      const savedProduct = savedProducts.find(svPr => svPr.id === pr.id);
      return {
        product_id: pr.id,
        quantity: pr.quantity,
        price: savedProduct?.price || 0
      }
    });

    const order = {
      customer,
      products: finalProducts
    }
    const savedOrder = await this.ordersRepository.create(order);
    return savedOrder;
  }
}

export default CreateOrderService;
