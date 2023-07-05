const fs = require('fs');
const { parse } = require('csv-parse');

const months = {
  1: 'january',
  2: 'february',
  3: 'march',
  4: 'april',
  5: 'may',
  6: 'june',
  7: 'july',
  8: 'august',
  9: 'september',
  10: 'october',
  11: 'november',
  12: 'december',
};

const csv_file_path = "./input.csv"

fs.createReadStream(csv_file_path)
  .pipe(parse({ delimiter: ',', from_line: 2 }))
  .on('data', (row) => {
    // Removes undesired chars
    let fixedRow = row.replace(" ", " ").replace("–", "-")

    const handleAvailability = () => {
      const availability = {
        northern_hemisphere: {},
        southern_hemisphere: {},
      };

      // north
      for (let i = 12; i < 24; i++) {
        if (fixedRow[i] === 'NA') continue;

        const times = fixedRow[i].split(';');
        // @ts-expect-error
        availability.northern_hemisphere[months[i - 11]] = times;
      }

      //south
      for (let i = 24; i < 36; i++) {
        if (fixedRow[i] === 'NA') continue;

        const times = fixedRow[i].split(';');
        // @ts-expect-error
        availability.southern_hemisphere[months[i - 23]] = times;
      }

      return availability;
    };

    const availability = handleAvailability();

    const fish = {
      name: row[1],
      icon_image: row[2],
      critterpedia_image: row[3],
      furniture_image: row[4],
      minimum_catches_to_spawn: Number(row[10]),
      sale_price: Number(row[5]),
      spawn_frequency: row[11],
      location: row[6],
      shadow_size: row[7],
      blathers_description: row[38],
      catch_phrase: row[39],
      availability,
    };

    const createdFish = new this.fishModel(fish);
    createdFish.save();
  });
