import { ApiProperty } from '@nestjs/swagger';
import { IFishLocation } from '../interfaces/fish.interface';

const monthProperty = {
  oneOf: [
    {
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'All day',
          '9 AM - 4 PM',
          '4 PM - 9 AM',
          '9 PM - 4 AM',
          '4 AM - 9 PM',
        ],
      },
    },
    { type: 'undefined' },
  ],
};
const availabilityProperties = {
  january: monthProperty,
  february: monthProperty,
  march: monthProperty,
  april: monthProperty,
  may: monthProperty,
  june: monthProperty,
  july: monthProperty,
  august: monthProperty,
  september: monthProperty,
  october: monthProperty,
  november: monthProperty,
  december: monthProperty,
};

class Availability {
  @ApiProperty({
    type: 'object',
    properties: availabilityProperties,
  })
  northern_hemisphere: Object;

  @ApiProperty({
    type: 'object',
    properties: availabilityProperties,
  })
  southern_hemisphere: Object;
}

export class FishDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  icon_image: string;

  @ApiProperty()
  critterpedia_image: string;

  @ApiProperty()
  furniture_image: string;

  @ApiProperty()
  minimum_catches_to_spawn: number;

  @ApiProperty()
  sale_price: number;

  @ApiProperty()
  spawn_frequency: string;

  @ApiProperty({
    enum: [
      'River',
      'Pond',
      'River (clifftop)',
      'River (mouth)',
      'Sea',
      'Pier',
      'Sea (rainy days)',
    ],
  })
  location: IFishLocation;

  @ApiProperty()
  shadow_size: string;

  @ApiProperty()
  blathers_description: string;

  @ApiProperty()
  catch_phrase: string;

  @ApiProperty()
  availability: Availability;
}
