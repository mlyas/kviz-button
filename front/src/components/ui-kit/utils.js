export function cutSpacesFromBeginAndEnd(string) {
    return string.replace(/(^\s+)|(\s+$)/g, '')
}
