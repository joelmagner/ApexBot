export default class Settings {
    yt_api_key: string | undefined;
    yt_uri: string = "https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=";
    yt_generic: string = "https://www.youtube.com/watch?v=";
    bot_controller: string | undefined;
    prefix: string = "§";
    discord_token: string | undefined;
}