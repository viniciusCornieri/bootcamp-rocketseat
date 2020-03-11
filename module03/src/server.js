import { config as dotenvConfig } from 'dotenv';
import app from './app';

dotenvConfig();
app.listen(3333);
