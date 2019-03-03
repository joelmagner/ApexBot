import * as fs from "fs";
export default class Metadata {
    public getAppVersion(): string{   
       return JSON.parse(fs.readFileSync("./package.json", "UTF-8")).version;
    }
    public getAuthor(): string{
        return JSON.parse(fs.readFileSync("./package.json", "UTF-8")).author;
    }
    public getBotChannel(): string{
        return JSON.parse(fs.readFileSync("./package.json", "UTF-8")).bot_channel;
    }
    public getRoleName(): string{
        return JSON.parse(fs.readFileSync("./package.json", "UTF-8")).role_name;
    }
}