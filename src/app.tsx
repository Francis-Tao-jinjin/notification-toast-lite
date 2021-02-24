import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Compose from './dev/compose';
import { UIContainer } from './dev/index';
import { NotificationToastProvider } from './toast';
// import { NotificationToastProvider } from '../build/notification-toast.bundle';

export class DevApp {
    private root:HTMLElement;
    constructor() {
        this.root = document.createElement('div');
        this.root.style.left = '0';
        this.root.style.right = '0';
        document.body.appendChild(this.root);
    }

    public start() {
        this.render();
    }

    public render() {
        ReactDOM.render(
            <Compose components={[NotificationToastProvider]}>
                <UIContainer/>
            </Compose>
            // <NotificationToastProvider>
            //     <UIContainer/>
            // </NotificationToastProvider>
        , this.root);
    }
}