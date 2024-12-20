import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/clicks.json');

async function getClicks() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    return JSON.parse(data);
  } catch {
    await fs.writeFile(dataFilePath, JSON.stringify({ clicks: 0 }));
    return { clicks: 0 };
  }
}

export async function GET() {
  const data = await getClicks();
  return NextResponse.json(data);
}

export async function POST() {
  const data = await getClicks();
  const newData = { clicks: data.clicks + 1 };
  await fs.writeFile(dataFilePath, JSON.stringify(newData));
  return NextResponse.json(newData);
} 