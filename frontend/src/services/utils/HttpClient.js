import APIError from '../../errors/APIError';

class HttpClient {
  constructor(url) {
    this.baseURL = url;
  }

  async get(path, data) {
    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'GET',
      body: data && JSON.stringify({ ...data }),
      keepalive: true,
    });

    let body = null;

    const contentTypeHeaders = response.headers.get('Content-Type');

    if (contentTypeHeaders?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }

  async post(path, data, contentType = 'application/json') {
    let body = null;

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': contentType,
        Accept: 'application/json',
      },
      body: JSON.stringify({ ...data }),
      keepalive: true,
    });
    const contentTypeHeaders = response.headers.get('Content-Type');

    if (contentTypeHeaders?.includes('application/json')) {
      body = await response.json();
    }

    if (response.ok) {
      return body;
    }

    throw new APIError(response, body);
  }
}

export default HttpClient;
