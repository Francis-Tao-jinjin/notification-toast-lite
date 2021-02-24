import React, { useEffect } from 'react';
import { useNotificationToastCtx, MessageType, MessagePosition, MessageMode } from '../toast';
import './style.scss';

export function UIContainer() {
    const notificationToastCtx = useNotificationToastCtx();

    useEffect(() => {
        console.log('UIContainer update');
    }, []);

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

    if (notificationToastCtx) {
        const { messages, notificationToastDispatch } = notificationToastCtx;
        const types:(MessageType)[] = [MessageType.info, MessageType.danger, MessageType.success, MessageType.warning, MessageType.default];
        
        const msgs = [
            'Eget mauris pharetra et ultrices neque. Dolor magna eget est lorem ipsum. Libero id faucibus nisl tincidunt eget nullam. ',
            'Sed arcu non odio euismod. Lorem ipsum dolor sit amet consectetur adipiscing elit.',
            'Venenatis cras sed felis eget velit aliquet sagittis id consectetur. Urna cursus eget nunc scelerisque. Ornare arcu odio ut sem.',
            'Nulla pellentesque dignissim enim sit amet venenatis urna cursus eget.',
        ];

        const toast = [
            'setTimeout in React Components Using Hooks',
            'new NodeRouter(logger);',  
            'How hashes and other stuff gets cached',
            'Clean up config file madness',
            'Service worker can serve the templates from the website',
        ];

        return (
        <React.Fragment>
            <div className="App">
                <div className='btns'>
                    <div className='button-wrapper'>
                        <button
                            onClick={() => {
                                notificationToastDispatch({
                                    type: 'ADD',
                                    payload: {
                                        content: renderContent('Daily News', msgs[Math.floor(Math.random() * 4)]),
                                        type: types[Math.floor(Math.random() * 5)],
                                        style: {
                                            // borderRadius: '10px',
                                        },
                                        lifeTime: 4,
                                        animationDuration: 400,
                                    },
                                })
                            }}
                        >Add top right Notification</button>
                    </div>

                    <div className='button-wrapper'>
                        <button
                            onClick={() => {
                                notificationToastDispatch({
                                    type: 'ADD',
                                    payload: {
                                        content: renderContent('Daily News', msgs[Math.floor(Math.random() * 4)]),
                                        type: types[Math.floor(Math.random() * 5)],
                                        style: {
                                            borderRadius: '10px',
                                        },
                                        position: MessagePosition.topLeft,
                                    },
                                })
                            }}
                        >Add top left Notification</button>
                    </div>

                    <div className='button-wrapper'>
                        <button
                            onClick={() => {
                                notificationToastDispatch({
                                    type: 'ADD',
                                    payload: {
                                        content: renderContent('Daily News', msgs[Math.floor(Math.random() * 4)]),
                                        type: types[Math.floor(Math.random() * 5)],
                                        style: {
                                            borderRadius: '10px',
                                        },
                                        position: MessagePosition.bottomRight,
                                    },
                                })
                            }}
                        >Add bottom right Notification</button>
                    </div>

                    <div className='button-wrapper'>
                        <button
                            onClick={() => {
                                notificationToastDispatch({
                                    type: 'ADD',
                                    payload: {
                                        content: renderContent('Daily News', msgs[Math.floor(Math.random() * 4)]),
                                        type: types[Math.floor(Math.random() * 5)],
                                        style: {
                                            borderRadius: '10px',
                                        },
                                        position: MessagePosition.bottomLeft,
                                    },
                                })
                            }}
                        >Add bottom left Notification</button>
                    </div>

                    <div className='button-wrapper'>
                        <button
                            onClick={() => {
                                notificationToastDispatch({
                                    type: 'ADD',
                                    payload: {
                                        content: renderContent('Daily News', msgs[Math.floor(Math.random() * msgs.length)]),
                                        type: types[Math.floor(Math.random() * 5)],
                                        style: {
                                            borderRadius: '10px',
                                        },
                                        position: MessagePosition.topCenter,
                                    },
                                })
                            }}
                        >Add top center Notification</button>
                    </div>

                    <div className='button-wrapper'>
                        <button
                            onClick={() => {
                                notificationToastDispatch({
                                    type: 'ADD',
                                    payload: {
                                        content: toast[Math.floor(Math.random() * msgs.length)],
                                        type: types[Math.floor(Math.random() * 5)],
                                        style: {
                                            borderRadius: '10px',
                                            background: 'rgba(0,0,0,0.8)',
                                            color: 'white',
                                        },
                                        mode: MessageMode.Toast,
                                    },
                                })
                            }}
                        >Add Toast</button>
                    </div>

                    <button onClick={() => notificationToastDispatch({type: 'REMOVE_ALL'})}>
                        Clear all notifications
                    </button>
                    {/* {showClearAll()} */}
                </div>
            </div>
        </React.Fragment>
        );
    } else {
        return <div className="App">
        </div>
    }
}