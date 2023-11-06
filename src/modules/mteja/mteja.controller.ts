import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { MtejaService } from "./mteja.service";
import { CreateMtejaDto } from "./create-mteja.dto";

@Controller("mteja")
export class MtejaController {
  constructor(private readonly _mtejaService: MtejaService) {}

  @Post()
  create(@Body() createMtejaDto: CreateMtejaDto) {
    return this._mtejaService.create(createMtejaDto);
  }

  @Get()
  findAll() {
    return this._mtejaService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this._mtejaService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateMtejaDto: CreateMtejaDto) {
    return this._mtejaService.update(id, updateMtejaDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this._mtejaService.remove(id);
  }
}
