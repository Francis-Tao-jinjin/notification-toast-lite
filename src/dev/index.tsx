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
        function showClearAll() {
            if (messages.length) {
                return (
                    <button onClick={() => notificationToastDispatch({type: 'REMOVE_ALL'})}>
                    Clear all notifications
                </button>);
            } else {
                return null;
            }
        }
        const types:(MessageType)[] = [MessageType.info, MessageType.danger, MessageType.success, MessageType.warning, MessageType.default];
        
        const msgs = [
            'Hayley Arceneaux: Cancer survivor joins first all-civilian space mission.',
            'President Joe Biden addresses the nation as the US mourns 500,000 people lost to Covid-19.',
            'At least 90,000 more Americans are expected to have died with the virus by 1 June, an Institute for Health Metrics and Evaluation (IHME) projection says. By late May, the virus will kill around 500 Americans per day - down from approximately 2,000 now',
            '2,600 years old, and the capital of 10 dynasties - Nanjing has a long and colourful history.',
        ];
        return (
        <React.Fragment>
            <div className="App">
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
                                    content: renderContent('Daily News', msgs[Math.floor(Math.random() * 4)]),
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
                                    content: 'setTimeout in React Components Using Hooks',
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
                </div>

                {showClearAll()}
            </div>
        </React.Fragment>
        );
    } else {
        return <div className="App">
        </div>
    }
}