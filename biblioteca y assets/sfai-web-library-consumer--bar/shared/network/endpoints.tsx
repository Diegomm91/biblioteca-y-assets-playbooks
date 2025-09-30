import { currentHost } from '../globals';

export function buildAbsURL(endpoint: string): string {
  return `${currentHost()}${endpoint}`;
}

const SFAI_WEB_ENDPOINTS = {
  HOME: {
    THIS: '/',
    PRIVACY_POLICY: '/privacy-policy',
    TERMS_AND_CONDITIONS: '/terms-and-conditions'
  },
};

export default SFAI_WEB_ENDPOINTS;
