import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';
@Module({
    providers: [
        {
            provide: AxiosAdapter,
            useFactory: () => new AxiosAdapter('https://pokeapi.co/api/v2/'),
        }],
    exports: [AxiosAdapter],
})
export class CommonModule { }
