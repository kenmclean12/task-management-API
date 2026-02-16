import { OmitType, PartialType } from '@nestjs/swagger';
import { JobCreateDto } from './job-create-dto';

export class JobUpdateDto extends PartialType(
  OmitType(JobCreateDto, ['projectId'] as const),
) {}
