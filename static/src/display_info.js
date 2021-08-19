/* 現在地と目的地との距離を取得 */
const getDist = async (lat, lng, targetlat, targetlng) => {
    const value = {
        origin: { lat, lng },
        destination: { lat: targetlat, lng: targetlng }
    };
    const dist = await fetchJSON(`api/dist?${JSON.stringify(value)}`); // 距離
    return dist;
}

/* 目的地を取得 */
const getLocation = async(id) => {
    const data = await fetchJSON(`api/loca?${id}`);
    return data;
}

/* 目的地情報を取得 */
const getInfo = async(id) => {
    const { info } = await fetchJSON(`api/info?${id}`);
    return info;
}

/* マップに表示する目的地情報を取得 */
const getDisplayInfo = async (locationID, lat, lng, targetlat, targetlng, distance) => {
    let calDist = 100; // 情報を全て表示する距離
    const step = 100; // stepずつ距離を増加させる
    const arr = [];
    const rand = {  // ランダム生成
        max: 0.002,
        min: -0.002,
        lat: 0,
        lng: 0
    };

    const dist = distance || await getDist(lat, lng, targetlat, targetlng); // 現在地と目的地との距離を取得
    const location = await getLocation(locationID); // 目的地を取得
    const info = await getInfo(locationID); // 目的地情報を取得

    // arr配列に追加
    for (let i = 0; i < info.length; i++) {
        rand.lat = Math.random() * (rand.max - rand.min) + rand.min; // rand.min～rand.maxまでの数をランダムで生成
        rand.lng = Math.random() * (rand.max - rand.min) + rand.min; // rand.min～rand.maxまでの数をランダムで生成

        arr.push({
            dist: calDist,
            info: info[i],
            lat: location.lat + rand.lat,
            lng: location.lng + rand.lng
        });
        calDist += step;
    }

    const resultArr = arr.filter(value => value.dist >= dist); // 出力する情報

    // 降順ソート
    resultArr.sort((a,b) => {
        if (a.dist > b.dist) return -1;
        if (a.dist < b.dist) return 1;
        return 0;
    });
    
    return resultArr;
}