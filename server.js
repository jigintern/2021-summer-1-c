import {Server} from "https://js.sabae.cc/Server.js";
import {jsonfs} from "https://js.sabae.cc/jsonfs.js";

const locafn="data/location.json";
const infofn="data/infomation.json";
const iconfn="data/icon.json";
const udatafn="data/userdata.json";

const DIRECTIONS_API_URL = 'https://maps.googleapis.com/maps/api/directions/json?'
const DIRECTIONS_API_KEY = 'AIzaSyBiAGQru246aR7Ht9TuJK0id87_q-spITU';

let loca=jsonfs.read(locafn)||[];
let info=jsonfs.read(infofn)||[];
let icon=jsonfs.read(iconfn)||[];
let udata=jsonfs.read(udatafn)||[];

class MyServer extends Server{
    api(path,reqID){
        
        if(path=="/api/loca"){//指定されたIDのlocation.jsonを返す
            for(const d of loca){
                if(d.ID==reqID){
                    return d;
                }
            }
            return "warning";
        }else if(path=="/api/info"){//指定されたIDのinfomation.jsonを返す
            for(const d of info){
                if(d.ID==reqID){
                    return d;
                }
            }
            return "warning";
        } else if (path == "/api/icon") {//今持つすべてのicon.jsonの情報を返す
            return icon;
        } else if (path == "api/add") {//位置情報を保存する

        } else if (path == "/api/dist") {//
            let dist = 0;
            const origin = reqID.origin;
            const destination = reqID.destination;
            const reqURL = `${DIRECTIONS_API_URL}origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&key=${DIRECTIONS_API_KEY}`;
            
            fetch(reqURL).then(response => {
                return response.json();
            }).then(jsonData => {
                dist = jsonData.routes[0].legs[0].distance.value;
                console.log(dist);
                return dist;
            });
        }
    }
}
new MyServer(8883);