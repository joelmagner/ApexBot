
import * as request from 'request';
import Settings from '../models/settings.model';
export default class MusicHelper{

    private getYouTubeID: any = require("get-youtube-id");
    
    isYoutube(url: string) {
        return url.toLowerCase().indexOf("youtube.com") > -1;
    }

    searchVideo(query: any, callback: any, settings: Settings) {
        request(settings.yt_uri + encodeURIComponent(query) + "&key=" + settings.yt_api_key, function (error: any, response: any, body: any) {
            var json = JSON.parse(body);
            if (!json.items[0]) {
                callback("3_-a9nVZYjk");
            }
            else {
                callback(json.items[0].id.videoId);
            }
        });
    }

    addToQueue(url: string, guild: any) {
        this.isYoutube(url) ? guild.queue.push(this.getYouTubeID(url)) : guild.queue.push(url);
    }

    getID(url: any, callback: any, settings: Settings) {
        if (this.isYoutube(url)) {
            callback(this.getYouTubeID(url));
        } else {
            this.searchVideo(url, (id: any) => { callback(id); }, settings);
        }
    }

}