import axios from 'axios';

import { BaseURL } from 'common/enums';

export const instance = axios.create({
  baseURL: BaseURL.DEVELOPMENT_URL,
  withCredentials: true,
});
