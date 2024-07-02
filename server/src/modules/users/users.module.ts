import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { DatabaseModule } from 'src/database/database.module';
import { UsersController } from './users.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController,],
  providers: [UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
