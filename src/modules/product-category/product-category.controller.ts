import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductCategoryService } from "./product-category.service";
import { CreateProductCategoryDto } from "./create-product-category.dto";

@Controller("product-category")
export class ProductCategoryController {
  constructor(
    private readonly _productCategoryService: ProductCategoryService
  ) {}

  @Post()
  create(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return this._productCategoryService.create(createProductCategoryDto);
  }

  @Get()
  findAll() {
    return this._productCategoryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this._productCategoryService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateProductCategoryDto: CreateProductCategoryDto
  ) {
    return this._productCategoryService.update(id, updateProductCategoryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this._productCategoryService.remove(id);
  }
}
