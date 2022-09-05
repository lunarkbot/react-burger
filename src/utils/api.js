import { API_URL } from './constants';

class Api {
  constructor({ baseUrl, headers, checker }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._checker = checker;
  }

  getIngredients() {
    return fetch(`${this._baseUrl}/ingredients`, {
      headers: this._headers
    }).then(this._checker);
  }

  sendOrder(data) {
    const orderedIngredients = [];

    data.items.forEach(item => {
      orderedIngredients.push(item._id);
    });

    orderedIngredients.push(data.bun._id);
    orderedIngredients.push(data.bun._id);

    return fetch(`${this._baseUrl}/orders`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        "ingredients": orderedIngredients
      })
    }).then(this._checker);
  }

  signUp(data) {
    return fetch(`${this._baseUrl}/auth/register`,{
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this._checker);
  }

  signIn(data) {
    return fetch(`${this._baseUrl}/auth/login`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this._checker);
  }

  forgotPassword(data) {
    return fetch(`${this._baseUrl}/password-reset`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this._checker);
  }

  resetPassword(data) {
    return fetch(`${this._baseUrl}/password-reset/reset`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this._checker);
  }
}

export default new Api({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  checker: (res) => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }
});