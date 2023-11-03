import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [IngredientsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
