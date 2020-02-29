import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HubModule } from './hub/hub.module';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogTable } from './tables/blog';
import { ArticleTable } from './tables/article';
import { GraphQLDateTime } from 'graphql-iso-date';
import { GraphQLModule } from '@nestjs/graphql';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_TYPE, DATABASE_USERNAME } from '../settings';
import { CommandModule } from 'nestjs-command';
import { ScheduleModule } from '@nestjs/schedule';


@Module({
  imports: [
    HubModule,
    CommandModule,
    GraphQLModule.forRoot({
      typePaths: ['../graphql/**/*.graphql'],
      definitions: {
        path: join(process.cwd(), '../graphql/graphql.ts'),
      },
      resolvers: {DateTime: GraphQLDateTime},
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/.env`
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: DATABASE_TYPE as any,
      database: DATABASE_NAME,
      host: DATABASE_HOST,
      port: DATABASE_PORT,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
      charset: "utf8mb4",
      entities: [BlogTable, ArticleTable],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
