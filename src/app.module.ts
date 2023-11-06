import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngredientsModule } from './ingredients/ingredients.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RecipeModule } from './recipe/recipe.module';

@Module({
  imports: [IngredientsModule, PrismaModule, UserModule, AuthModule, RecipeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
