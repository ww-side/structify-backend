import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ViewService } from './view.service';
import { View } from './entities/view.entity';
import { CreateViewInput } from './dto/create-view.input';
import { UpdateViewInput } from './dto/update-view.input';

@Resolver(() => View)
export class ViewResolver {
  constructor(private readonly viewService: ViewService) {}

  @Mutation(() => View)
  createView(@Args('createViewInput') createViewInput: CreateViewInput) {
    return this.viewService.create(createViewInput);
  }

  @Query(() => [View], { name: 'views' })
  findAll() {
    return this.viewService.findAll();
  }

  @Query(() => View, { name: 'view' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.viewService.findOne(id);
  }

  @Mutation(() => View)
  updateView(@Args('updateViewInput') updateViewInput: UpdateViewInput) {
    return this.viewService.update(updateViewInput.id, updateViewInput);
  }

  @Mutation(() => View)
  removeView(@Args('id', { type: () => Int }) id: number) {
    return this.viewService.remove(id);
  }
}
