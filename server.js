import {Server} from "https://js.sabae.cc/Server.js";
import {jsonfs} from "https://js.sabae.cc/jsonfs.js";

const locafn="data/location.json";
const infofn="data/infomation.json";
const iconfn="data/icon.json";
let loca=jsonfs.read(locafn)||[];
let info=jsonfs.read(infofn)||[];
let icon=jsonfs.read(iconfn)||[];

class MyServer extends Server{
    api(path,reqID){
        
        if(path=="/api/loca"){//
            for(const d of loca){
                if(d.ID==reqID){
                    return d;
                }
            }
            return "warning";
        }else if(path=="/api/info"){//
            for(const d of info){
                if(d.ID==reqID){
                    return d;
                }
            }
            return "warning";
        } else if (path == "/api/icon") {//
            return icon;
        }
    }
}
new MyServer(8883);