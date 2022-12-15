import axios from 'axios';

import { BaseURL } from 'common/enums';

export const instance = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? BaseURL.DEVELOPMENT_URL
      : BaseURL.PRODUCTION_URL,
  withCredentials: true,
});
