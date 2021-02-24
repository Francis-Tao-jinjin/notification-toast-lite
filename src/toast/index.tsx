import React, { createContext, useReducer, useContext } from 'react';
import { createPortal } from 'react-dom';
import { NotificationToastComp } from './notificationToast';

const NTContext = createContext<{messages:MessageData[]; notificationToastDispatch:React.Dispatch<Action> }>({
    messages: [],
    notificationToastDispatch: () => {
        console.error('You need to use `NotificationToast.Provider` before call notificationToastDispatch');
    },
});

export type MessageContent = string | React.ReactNode | React.FunctionComponent;
export enum MessageType {
    info='info',
    danger='danger',
    success='success',
    warning='warning',
    default='default',
};

export enum MessagePosition {
    topLeft = 0,
    topRight = 1,
    bottomRight = 2,
    bottomLeft = 3,
    topCenter = 4
};

export enum MessageMode {
    Notification = 0,
    Toast = 1,
}

export type MessageData = {
    id: number;
    idx: number;
    content: MessageContent;
    type: MessageType;
    style?: React.CSSProperties;
    position: MessagePosition;
    lifeTime?: number;          // lifetime will be in [0.5, 10] seconds or Infinity
    animationDuration?: number; // animationDuration will be in [250, 750] ms
    mode?: MessageMode;
}

const initialState:MessageData[] = [];

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const REMOVE_ALL = 'REMOVE_ALL';

type Action = 
    | { type: 'ADD', payload: {
                            content: MessageContent;
                            type: MessageType;
                            style?: React.CSSProperties,
                            position?: MessagePosition,
                            lifeTime?: number;
                            animationDuration?: number;
                            mode?: MessageMode;
                        } }
    | { type: 'REMOVE', payload: { id: number }}
    | { type: 'REMOVE_ALL' };


type Reducer<S, A> = (prevState: S, action: A) => S;

let toastCount = 0;

const toastReducer:Reducer<MessageData[], Action> = (state, action) => {
    switch (action.type) {
        case ADD:
            // one amination duration need to be in range [250, 750];
            const animationDuration = Math.min(Math.max(action.payload.animationDuration || 250, 250), 750);

            let mode = action.payload.mode;
            mode = (mode == MessageMode.Notification || mode == MessageMode.Toast) ? mode : MessageMode.Notification;

            let lifeTime = action.payload.lifeTime;
            if (typeof lifeTime !== 'number' && mode === MessageMode.Notification) {
                lifeTime = Infinity;
            } else {
                // lifeTime = Infinity;
                lifeTime = Math.min(10, Math.max(lifeTime || 5, 0.5));
            }
            const positions = [0,1,2,3,4];
            return [
                {
                    id: Date.now(),
                    idx: toastCount++,
                    content: action.payload.content,
                    type: action.payload.type,
                    style: action.payload.style,
                    position: (positions.indexOf(action.payload.position as number) !== -1) ? (action.payload.position as MessagePosition) : MessagePosition.topRight,
                    animationDuration,
                    lifeTime,
                    mode,
                },
                ...state,
            ];
        case REMOVE:
            return state.filter(({id}) => {
                return id != action.payload.id;
            });
        case REMOVE_ALL:
            return initialState;
        default:
            return state;
    }
};

export const NotificationToastProvider = (props) => {
    const [messages, notificationToastDispatch] = useReducer(toastReducer, initialState);
    const notificationToastCtx = { messages, notificationToastDispatch };
    return (
        <NTContext.Provider value={notificationToastCtx}>
            {props.children}
            {createPortal(<NotificationToastComp messages={messages}/>, document.body)}
        </NTContext.Provider>
    );
}

export const useNotificationToastCtx = () => {
    return useContext(NTContext);
};

if (typeof exports !== 'undefined') {
    exports.NotificationToastProvider = NotificationToastProvider;
    exports.useNotificationToastCtx = useNotificationToastCtx;
    exports.MessagePosition = MessagePosition;
    exports.MessageType = MessageType;
    exports.MessageMode = MessageMode;
}