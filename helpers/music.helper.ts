import * as request from 'request';
import Settings from '../models/settings.model';
export default class MusicHelper {

    private getInfo: any = require("ytdl-getinfo");

    isYoutube(url: string) {
        return url.toLowerCase().indexOf("youtube.com") > -1 || url.toLowerCase().indexOf("youtu.be") > -1;
    }

    async searchVideo(query: any, callback: any, settings: Settings) {
        await request(settings.yt_uri + encodeURIComponent(query) + "&key=" + settings.yt_api_key, (error: any, response: any, body: any) => {
            const json = JSON.parse(body);
            if (!json.items[0]) {
                callback("3_-a9nVZYjk");
            }
            else {
                callback(json.items[0].id.videoId);
            }
        });
    }

    addToQueue(url: string, guild: any) {
        this.isYoutube(url) ?
            guild.queue.push(this.getInfo(url).catch((error: any) => console.log("Error AddToQueue() ", error))) :
            guild.queue.push(url);
    }

    getID(url: any, callback: any, settings: Settings) {
        if (this.isYoutube(url)) {
            callback(this.getInfo(url).catch((error: any) => console.log("Error: getID() ", error)));
        } else {
            this.searchVideo(url, (id: any) => { callback(id); }, settings);
        }
    }

}