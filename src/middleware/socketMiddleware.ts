import type { Middleware, MiddlewareAPI } from 'redux';
import {AppDispatch, RootState, TAppActions, TWsActions} from '../types/index';

export const socketMiddleware = (wsUrl: string, wsActions: TWsActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TAppActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit().type) {
        const query = payload || '';
        socket = new WebSocket(`${wsUrl}${query}`);
      }
      if (socket) {
        socket.onopen = event => {
          dispatch(onOpen());
        };

        socket.onerror = event => {
          dispatch(onError());
        };

        socket.onmessage = event => {
          const { data } = event;
          try {
            dispatch(onMessage(JSON.parse(data)));
          } catch (err) {
            console.log('Ошибка обработки входящих данных.')
          }
        };

        socket.onclose = event => {
          dispatch(onClose());
        };

        if (type === wsClose().type) {
          socket.close(1000, payload);
        }
      }

      next(action);
    };
  }) as Middleware;
};
