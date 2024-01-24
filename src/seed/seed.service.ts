import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { APIResponse } from './interfaces/poke-respose.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly http: AxiosAdapter
  ) { }

  async executeSeed() {

    await this.pokemonModel.deleteMany({});
    const { data } = await this.http.get<APIResponse>('pokemon?limit=650');

    const datMapped = data.results.map(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      return { name, no }
    });

    const insertData = await this.pokemonModel.insertMany(datMapped);

    return 'Seed Completed!';
  }


}
