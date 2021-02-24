# notification-toast-lite

A lite weight notification and toast component library build with react hook.

`npm i notification-toast-lite`

**demo vedio**

<img src='https://j.gifs.com/nxB1mD.gif' alt="gif image demo">

**notification and toast** are all supported

![screen shot of notification and toast](/assets/screenShot.png)

A notification can be create from four corners and the top center of the viewport. While a toast will only show up from the top center.

Notification's content could be a **string**, a **ReactNode** or a **FunctionComponent**. Toast's content only support *string* and *ReactNode*.

In addition, the data required to create these two are basically the same.

```TypeScript
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

// MessageData is the interface of a Nofitication or a Toast 
export type MessageData = {
    id: number; // generated in the library
    idx: number; // generated in the library
    content: MessageContent;
    type: MessageType;
    style?: React.CSSProperties;
    position: MessagePosition;
    lifeTime?: number;          // lifetime will be in [0.5, 10] seconds or Infinity
    animationDuration?: number; // animationDuration will be in [250, 750] ms
    mode?: MessageMode;
}
```

## Basic Usage

You need to use both **NotificationToastProvider** and **notificationToastDispatch** to create or remove a Message (Notification or Toast).

For example: 

```tsx
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { NotificationToastProvider } from 'notification-toast-lite';

ReactDOM.render(
  <React.StrictMode>
    <NotificationToastProvider>
      <App />
    </NotificationToastProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

```tsx
// src/App.tsx
import React, { useState } from 'react';
import { useNotificationToastCtx, MessageType, MessageMode, MessagePosition } from 'notification-toast-lite';

import './App.css';

export App() {
    const notificationToastCtx = useNotificationToastCtx();
    const { messages, notificationToastDispatch } = notificationToastCtx;

    const renderContent = (title:string, message:string) => {
    return <div className='my-toast-content'>
            <div className='title'>
                {title}
            </div>
            <div className='message'>
                {message}
            </div>
        </div>
    }

    const types:(MessageType)[] = [MessageType.info, MessageType.danger, MessageType.success, MessageType.warning, MessageType.default];
    const msgs = [
        'Hayley Arceneaux: Cancer survivor joins first all-civilian space mission.',
        'President Joe Biden addresses the nation as the US mourns 500,000 people lost to Covid-19.',
        'At least 90,000 more Americans are expected to have died with the virus by 1 June, an Institute for Health Metrics and Evaluation (IHME) projection says. By late May, the virus will kill around 500 Americans per day - down from approximately 2,000 now',
        '2,600 years old, and the capital of 10 dynasties - Nanjing has a long and colourful history.',
    ];
    const toast = [
        'setTimeout in React Components Using Hooks',
        'new NodeRouter(logger);',  
        'How hashes and other stuff gets cached',
        'Clean up config file madness',
        'Service worker can serve the templates from the website',
    ];

    return (
        <div classsName='App'>
            <button
                onClick={() => {
                    notificationToastDispatch({
                        type: 'ADD',
                        payload: {
                            content: renderContent('Daily News', msgs[Math.floor(Math.random() * 4)]),
                            type: types[Math.floor(Math.random() * 5)],
                            lifeTime: 4,
                            animationDuration: 400,
                        },
                    })
                }}
            >Add top right Notification</button>

            <button
                onClick={() => {
                    notificationToastDispatch({
                        type: 'ADD',
                        payload: {
                            content: toast[Math.floor(Math.random() * msgs.length)],
                            type: types[Math.floor(Math.random() * 5)],
                            style: {
                                borderRadius: '10px',
                                background: 'black',
                                color: 'white',
                            },
                            mode: MessageMode.Toast,
                        },
                    })
                }}
            >Add Toast</button>

            <button onClick={() => notificationToastDispatch({type: 'REMOVE_ALL'})}>
                Clear all notifications
            </button>
        </div>
    );
}
```

In case you want to avoid a long list of Context Provider wrap your main app, you can use the code snippet below to solve this problem:

```tsx
// Compose.tsx

interface Props {
    components: Array<React.JSXElementConstructor<React.PropsWithChildren<any>>>
    children: React.ReactNode
}

export default function Compose(props: Props) {
    const { components = [], children } = props

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}
```

Usage:

```tsx
<Compose components={[BrowserRouter, NotificationToastProvider]}>
    <App />
</Compose>
```

