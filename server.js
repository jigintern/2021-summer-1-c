import {Server} from "https://js.sabae.cc/Server.js";
import {jsonfs} from "https://js.sabae.cc/jsonfs.js";

const locafn="data/location.json";
const infofn="data/information.json";
const iconfn="data/icon.json";
const udatafn="data/userdata.json";
const boardfn="data/board.json";

const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json?'
const DIRECTIONS_API_KEY = 'AIzaSyBiAGQru246aR7Ht9TuJK0id87_q-spITU';

let loca=jsonfs.read(locafn)||[];
let info=jsonfs.read(infofn)||[];
let icon=jsonfs.read(iconfn)||[];
let udata=jsonfs.read(udatafn)||[];
let board=jsonfs.read(boardfn)||[];

class MyServer extends Server{
    api(path,req){
        if(path=="/api/loca"){
            //指定されたIDのlocation.jsonを返す
            //call:("/api/add",ID),return:{ID,name,lat,lng}
            console.log("call loca");
            for(const d of loca){
                if(d.ID==req){
                    return d;
                }
            }
            return "warning";
        } else if(path=="/api/info"){
            //指定されたIDのinformation.jsonを返す
            //call:("/api/info",ID),return:{ID,info[]}
            console.log("call info");
            //console.log(info)
            for(const d of info){
                if(d.ID==req){
                    return d;
                }
            }
            return "warning";
        } else if (path == "/api/icon") {
            //今持つすべてのicon.jsonの情報を返す
            //call:("/api/icon"),return:[{iconID,addres}]
            console.log("call icon");
            return icon;
        } else if (path == "/api/add") {
            //位置情報を保存する
            //call:("/api/add",{travelID,data[{type,date,iconID,comment,lat,lng}]}),return:"ok"
            //
            //type:icon(アイコン) ,data{type:"icon",iconID,comment,lat,lng}
            //type:route(ユーザの位置情報),data{type:"route",date,lat,lng}
            //type:end(旅行の終了確認データ),data{type:"end",date}
            console.log("call add")
            for(const d in udata){
               if(udata[d].travelID==req.travelID){
                    udata[d].data.push(req.data);
                    jsonfs.write(udatafn,udata);
                    return "push ok";
               }
           }
           udata.push({travelID:req.travelID,data:[]});
           udata[udata.length-1].data.push(req.data);
           jsonfs.write(udatafn,udata);
           return "make new record. push ok";
        } else if (path == "/api/delete") {
            //位置情報を削除する
            console.log("call delete");
            for(const d in udata){
               if(udata[d].travelID==req.travelID){
                    for(const i in udata[d].data){
                        if (udata[d].data[i].lat === req.lat && udata[d].data[i].lng === req.lng) {
                            udata[d].data.splice(i, 1);
                            console.log(udata[d].data);
                            jsonfs.write(udatafn,udata);
                            return "delete ok";
                        }
                    }
               }
            }     
           return "warning";
        } else if (path == "/api/uadd") {
            //userdata.jsonに新規ユーザを追加する
            //call:("/api/uadd",travelID),return:"ok" or "no"
            for(const d in udata){
                if(udata[d].travelID==req){
                     return "this ID exists";
                }
            }
            udata.push({travelID:req,data:[]});
            jsonfs.write(udatafn,udata);
            return "make new record. push ok";
        } else if (path == "/api/get") {
            //位置情報を取得する
            //call:("/api/add",travelID),return:ok
            console.log("call get");
            for(const d in udata){
               if(udata[d].travelID==req){
                return udata[d];
               }
            }
            return "warning";
        } else if (path == "/api/dist") {
            //距離を求める
            //call:("/api/dist",{"origin":{"lat":"value","lng":"value"},"destination":{"lat":"value","lng":"value"}}),return:dist
            console.log("call dist");

            if (!(req.origin && req.destination)) return "warning"; //例外処理

            let dist = 0;
            const origin = req.origin;
            const destination = req.destination;
            const reqURL = `${DIRECTIONS_API_URL}origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${DIRECTIONS_API_KEY}`;

            async function getDist() {
                const json = await fetch(reqURL).then(response => {
                    return response.json();
                });
                dist = json.routes[0].legs[0].distance.value;
                return dist;
            }

            return getDist();
        } else if (path == "/api/iget"){
            //アイコンの情報のみを返却
            //call:("/add/iget",travelID),return:[{srt,comment,lat,lng}, ...]
            const icon = async() => await fetchJSON("api/icon");
            const data = async() => await fetchJSON("api/get",travelID);

            let item=[];
            for(const d in data){
                if(data[d].type=="icon"){
                    const e=0;
                    while(1){
                        if(data[d].iconID==icon[e].iconID) break;
                        e++;
                    }
                    item.push({"str":icon[e].str,"comment":data[d].comment,"lat":data[d].lat,"lng":data[d].lng});
                }
             }
             console.log(item);
             return item;
        } else if (path == "/api/badd") {
            //掲示板に書き込む
            //call:("/api/badd",data{未定}),return:"ok"
            board.push(req);
            jsonfs.write(boardfn,board);
            return "ok";
        } else if (path == "/api/blist") {
            //掲示板の内容を返却
            //call:("/api/blist"),return:[data{未定}, ...]
            return board;
        }
    }
}
new MyServer(8883);