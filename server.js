import {Server} from "https://js.sabae.cc/Server.js";
import {jsonfs} from "https://js.sabae.cc/jsonfs.js";

const locafn="data/location.json";
const infofn="data/information.json";
const iconfn="data/icon.json";
const udatafn="data/userdata.json";

const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json?'
const DIRECTIONS_API_KEY = 'AIzaSyBiAGQru246aR7Ht9TuJK0id87_q-spITU';

let loca=jsonfs.read(locafn)||[];
let info=jsonfs.read(infofn)||[];
let icon=jsonfs.read(iconfn)||[];
let udata=jsonfs.read(udatafn)||[];

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
        }else if(path=="/api/info"){
            //指定されたIDのinformation.jsonを返す
            //call:("/api/info",ID),return:{ID,info[]}
            console.log("call info");
            console.log(info)
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
        }else if (path == "/api/add") {
            //位置情報を保存する
            //call:("/api/add",{travelID,data[{type,date,iconID,lat,lng}]}),return:ok
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
        }
    }
}
new MyServer(8883);