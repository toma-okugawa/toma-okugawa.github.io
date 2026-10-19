import type { APIContext } from 'astro';
import { notesFeed } from '../lib/feed';

export const GET = (context: APIContext) => notesFeed('ja', context);
