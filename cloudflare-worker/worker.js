/**
 * Cloudflare Worker: GitHub OAuth Device Flow CORS Proxy
 * 
 * This worker proxies requests to GitHub's OAuth endpoints,
 * adding CORS headers so browser-based apps can use Device Flow.
 * 
 * Deploy to Cloudflare Workers and update the WORKER_URL in docs/index.html
 */

const ALLOWED_ORIGINS = [
  'https://department-of-veterans-affairs.github.io',
  'http://localhost:3000',
  'http://127.0.0.1:3000'
];

function getCorsHeaders(request) {
  const origin = request.headers.get('Origin');
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
  };
}

async function handleOptions(request) {
  return new Response(null, {
    status: 204,
    headers: getCorsHeaders(request)
  });
}

async function handleDeviceCode(request) {
  const body = await request.json();
  
  const response = await fetch('https://github.com/login/device/code', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(request)
    }
  });
}

async function handleAccessToken(request) {
  const body = await request.json();
  
  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  
  return new Response(JSON.stringify(data), {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
      ...getCorsHeaders(request)
    }
  });
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return handleOptions(request);
    }

    // Route requests
    if (request.method === 'POST') {
      if (url.pathname === '/device/code') {
        return handleDeviceCode(request);
      }
      if (url.pathname === '/access_token') {
        return handleAccessToken(request);
      }
    }

    return new Response('Not Found', { status: 404 });
  }
};
