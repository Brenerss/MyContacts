import APIError from '../../errors/APIError';
import { delay } from '../../utils/delay';

class HttpClient {
  constructor(url) {
    this.baseURL = url;
  }

  async get(path) {
    await delay(1000);

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'GET',
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

  async post(path, body) {
    await delay(1000);

    const headers = new Headers({
      'Content-Type': 'application/json',
    });

    const response = await fetch(`${this.baseURL}${path}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    });

    let responseBody = null;
    const contentTypeHeaders = response.headers.get('Content-Type');

    if (contentTypeHeaders?.includes('application/json')) {
      responseBody = await response.json();
    }

    if (response.ok) {
      return responseBody;
    }

    throw new APIError(response, responseBody);
  }
}

export default HttpClient;
