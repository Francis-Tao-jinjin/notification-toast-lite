import React, { useEffect, useRef, useState } from 'react';
import { MessageData, MessagePosition, MessageMode } from '.';

import './style.scss';
import { NotificationItem } from './notificationItem';
import { ToastItem } from './toastItem';

function classifyToast(messages:MessageData[]) {
    const result = {
        topLeft: [] as MessageData[],
        topRight: [] as MessageData[],
        bottomRight: [] as MessageData[],
        bottomLeft: [] as MessageData[],
        topCenter: [] as MessageData[],
        toasts: [] as MessageData[],
    };
    for (let i = 0; i < messages.length; i++) {
        if (messages[i].mode === MessageMode.Toast) {
            result.toasts.push(messages[i]);
        } else {
            if (messages[i].position === MessagePosition.topLeft) {
                result.topLeft.push(messages[i]);
            } else if (messages[i].position === MessagePosition.topRight) {
                result.topRight.push(messages[i]);
            } else if (messages[i].position === MessagePosition.bottomRight) {
                result.bottomRight.push(messages[i]);
            } else if (messages[i].position === MessagePosition.bottomLeft) {
                result.bottomLeft.push(messages[i]);
            } else if (messages[i].position === MessagePosition.topCenter) {
                result.topCenter.push(messages[i]);
            }
        }
    }
    result.bottomRight.reverse();
    result.bottomLeft.reverse();
    return result;
}

export function NotificationToastComp({messages}:{messages:MessageData[]}) {
    const classifiedToasts = classifyToast(messages);

    const bottomLeft = useRef<HTMLDivElement|null>(null);
    const bottomRight = useRef<HTMLDivElement|null>(null);

    const prevBottomRightLen = useRef(0);
    const prevBottomLeftLen = useRef(0);
    const [bottomRightUpdate, setBottomRightUpdate] = useState(0);
    const [bottomLeftUpdate, setBottomLeftUpdate] = useState(0);

    useEffect(() => {
        if (classifiedToasts.bottomRight.length > prevBottomRightLen.current) {
            setBottomRightUpdate(bottomRightUpdate + 1);
        }
        if (classifiedToasts.bottomLeft.length > prevBottomLeftLen.current) {
            setBottomLeftUpdate(bottomLeftUpdate + 1);
        }
        prevBottomRightLen.current = classifiedToasts.bottomRight.length;
        prevBottomLeftLen.current = classifiedToasts.bottomLeft.length;
    }, [messages]);

    useEffect(() => {
        if (bottomLeft.current) {
            // console.log('bottomLeft.scrollHeight', bottomLeft.current.scrollHeight);
            bottomLeft.current.scrollTop = (bottomLeft.current.scrollHeight) - bottomLeft.current.offsetHeight;
        }
        if (bottomRight.current) {
            // console.log('bottomRight.scrollHeight', bottomRight.current.scrollHeight);
            bottomRight.current.scrollTop = (bottomRight.current.scrollHeight) - bottomRight.current.offsetHeight;
        }
    }, [bottomRightUpdate, bottomLeftUpdate]);

    return (
        <React.Fragment>
            <div className="noification-toast top-left">
                <div className="notification-container">
                    {classifiedToasts.topLeft.map((t) => (<NotificationItem notification={t} key={t.id}/>))}
                </div>
            </div>

            <div className="noification-toast top-right">
                <div className="notification-container">
                    {classifiedToasts.topRight.map((t) => (<NotificationItem notification={t} key={t.id}/>))}
                </div>
            </div>

            <div className="noification-toast bottom-right" ref={bottomRight}>
                <div className="notification-container">
                    {classifiedToasts.bottomRight.map((t) => (<NotificationItem notification={t} key={t.id}/>))}
                    <div className={'padding-staff'}>
                        <pre> </pre>
                    </div>
                </div>
            </div>

            <div className="noification-toast bottom-left" ref={bottomLeft}>
                <div className="notification-container">
                    {classifiedToasts.bottomLeft.map((t) => (<NotificationItem notification={t} key={t.id}/>))}
                    <div className={'padding-staff'}>
                        <pre> </pre>
                    </div>
                </div>
            </div>

            <div className="noification-toast top-center">
                <div className="notification-container">
                    {classifiedToasts.topCenter.map((t) => (<NotificationItem notification={t} key={t.id}/>))}
                </div>
            </div>

            <div className="noification-toast just-toast">
                <div className="toast-container">
                    {classifiedToasts.toasts.map((t) => (<ToastItem toast={t} key={t.id}/>))}
                </div>
            </div>
        </React.Fragment>
    );
}