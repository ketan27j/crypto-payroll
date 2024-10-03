import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    console.log('image api called for: ', req.url);
    if(!req?.url) { return res.status(500); }
    if(req.url.indexOf('..') >= 0) { return res.status(400); }

    try {
        // const filePath = path.join(process.cwd(), 'public', dir);
        const partialPath = req.url.replace('/assets', '');
        const filePath = path.join(process.cwd(), 'public', ...partialPath.split('/').slice(4));
        console.log(`filepath is: ${filePath}`);

        // Read and serve the file
        const data = await fs.promises.readFile(filePath);
        return new Response(data, {});
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch file' });
    }
}