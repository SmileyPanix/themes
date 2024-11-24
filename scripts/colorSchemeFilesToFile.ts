import fs from 'node:fs';

import {colorScheme} from '@/types';

const files = fs.readdirSync('./colorSchemes');

const colorSchemes: colorScheme[] = [];

files.forEach((file) => {
  const buffer = fs.readFileSync(`./colorSchemes/${file}`);
  const colorScheme = JSON.parse(buffer.toString());
  colorSchemes.push(colorScheme);
});

fs.writeFileSync('./colorSchemes.json', JSON.stringify(colorSchemes));
