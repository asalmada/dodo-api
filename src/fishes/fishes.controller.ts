import {
  Controller,
  Get,
  Query,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiQuery,
  ApiBadRequestResponse,
} from '@nestjs/swagger';

import { FishesService } from './fishes.service';

import { Fish } from './schemas/fish.schema';
import { IQueryParams, IMonth } from './interfaces/fish.interface';
import { FishDto } from './dto/fish.dto';

const hemispheres = ['northern_hemisphere', 'southern_hemisphere'];
const months = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];
const times = [
  '12 AM',
  '1 AM',
  '2 AM',
  '3 AM',
  '4 AM',
  '5 AM',
  '6 AM',
  '7 AM',
  '8 AM',
  '9 AM',
  '10 AM',
  '11 AM',
  '12 PM',
  '1 PM',
  '2 PM',
  '3 PM',
  '4 PM',
  '5 PM',
  '6 PM',
  '7 PM',
  '8 PM',
  '9 PM',
  '10 PM',
  '11 PM',
];

@ApiTags('Fishes')
@Controller('fishes')
export class FishesController {
  constructor(private fishesService: FishesService) {}

  // Query params verifiers
  private isOfTypeIMonth(month: string): month is IMonth {
    return months.includes(month);
  }

  private isValidHemisphere(hemisphere: string): boolean {
    return hemispheres.includes(hemisphere);
  }

  private isValidTime(time: string): boolean {
    return times.includes(time);
  }

  // Routes
  @Get()
  @ApiOperation({ summary: 'Obtain all fishes' })
  @ApiQuery({
    name: 'hemisphere',
    enum: hemispheres,
    required: false,
  })
  @ApiQuery({
    name: 'month',
    enum: months,
    required: false,
  })
  @ApiQuery({
    name: 'time',
    enum: times,
    required: false,
  })
  @ApiOkResponse({
    description: "The found fish records by request's criteria",
    type: FishDto,
    isArray: true,
  })
  @ApiBadRequestResponse({
    description:
      'Invalid query param informed or searching by active hours without informing a month',
  })
  public getFishes(@Query() query: IQueryParams): Promise<Fish[]> {
    if (query.month && !this.isOfTypeIMonth(query.month))
      throw new HttpException(
        `Invalid month informed: ${query.month}`,
        HttpStatus.BAD_REQUEST,
      );

    if (query.hemisphere && !this.isValidHemisphere(query.hemisphere))
      throw new HttpException(
        `Invalid hemisphere informed: ${query.hemisphere}`,
        HttpStatus.BAD_REQUEST,
      );

    if (query.time && !this.isValidTime(query.time))
      throw new HttpException(
        `Invalid time informed: ${query.time}`,
        HttpStatus.BAD_REQUEST,
      );

    if (query.time && !query.month)
      throw new HttpException(
        "It's not possible to search by active hours without informing a month",
        HttpStatus.BAD_REQUEST,
      );

    return this.fishesService.find(query);
  }

  @Get(':name')
  @ApiOkResponse({
    description: 'The found fish record, or null, if not found',
    type: FishDto,
  })
  @ApiOperation({ summary: 'Obtain all information from a specific fish' })
  public getFish(@Param('name') name: string): Promise<Fish | null> {
    return this.fishesService.findOne(name);
  }
}
