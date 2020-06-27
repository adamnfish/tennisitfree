Tennis court availability tool
==============================

Hard-coded to Finsbury Park, at present.

## Usage

### Setup

    npm install

### Running the checker

    npm run cli [date arg]

With no date argument provided it will default to today. You can specify a date argument in the following formats:

    npm run cli today
    npm run cli tomorrow
    npm run cli +2

The magic words `today` and `tomorrow` will get the court availabiity for today and tomorrow respecitvely. You can also use `+n` to ask for the availabilty `n` days into the future. `+1` is the same as `tomorrow`, `+2` is the day after that and so on.
