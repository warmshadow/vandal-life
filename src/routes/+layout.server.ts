import { promises as fsp } from 'fs';
import path from 'path';

import { fetchLayoutData } from '../utils/helpers';

export async function load() {
	try {
		return await fetchLayoutData({ path, fsp });
	} catch (error) {
		console.error('Error reading files:', error);
		throw error;
	}
}
