import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';
import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { BlogRepository } from '../domains/hub/respositories/blog';

const definitionsFactory = new GraphQLDefinitionsFactory();

@Injectable()
export class GenerateTypingsByGraphqlCommand {
  constructor(
    private readonly blogRepository: BlogRepository,
  ) {
  }

  @Command({command: 'generate-typings-by-graphql', describe: 'Generate typing by graphql', autoExit: false})
  async run() {
    await definitionsFactory.generate({
      typePaths: ['../graphql/**/*.graphql'],
      path: join(process.cwd(), '../graphql/graphql.ts'),
      outputAs: 'interface',
      watch: true
    });

    return
  }
}

