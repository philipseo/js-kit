import { readFile } from 'node:fs/promises';

interface GetPackageJsonProps {
  /* package.json path */
  path: string;
}

async function getPackageJson({ path }: GetPackageJsonProps) {
  try {
    const packageJson = await readFile(path, {
      encoding: 'utf-8',
    });

    return JSON.parse(packageJson);
  } catch (error) {
    console.error('❗ getPackageJson Error: ', error);
    throw error;
  }
}

export default getPackageJson;
