import fs from 'node:fs';

const themes = require('./themes.json');

themes.forEach((theme) => {
  fs.writeFileSync(
    `./colorSchemes/${theme.name}.json`,
    JSON.stringify(theme, null, 2)
  );
});
