import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import axios, { AxiosInstance } from 'axios';

import { APIResponse } from './interfaces/poke-respose.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>) { }

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {

    await this.pokemonModel.deleteMany({});
    const { data } = await this.axios.get<APIResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');

    const datMapped = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      return { name, no }
    });

    const insertData = await this.pokemonModel.insertMany(datMapped);

    return 'Seed Completed!';
  }


}
