import { Test, TestingModule } from '@nestjs/testing';
import { SubDomainController } from './sub-domain.controller';

describe('SubDomain Controller', () => {
  let controller: SubDomainController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubDomainController],
    }).compile();

    controller = module.get<SubDomainController>(SubDomainController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
