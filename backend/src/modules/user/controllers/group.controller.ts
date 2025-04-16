import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupDto } from '../models/dtos/group.dto';
import { GroupService } from '../services/contracts/group.service.contract';
import { InjectMapper, MapperInterface } from '@mappers/nest';

@ApiTags('Group')
@Controller('v1/group')
export class GroupController {
  constructor(
    @InjectMapper() private mapper: MapperInterface,
    private readonly groupService: GroupService,
  ) {}

  @ApiResponse({ type: [GroupDto] })
  @Get('getAll')
  async getAll(): Promise<GroupDto[]> {
    const groups = await this.groupService.getAll();
    return this.mapper.autoMap(groups, GroupDto);
  }
}
