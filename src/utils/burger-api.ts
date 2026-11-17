import { getCookie, setCookie } from './cookie';

import type { TIngredient, TOrder, TUser } from './types';

const URL = process.env.BURGER_API_URL;

type TServerResponse<T = unknown> = { success: boolean } & T;
type TApiError = { message?: string; success?: boolean };

const readResponse = async <T>(response: Response): Promise<T> => {
  const data = (await response.json().catch(() => ({}))) as T & TApiError;
  if (!response.ok || data.success === false) {
    throw new Error(data.message ?? `РћС€РёР±РєР° Р·Р°РїСЂРѕСЃР°: ${response.status}`);
  }
  return data;
};

const refreshToken = async (): Promise<{
  accessToken: string;
  refreshToken: string;
}> => {
  const refresh = localStorage.getItem('refreshToken');
  if (!refresh)
    throw new Error(
      'РЎРµСЃСЃРёСЏ Р·Р°РІРµСЂС€РµРЅР°. Р’РѕР№РґРёС‚Рµ РІ Р°РєРєР°СѓРЅС‚ РїРѕРІС‚РѕСЂРЅРѕ.'
    );

  const response = await fetch(`${URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: refresh }),
  });
  const data =
    await readResponse<TServerResponse<{ accessToken: string; refreshToken: string }>>(
      response
    );
  localStorage.setItem('refreshToken', data.refreshToken);
  setCookie('accessToken', data.accessToken);
  return data;
};

export const fetchWithRefresh = async <T>(
  url: RequestInfo | URL,
  options: RequestInit = {}
): Promise<T> => {
  const send = (requestOptions: RequestInit): Promise<Response> =>
    fetch(url, requestOptions);

  const response = await send(options);
  if (response.ok) return readResponse<T>(response);

  const errorData = (await response
    .clone()
    .json()
    .catch(() => ({}))) as TApiError;
  if (
    errorData.message !== 'jwt expired' &&
    errorData.message !== 'jwt must be provided'
  ) {
    return readResponse<T>(response);
  }

  const tokens = await refreshToken();
  const headers = new Headers(options.headers);
  headers.set('authorization', tokens.accessToken);
  const retryResponse = await send({ ...options, headers });
  return readResponse<T>(retryResponse);
};

export const getIngredientsApi = async (): Promise<TIngredient[]> => {
  const data = await readResponse<TServerResponse<{ data: TIngredient[] }>>(
    await fetch(`${URL}/ingredients`)
  );
  return data.data;
};

export const getFeedsApi = async (): Promise<
  TServerResponse<{ orders: TOrder[]; total: number; totalToday: number }>
> =>
  readResponse<TServerResponse<{ orders: TOrder[]; total: number; totalToday: number }>>(
    await fetch(`${URL}/orders/all`)
  );

export const getOrdersApi = async (): Promise<TOrder[]> => {
  const data = await fetchWithRefresh<TServerResponse<{ orders: TOrder[] }>>(
    `${URL}/orders`,
    {
      headers: { authorization: getCookie('accessToken') ?? '' },
    }
  );
  return data.orders;
};

type TNewOrderResponse = TServerResponse<{ order: TOrder; name: string }>;
export const orderBurgerApi = (ingredients: string[]): Promise<TNewOrderResponse> =>
  fetchWithRefresh<TNewOrderResponse>(`${URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') ?? '',
    },
    body: JSON.stringify({ ingredients }),
  });

export const getOrderByNumberApi = (
  number: number
): Promise<TServerResponse<{ orders: TOrder[] }>> =>
  fetch(`${URL}/orders/${number}`).then((response) =>
    readResponse<TServerResponse<{ orders: TOrder[] }>>(response)
  );

export type TRegisterData = { email: string; name: string; password: string };
export type TLoginData = { email: string; password: string };
type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export const registerUserApi = (data: TRegisterData): Promise<TAuthResponse> =>
  fetch(`${URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data),
  }).then((response) => readResponse<TAuthResponse>(response));

export const loginUserApi = (data: TLoginData): Promise<TAuthResponse> =>
  fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data),
  }).then((response) => readResponse<TAuthResponse>(response));

export const forgotPasswordApi = (data: { email: string }): Promise<TServerResponse> =>
  fetch(`${URL}/password-reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data),
  }).then((response) => readResponse<TServerResponse>(response));

export const resetPasswordApi = (data: {
  password: string;
  token: string;
}): Promise<TServerResponse> =>
  fetch(`${URL}/password-reset/reset`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify(data),
  }).then((response) => readResponse<TServerResponse>(response));

type TUserResponse = TServerResponse<{ user: TUser }>;
export const getUserApi = (): Promise<TUserResponse> =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    headers: { authorization: getCookie('accessToken') ?? '' },
  });

export const updateUserApi = (user: Partial<TRegisterData>): Promise<TUserResponse> =>
  fetchWithRefresh<TUserResponse>(`${URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken') ?? '',
    },
    body: JSON.stringify(user),
  });

export const logoutApi = (): Promise<TServerResponse> =>
  fetch(`${URL}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
  }).then((response) => readResponse<TServerResponse>(response));
