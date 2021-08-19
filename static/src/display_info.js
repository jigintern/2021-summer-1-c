/* 現在地と目的地との距離を取得 */
const getDist = async (lat, lng, targetlat, targetlng) => {
    const value = {
        origin: { lat, lng },
        destination: { lat: targetlat, lng: targetlng }
    };
    const dist = await fetchJSON(`api/dist?${JSON.stringify(value)}`); // 距離

    console.log(dist);
    return dist;
}