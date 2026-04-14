import {
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
} from 'class-validator';

export class UpdateProductDto {
  @IsString({ message: 'Name must be a string' })
  @Length(2, 30, { message: 'Name length must be between 2 and 30 characters' })
  name: string;

  @IsNumber({}, { message: 'Price must be a number' })
  @IsPositive({ message: 'Price must be greater than 0' })
  price: number;

  @IsOptional()
  @IsString({ message: 'Description must be a string' })
  description: string;
}
