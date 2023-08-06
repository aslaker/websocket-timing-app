import { Module } from '@nestjs/common';
import { TimerModule } from './timer/timer.module';

@Module({
  imports: [TimerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
