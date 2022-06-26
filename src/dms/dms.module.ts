import { Module } from '@nestjs/common';
import { DmsService } from './dms.service';
import { DmsController } from './dms.controller';
import { Users } from 'src/users/entities/Users';
import { Workspaces } from '../workspaces/entities/Workspaces';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DMs } from './entities/DMs';

@Module({
  imports: [TypeOrmModule.forFeature([DMs, Users, Workspaces])],
  providers: [DmsService],
  controllers: [DmsController],
})
export class DmsModule {}
