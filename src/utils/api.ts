import { API_URL } from './constants';
import {IIngredientsItem, TSendOrder} from '../types';

interface IApi {
  readonly baseUrl: string;
  headers: {
    [key: string]: string;
  };
  readonly checker: (value: Response) => Response | PromiseLike<Response>;
}

export type TUserData = {
  email: string;
  password: string;
  name?: string;
}

class Api {
  private readonly baseUrl: string;
  private headers: {
    [key: string]: string;
  };
  private readonly checker: (value: Response) => Response | PromiseLike<Response>;

  constructor({ baseUrl, headers, checker }: IApi) {
    this.baseUrl = baseUrl;
    this.headers = headers;
    this.checker = checker;
  }

  getIngredients() {
    return fetch(`${this.baseUrl}/ingredients`, {
      headers: this.headers
    }).then(this.checker);
  }

  sendOrder(data: TSendOrder) {
    const orderedIngredients = [];

    data.ingredients.items.forEach(item => {
      orderedIngredients.push(item._id);
    });

    orderedIngredients.push(data.ingredients.bun?._id);
    orderedIngredients.push(data.ingredients.bun?._id);

    return fetch(`${this.baseUrl}/orders`, {
      headers: {
        authorization: String(localStorage.getItem('accessToken')),
        ...this.headers
      },
      method: 'POST',
      body: JSON.stringify({
        "ingredients": orderedIngredients
      })
    }).then(this.checker);
  }

  signUp(data: TUserData) {
    return fetch(`${this.baseUrl}/auth/register`,{
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this.checker);
  }

  signIn(data: TUserData) {
    return fetch(`${this.baseUrl}/auth/login`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this.checker);
  }

  signOut() {
    return fetch(`${this.baseUrl}/auth/logout`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(this.checker);
  }

  authUser() {
    if (localStorage.getItem('accessToken') && localStorage.getItem('refreshToken')) {
      return fetch(`${this.baseUrl}/auth/user`, {
        method: "GET",
        headers: {
          authorization: String(localStorage.getItem('accessToken')),
          ...this.headers
        },
      })
        .then(this.checker);
    }

    return Promise.reject('Пользователь не авторизован.')
  }

  updateUser(data: TUserData) {
    return fetch(`${this.baseUrl}/auth/user`, {
      method: 'PATCH',
      headers: {
        authorization: String(localStorage.getItem('accessToken')),
        ...this.headers
      },
      body: JSON.stringify(data)
    })
      .then(this.checker);
  }

  refreshToken() {
    return fetch(`${this.baseUrl}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: localStorage.getItem('refreshToken')
      })
    })
      .then(this.checker);
  }

  forgotPassword(data: TUserData) {
    return fetch(`${this.baseUrl}/password-reset`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this.checker);
  }

  resetPassword(data: TUserData) {
    return fetch(`${this.baseUrl}/password-reset/reset`, {
      headers: this.headers,
      method: 'POST',
      body: JSON.stringify(data)
    })
      .then(this.checker);
  }
}

export default new Api({
  baseUrl: API_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  checker: (res: Response) => {

    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка ${res.status}`);
  }
});
