import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { APIResponse } from './interfaces/poke-respose.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {
    const { data } = await this.axios.get<APIResponse>('https://pokeapi.co/api/v2/pokemon?limit=10');

    const datMapped = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      console.log({ name, no });
    })
    return data;
  }


}
