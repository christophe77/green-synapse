export interface Config {
  apiUrl: string;
  environment: 'development' | 'production';
}

const getEnvironment = () => {
  if (typeof window !== 'undefined') {
    // Dans le navigateur
    return window.location.hostname === 'localhost' ? 'development' : 'production';
  }
  // Dans Node.js
  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

const getApiUrl = (env: string) => {
  switch (env) {
    case 'production':
      return 'http://vps-32f8344e.vps.ovh.net:3000';
    case 'development':
    default:
      return 'http://localhost:3000';
  }
};

const environment = getEnvironment();
const config: Config = {
  apiUrl: getApiUrl(environment),
  environment
};

export default config; 