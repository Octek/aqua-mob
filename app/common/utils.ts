export const debounceFunc = (func: () => void, delay: number) => {
    console.log("debouncing");
    let timer: number;
    return function (...args: any) {
        // @ts-ignore
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(() => {
            console.log("in here");
            func.apply(context, args);
        }, delay);
    };
};
