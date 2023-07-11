import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FishDocument = HydratedDocument<Fish>;

type IFishLocation =
  | 'River'
  | 'Pond'
  | 'River (clifftop)'
  | 'River (mouth)'
  | 'Sea'
  | 'Pier'
  | 'Sea (rainy days)';

type IPeriodOfDay =
  | 'All day'
  | '9 AM - 4 PM'
  | '4 PM - 9 AM'
  | '9 PM - 4 AM'
  | '4 AM - 9 PM';

export type IMonth =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december';

type IAvailability<T extends IMonth, U extends IPeriodOfDay[]> = {
  [K in T]?: U;
};

@Schema()
class Availability {
  @Prop({ required: true, type: Object })
  northern_hemisphere: IAvailability<IMonth, IPeriodOfDay[]>;

  @Prop({ required: true, type: Object })
  southern_hemisphere: IAvailability<IMonth, IPeriodOfDay[]>;
}

@Schema()
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
