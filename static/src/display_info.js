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
const getDisplayInfo = async (locationID, lat, lng, targetlat, targetlng) => {
    const mstep = 500; // 1つオープンする距離(m)
    const rand = {  // ランダム生成
        max: 0.002,
        min: -0.002,
        lat: 0,
        lng: 0
    };
  
    const dist = await getDist(lat, lng, targetlat, targetlng); // 現在地と目的地との距離を取得
    console.log("dist", dist + "m");
    const location = await getLocation(locationID); // 目的地を取得
    const info = await getInfo(locationID); // 目的地情報を取得
  
    console.log("n_info", info.length); // 情報の数 めがね会館で3つ
    const distance2 = (info.length - 1) * mstep; // 2つが開く距離
    const nshow = dist > distance2 ? 1 : 1 + Math.ceil((distance2 - dist) / mstep); // 表示する数
    console.log("n_show", nshow); // 表示する数
    
    // arr配列に追加
    const arr = [];
    for (let i = 0; i < nshow; i++) {
        rand.lat = Math.random() * (rand.max - rand.min) + rand.min; // rand.min～rand.maxまでの数をランダムで生成
        rand.lng = Math.random() * (rand.max - rand.min) + rand.min; // rand.min～rand.maxまでの数をランダムで生成
  
        arr.push({
            info: info[i],
            lat: location.lat + rand.lat,
            lng: location.lng + rand.lng
        });
    }
    return arr;
}
  