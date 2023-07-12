import { FishDto } from 'src/fishes/dto/fish.dto';

export const FishDtoStub = (): FishDto => ({
  name: 'piranha',
  icon_image: 'https://acnhcdn.com/latest/MenuIcon/Fish32.png',
  critterpedia_image:
    'https://acnhcdn.com/latest/BookFishIcon/FishPiraniaCropped.png',
  furniture_image: 'https://acnhcdn.com/latest/FtrIcon/FtrFishPirania.png',
  minimum_catches_to_spawn: 20,
  sale_price: 2500,
  spawn_frequency: '1-3',
  location: 'River',
  shadow_size: 'Small',
  blathers_description:
    "I am not exactly a fan of the piranha, despite knowing that they're mostly harmless. But those nasty, pointy teeth, Hoo. These infamous little blighters will attack when in groups. Imagine all of those hundreds of tiny teeth! To think that they're floundering about our peaceful waters, just waiting to strike. Well, never fear— I shall keep THIS one under the strictest lock and key, with nary a bathroom break allowed!",
  catch_phrase: 'I caught a piranha! Sure hope it was the only one!',
  availability: {
    northern_hemisphere: {
      june: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
      july: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
      august: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
      september: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
    },
    southern_hemisphere: {
      january: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
      february: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
      march: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
      december: ['9 AM - 4 PM', ' 9 PM - 4 AM'],
    },
  },
});
