// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function debounce<T extends (...args: any[]) => void>(
    callback: T,
    wait: number,
) {
    let timeout: ReturnType<typeof setTimeout> | undefined;

    return (...args: Parameters<T>): void => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            timeout = undefined;
            callback(...args);
        }, wait);
    };
}
