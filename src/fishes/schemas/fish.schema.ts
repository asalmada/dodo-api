import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import {
  IMonth,
  IFishLocation,
  IPeriodOfDay,
  IAvailability,
} from '../interfaces/fish.interface';

export type FishDocument = HydratedDocument<Fish>;

@Schema({ versionKey: false })
class Availability {
  @Prop({ required: true, type: Object })
  northern_hemisphere: IAvailability<IMonth, IPeriodOfDay[]>;

  @Prop({ required: true, type: Object })
  southern_hemisphere: IAvailability<IMonth, IPeriodOfDay[]>;
}

@Schema({ versionKey: false })
export class Fish {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon_image: string;

  @Prop({ required: true })
  critterpedia_image: string;

  @Prop({ required: true })
  furniture_image: string;

  @Prop({ required: true })
  minimum_catches_to_spawn: number;

  @Prop({ required: true })
  sale_price: number;

  @Prop({ required: true })
  spawn_frequency: string;

  @Prop({ required: true })
  location: IFishLocation;

  @Prop({ required: true })
  shadow_size: string; // FIXME: Create type

  @Prop({ required: true })
  blathers_description: string;

  @Prop({ required: true })
  catch_phrase: string;

  @Prop({ required: true })
  availability: Availability;
}

export const FishSchema = SchemaFactory.createForClass(Fish);
