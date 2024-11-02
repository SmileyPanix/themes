import fs from 'node:fs';

const ITEM2_REPO =
  'https://api.github.com/repos/mbadolato/iTerm2-Color-Schemes/contents/windowsterminal';
const headers = {
  'User-Agent': 'Windows Terminal Themes',
  Authorization: `Basic ${btoa(`atomcorp:${process.env.GITHUB_TOKEN}`)}`,
  Accept: 'application/vnd.github+json',
};

type Repo = {
  name: string;
};

const getExternalThemes = async () => {
  const dirResponse = await fetch(ITEM2_REPO, {headers});
  const dir = await dirResponse.json();
  const filesResponse = await fetch(`${ITEM2_REPO}/${encodeURI(dir[0].name)}`, {
    headers,
  });
  const json = await filesResponse.json();
  console.log(JSON.parse(atob(json.content)));

  fs.writeFileSync('./__generated__/test.json', atob(json.content));

  // const colorSchemeFiles = await response
  //   .map((itermDirFile) => itermDirFile.name)
  //   .map((title) => console.log(title));
  // return colorSchemeFiles;
};

getExternalThemes();

export default getExternalThemes;
