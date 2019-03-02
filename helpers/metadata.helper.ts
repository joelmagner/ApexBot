import * as fs from "fs";
export default class Metadata {
    getAppVersion(){   
       return JSON.parse(fs.readFileSync("./package.json", "UTF-8")).version;
    }
}