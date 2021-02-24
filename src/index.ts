import { DevApp } from './app';

async function go() {
    const app = new DevApp();
    app.start();
}

go().catch((e) => {
    console.error('dev app start error');
    console.error(e);
});