import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { HeaderManagerService } from '~/modules/headers-manager/header-manager.service';

import { GqlAuthGuard } from '~/shared/guards/gql-auth-guard';

import { CreateViewInput } from './dto/create-view.input';
import { UpdateViewInput } from './dto/update-view.input';
import { View } from './view.entity';
import { ViewService } from './view.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => View)
export class ViewResolver {
  constructor(
    private readonly viewService: ViewService,
    private readonly reqHeadersService: HeaderManagerService,
  ) {}

  @Mutation(() => View, { name: 'createView' })
  createView(
    @Context('req') req: Request,
    @Args('createViewInput') createViewInput: CreateViewInput,
  ) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);

    return this.viewService.create({ createViewInput, userId });
  }

  @Query(() => [View], { name: 'views' })
  findAll(@Context('req') req: Request) {
    const id = this.reqHeadersService.getUserIdFromRequest(req);

    return this.viewService.findAllById(id);
  }

  @Query(() => View, { name: 'view' })
  findOne(@Args('id') id: string, @Context('req') req: Request) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);

    return this.viewService.findOne({ id, userId });
  }

  @Mutation(() => View, { name: 'updateView' })
  updateView(
    @Args('updateViewInput') updateViewInput: UpdateViewInput,
    @Context('req') req: Request,
  ) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);

    return this.viewService.update({ updateViewInput, userId });
  }

  @Mutation(() => View, { name: 'deleteView' })
  delete(@Args('id') id: string, @Context('req') req: Request) {
    const userId = this.reqHeadersService.getUserIdFromRequest(req);

    return this.viewService.delete({ id, userId });
  }
}
