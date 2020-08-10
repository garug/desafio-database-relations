import { getRepository, Repository } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import Order from '../entities/Order';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({ customer, products }: ICreateOrderDTO): Promise<Order> {
    return { id: '', customer: customer, created_at: new Date(), updated_at: new Date(), order_products: [] };
  }

  public async findById(id: string): Promise<Order | undefined> {
    return undefined;
  }
}

export default OrdersRepository;
