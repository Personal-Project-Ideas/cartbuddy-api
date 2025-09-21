import { IsNumber, IsString } from 'class-validator';
export class ItemDto {
  @IsString()
  name!: string;
  @IsNumber()
  price!: number;
  @IsString()
  description?: string;
}
