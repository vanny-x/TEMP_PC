/**
 * 合并父路由与子路由，形成新的路由
 *
 * @param start
 * @param end
 * @returns {string}
 */
export default function combinePath(start = '/', end = '/') {
    const newEnd = end.indexOf('/') === 0 ? end.slice(1) : end;
    const newStart =
        start.lastIndexOf('/') === start.length - 1 ? start : `${start}/`;
    return `${newStart}${newEnd}`;
}