import {Server} from "https://js.sabae.cc/Server.js";
import {jsonfs} from "https://js.sabae.cc/jsonfs.js";

const locafn="location.json";
const infofn="infomation.json";
let loca=jsonfs.read(locafn)||[];
let info=jsonfs.read(infofn)||[];

class MyServer extends Server{
    api(path,reqID){
        
        if(path=="/api/loca"){//
            let data=[];
            for(const d of loca){
                if(d.ID==reqID){
                    data=d;
                    break;
                }
            }
            console.log(data);
            return data;
        }else if(path=="/api/info"){//
            let data=[];
            for(const d of info){
                if(d.ID==reqID){
                    data=d;
                    break;
                }
            }
            console.log(data);
            return data;
        }
    }
}
new MyServer(8883);