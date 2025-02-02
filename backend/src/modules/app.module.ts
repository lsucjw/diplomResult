import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { InfrastructureModule } from '../infrastructure/infrastructure.module';
import { EducationModule } from './education/education.module';

@Module({
  imports: [UserModule, EducationModule, InfrastructureModule],
})
export class AppModule {}
