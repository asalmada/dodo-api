import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Fish } from './schemas/fish.schema';
import { IQueryParams } from './interfaces/fish.interface';

@Injectable()
export class FishesService {
  constructor(@InjectModel(Fish.name) private fishModel: Model<Fish>) {}

  private formatTime(time: string): string[] {
    const formattedTime = ['All day'];
    const [hour, period] = time.split(' '); // Controller will reject requests not following the pattern 1 AM, 10 PM, etc...
    const parsedHour = Number(hour);

    if (period === 'AM') {
      if (parsedHour === 12 || (parsedHour >= 1 && parsedHour < 4)) {
        // Between midnight and 4 AM
        formattedTime.push('4 PM - 9 AM');
        formattedTime.push('9 PM - 4 AM');
      } else if (parsedHour >= 4 && parsedHour < 9) {
        // Between 4 AM and 9 AM
        formattedTime.push('4 PM - 9 AM');
        formattedTime.push('4 AM - 9 PM');
      } else {
        // Between 9 AM and noon
        formattedTime.push('4 AM - 9 PM');
        formattedTime.push('9 AM - 4 PM');
      }
    } else {
      if (parsedHour === 12 || (parsedHour >= 1 && parsedHour < 4)) {
        // Between noon and 4 PM
        formattedTime.push('9 AM - 4 PM');
        formattedTime.push('4 AM - 9 PM');
      } else if (parsedHour >= 4 && parsedHour < 9) {
        // Between 4 PM and 9 PM
        formattedTime.push('4 AM - 9 PM');
        formattedTime.push('4 PM - 9 AM');
      } else {
        // Between 9 PM and midnight
        formattedTime.push('4 PM - 9 AM');
        formattedTime.push('9 PM - 4 AM');
      }
    }

    return formattedTime;
  }

  public find(queryParams: IQueryParams): Promise<Fish[]> {
    const buildQuery = () => {
      if (!queryParams.month) return {};

      // If request informed a desired hour, we must obtain all possible active hours that contemplates it
      let formattedTime;
      if (queryParams.time) formattedTime = this.formatTime(queryParams.time);

      // If request informed a desired hemisphere, we should exclude the other one
      let hemispheres = ['northern_hemisphere', 'southern_hemisphere'];
      if (queryParams.hemisphere)
        hemispheres = hemispheres.filter((h) => h === queryParams.hemisphere);

      let query = [];
      for (const hemisphere of hemispheres) {
        query.push({
          [`availability.${hemisphere}.${queryParams.month}`]: formattedTime
            ? {
                $in: formattedTime,
              }
            : {
                $exists: true,
              },
        });
      }

      return {
        $or: query,
      };
    };

    const query = buildQuery();
    return this.fishModel.find(query).exec();
  }

  public findOne(name: string): Promise<Fish | null> {
    return this.fishModel.findOne({ name }).exec();
  }
}
