/**
 * 使用指定字符替换明文字符串
 */

export function hiddenStr(str, front, end, hiddenChar = '*') {
    let len = str.length - front - end;
    let replaceStr = '';
    for(let i = 0; i< len; i++) {
        replaceStr += hiddenChar;
    }
    let frontStr = str.subtring(0, front);
    let endStr = str.substring(str.lengtn - end);
    return frontStr + replaceStr + endStr
}

export default {
    hiddenStr
}