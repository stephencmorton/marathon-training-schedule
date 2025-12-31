## marathon-training-program

This provides a simple web-based tool for running groups to post marathon training programs to the web that auto-adjust to
fit your upcoming race dates.

The program also provides you a good indication of your training paces based on your goal race pace.
### Installing
Just unzip the latest release into your website.

### Adding Races
- Races can be added to the `src/public/races.json` file before building, but the races.json file is separate in the built version, so it can be added after the fact to update races every year without having to rebuild the application.

### Adding Training Programs
Like races, training programs can be added to the live deployment.
- Training programs can be added to `src/public/programs/<program>.json` .
- You must also update the index in `src/public/programs/programs.json` .
