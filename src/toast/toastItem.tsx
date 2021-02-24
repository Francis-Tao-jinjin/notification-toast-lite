import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MessageData, useNotificationToastCtx } from '.';

export function ToastItem({toast}:{toast:MessageData}) {
    
    const [hasBeenRemoved, setRemoveState] = useState(false);
    const [animationCount, updateAnimationCount] = useState(0);
    const [style, setStyle] = useState<any>({
        height: '0',
        margin: '0px 0px',
    });
    const [contentStyle, setContentStyle] = useState<any>({});
    const rootElement = useRef<HTMLDivElement|null>(null);
    const notificationToastCtx = useNotificationToastCtx();
    const { notificationToastDispatch } = notificationToastCtx;

    const revokeRemove = useCallback(() => {
        const animationDuaration = toast.animationDuration || 250;
        setRemoveState(true);
        setStyle({
            height: '0',
            margin: '0px 0px',
            transition: `${animationDuaration}ms all`,
            animation: `toastBackToTop ${animationDuaration}ms ease-in-out`,
        });
        setContentStyle({
            animation: `toastContentFadeOut ${animationDuaration}ms linear`,
        });
    }, []);

    useEffect(() => {
        let timerId = -1;
        if (animationCount == 1 && hasBeenRemoved == false) {
            if (typeof toast.lifeTime == 'number' && toast.lifeTime !== Infinity) {
                (timerId as any) = setTimeout(() => {
                    revokeRemove();
                }, toast.lifeTime * 1000);
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
        const animationDuaration = toast.animationDuration || 250;
        if (ele) {
            setStyle({
                height: ele.scrollHeight + 'px',
                margin: '5px 0px',
                transition: `${animationDuaration}ms all`,
                animation: `toastFromTop ${animationDuaration}ms linear`,
            });
        }
    }, []);

    return <div
        className={`toast-container-item ${toast.type ? toast.type : ''}`}
        style={{
            ...toast.style,
            ...style,
        }}
        ref={rootElement}
        onAnimationEnd={() => {
            if (hasBeenRemoved == true) {
                notificationToastDispatch({type: 'REMOVE', payload: { id: toast.id }})
            } else {
                updateAnimationCount(animationCount + 1);
                console.log('animation done');
                setStyle({
                    height: 'auto',
                    margin: '5px 0px',
                });
            }
        }}>
            <div className={'measuring-wrapper'}
                style={{...contentStyle}}>
                { 
                    toast.type !== 'default' ?
                    <div className={`toast-icon`}>
                        {toast.type === 'info' ? <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-info-circle fa-w-16 fa-5x"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" className=""></path></svg> : null}
                        {toast.type === 'danger' ? <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-times-circle fa-w-16 fa-3x"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z" className=""></path></svg> : null}
                        {toast.type === 'success' ? <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-check-circle fa-w-16 fa-5x"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" className=""></path></svg> : null}
                        {toast.type === 'warning' ? <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-exclamation-circle fa-w-16 fa-5x"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z" className=""></path></svg> : null}
                    </div> : null
                }
                <div className='toast-content'>
                    {
                        toast.content
                    }
                </div>
            </div>
    </div>
}