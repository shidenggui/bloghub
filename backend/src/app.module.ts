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
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_TYPE, DATABASE_USERNAME, SENTRY_DSN } from '../settings';
import { CommandModule } from 'nestjs-command';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryModule } from '@ntegral/nestjs-sentry/dist/sentry.module';
import { LogLevel } from '@sentry/types';
import config from './ormconfig';


const imports = [
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
  TypeOrmModule.forRoot(config),
];

if (SENTRY_DSN) {
  imports.push(
    SentryModule.forRoot({
      dsn: SENTRY_DSN,
      debug: true,
      logLevel: LogLevel.Debug,
      release: null,
      environment: process.env.NODE_ENV === 'production' ? 'production' : 'dev'
    }))
}

@Module({
  imports,
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {
}
