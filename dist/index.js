'use strict';

const defaultBeforeReload = () => {
    return true;
};
const formatTest = (test) => {
    if (!test)
        return [];
    if (typeof test === 'string')
        test = [test];
    if (Array.isArray(test))
        return test.map((str) => new RegExp(`^${str}`));
    if (test instanceof RegExp)
        return [test];
    return [];
};
const useVersionCheck = (options) => {
    const { beforeReload = defaultBeforeReload, test } = options;
    const testList = formatTest(test);
    const run = (state) => {
        if (state.back) {
            window.history.back();
        }
        else {
            window.location.reload();
        }
    };
    const listener = () => {
        window.addEventListener('popstate', (e) => {
            run(e.state);
        });
        run(history.state);
    };
    const handleUnhandledrejection = async (e) => {
        const { message } = e.reason;
        if (/Failed to fetch dynamically imported module|Unable to preload|'text\/html' is not a valid JavaScript MIME type/.test(message) ||
            testList.find((errorRe) => errorRe.test(message))) {
            e.preventDefault();
            try {
                const res = await beforeReload(e);
                if (!res)
                    return;
                listener();
            }
            catch (e) {
                console.error('useVersionCheck :: ', e);
            }
        }
    };
    const addEventListener = () => {
        window.removeEventListener('unhandledrejection', handleUnhandledrejection);
        window.addEventListener('unhandledrejection', handleUnhandledrejection);
    };
    addEventListener();
    return {
        run,
        listener,
    };
};

exports.useVersionCheck = useVersionCheck;
