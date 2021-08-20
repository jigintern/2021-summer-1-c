/* 旅初期化 */
const initTravel = async() => {
    const cookieArray = getCookieArray();
    console.log(`travelID = ${cookieArray.travelID}`);

    // travelID作成
    if (cookieArray.travelID) { // ある場合
        // getTravelData(cookieArray.travelID); // 旅行データを取得
        getTravelData(19216800); // 仮のデータ
    } else { // ない場合
        const date = new Date();
        const destination = '眼鏡会館';

        alert('データを作成しました'); // 削除予定

        sha256(`${date}${destination}`).then(hash => {
            // createCookie('travelID', hash, 7); // Cookie作成
            createCookie('travelID', 19216800, 7); // 仮のデータ
        });
        const ret = await fetchJSON("api/uadd",cookieArray.travelID);
        if(ret=="this ID exists"){
            console.log("this ID exists");
        }else{
            console.log("make new record. push ok");
        }
    }
}

/* ハッシュ値生成 */
const sha256 = async(text) => {
    const uint8 = new TextEncoder().encode(text);
    const digest = await crypto.subtle.digest('SHA-256', uint8);
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2,'0')).join('');
}

/* Cookie配列生成 */
const getCookieArray = () => {
    let data;
    const array = [];

    if (document.cookie) {
        const tmp = document.cookie.split('; ');

        for(let i = 0; i < tmp.length; i++) {
            data = tmp[i].split('=');
            array[data[0]] = decodeURIComponent(data[1]);
        }
    }

    return array;
}

/* Cookie作成 */
const createCookie = (name, value, days) => {
    const expire = new Date(); // 有効期限
    expire.setTime( expire.getTime() + 1000 * 3600 * 24 * days);
    document.cookie = `${name}=${value}; expires=${expire.toUTCString()}`;
}

/* Cookie削除 */
const deleteCookie = name => {
    const date = new Date();

    date.setTime(date.getTime() - 1);
    document.cookie = `${name}=""; expires=` + date.toUTCString();
}

/* 旅行データを取得 */
const getTravelData = async travelID => {
    let iconID;
    const data = await fetchJSON(`api/get?${travelID}`);
    const icon = await fetchJSON('api/icon');

    if (data == 'warning') alert('データが違います'); // 削除予定
    
    for (const i in data.data) {
        iconID = data.data[i].iconID;

        if (iconID) {
            data.data[i].name = icon[iconID].name
            data.data[i].src =icon[iconID].src
        }
    }

    return data;
}

initTravel();
