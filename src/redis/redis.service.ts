import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private client: Redis;

  constructor() {
    this.client = new Redis({
      host: 'localhost',
      port: 6379,
    });
  }

  async set(key: string, value: any, ttl?: number) {
    const data = JSON.stringify(value);

    if (ttl) {
      return this.client.set(key, data, 'EX', ttl);
    }

    return this.client.set(key, data);
  }

  async get(key: string) {
    const data = await this.client.get(key);
    return data ? JSON.parse(data) : null;
  }

  async del(key: string) {
    return this.client.del(key);
  }
}