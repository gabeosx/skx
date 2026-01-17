import { Downloader } from './src/utils/downloader.ts';
import * as fs from 'fs';
import * as path from 'path';

async function run() {
  const target = path.resolve('./temp-download-test');
  
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }

  const url = 'https://github.com/anthropics/skills/tree/main/skills/pptx';
  
  console.log(`Downloading from ${url} to ${target}...`);
  try {
    await Downloader.download(url, target);
    console.log('Download complete.');
    
    if (fs.existsSync(target)) {
        const files = fs.readdirSync(target);
        console.log(`Found ${files.length} files/folders.`);
        if (files.length > 0) {
             console.log('Success: Files were downloaded.');
             console.log('Files:', files);
        } else {
             console.error('Failure: Target directory is empty.');
        }
    } else {
        console.error('Failure: Target directory not created.');
    }
  } catch (e) {
    console.error('Error:', e);
  }
}

run();