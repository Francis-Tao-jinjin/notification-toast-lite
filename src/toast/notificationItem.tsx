import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MessageData, MessageContent, useNotificationToastCtx } from '.';
import { isElement, isFunctionComponent } from './utils/helper';

export function NotificationItem({notification}:{notification:MessageData}) {

    const [hasBeenRemoved, setRemoveState] = useState(false);
    const [animationCount, updateAnimationCount] = useState(0);
    const [style, setStyle] = useState<any>({
        height: '0',
        margin: '0px 0px',
    });
    const rootElement = useRef<HTMLDivElement|null>(null);
    const notificationToastCtx = useNotificationToastCtx();
    const { notificationToastDispatch } = notificationToastCtx;

    const renderItem = useCallback((content:MessageContent) => {
        if (isFunctionComponent(content)) {
            return (content as Function)();
        } else if (isElement(content)) {
            return content;
        } else {
            return <pre>{JSON.stringify(content, null, 2)}</pre>;
        }
    }, []);

    const revokeRemove = useCallback(() => {
        const animationDuaration = notification.animationDuration || 250;
        const animationNames = ['slideBackToLeft', 'slideBackToRight', 'slideBackToRight', 'slideBackToLeft', 'slideBackToTop'];
        setRemoveState(true);
        setStyle({
            height: '0',
            margin: '0px 0px',
            transition: `${animationDuaration}ms all`,
            animation: `${animationNames[notification.position]} ${animationDuaration}ms ease-in-out`,
        });
    }, []);

    useEffect(() => {
        let timerId = -1;
        if (animationCount == 1 && hasBeenRemoved == false) {
            if (typeof notification.lifeTime == 'number' && notification.lifeTime !== Infinity) {
                (timerId as any) = setTimeout(() => {
                    revokeRemove();
                }, notification.lifeTime * 1000);
            }
        }
        return () => {
            if (timerId !== -1) {
                clearTimeout(timerId);
            }
        }
    }, [animationCount]);

    useEffect(() => {
        const ele = rootElement.current;
        const animationDuaration = notification.animationDuration || 250;
        const animationNames = ['slideFromLeft', 'slideFromRight', 'slideFromRight', 'slideFromLeft', 'slideFromTop'];
        if (ele) {
            setStyle({
                height: ele.scrollHeight + 'px',
                margin: '5px 0px',
                transition: `${animationDuaration}ms all`,
                animation: `${animationNames[notification.position]} ${animationDuaration}ms linear`,
            });
        }
    }, []);
    const date = new Date(notification.id);
    return <div
        className={`notification-container-item ${notification.type ? notification.type : ''}`}
        style={{
            ...notification.style,
            ...style
        }}
        ref={rootElement}
        onAnimationEnd={() => {
            if (hasBeenRemoved == true) {
                notificationToastDispatch({type: 'REMOVE', payload: { id: notification.id }})
            } else {
                updateAnimationCount(animationCount + 1);
            }
        }}>
            <div className='measuring-wrapper'>
                <div className='header-wrapper'>
                    <div className='header'>
                        <span className='time'>
                            {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                        </span>
                        <div className='close-btn'
                            onClick={() => {
                                revokeRemove();
                            }}>
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-times-circle fa-w-16 fa-3x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" className=""></path></svg>
                        </div>
                    </div>
                </div>
                <div className='content-wrapper'>
                    {renderItem(notification.content)}
                </div>
            </div>
    </div>;
}