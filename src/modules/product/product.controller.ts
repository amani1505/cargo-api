import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProductDto } from "./create-product.dto";

@Controller("product")
export class ProductController {
  constructor(private readonly _productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this._productService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this._productService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this._productService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateProductDto: CreateProductDto) {
    return this._productService.update(id, updateProductDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this._productService.remove(id);
  }
}
