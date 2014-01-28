var request = require('request'),
    baseurl = "http://ws.spotify.com",
    iconurl = "//d2c87l0yth4zbw.cloudfront.net/i/_global/favicon.png",
    type_mapping = {
        artist: "artist",
        album: "album",
        track: "track"
    };

function parse(type, object) {
    if (type === "album") {
        return {
            title: object.name,
            id: object.href,
            href: object.href.replace("spotify:", "https://play.spotify.com/").replace(type + ":", type + "/"),
            release_date: object.released,
            cover: "" // cover is not available in spotify api
        };
    }
    if (type === "artist") {
        return {
            name: object.name,
            id: object.href,
            href: object.href.replace("spotify:", "https://play.spotify.com/").replace(type + ":", type + "/"),
            icon: "" // artist icon is not available in spotify api
        };
    }
    if (type === "track") {
        return {
            // title: object.title,
            // id: object.id,
            // href: object.link,
            // release_date: object.release_date
        };
    }
}

var Spotify = function Spotify() {

};

Spotify.prototype.getServiceIconUrl = function() {
    return iconurl;
};

Spotify.prototype.search = function spotify_search(type, query, callback) {
    request(baseurl + "/search/1/" + type_mapping[type] + ".json?q=" + type_mapping[type] + ":%22" + query + "%22",  function(error, response, body) {
            var answer = JSON.parse(body),
                results = answer.artists.map(function(item, key, list) {
                    return parse(type, item);
                });
        callback(results, query);
    });
};

Spotify.prototype.get = function spotify_get(type, id, callback) {
    request(baseurl + "/lookup/1/.json?uri=" + id,  function(error, response, body) {
        var answer = JSON.parse(body),
            result = parse(type, answer[type_mapping[type]]);
        callback(result, id);
    });
};

Spotify.prototype.getArtistAlbums = function spotify_getArtistAlbums(artistid, callback) {
    request(baseurl + "/lookup/1/.json?uri=" + artistid + "&extras=album", function(error, response, body) {
        var answer = JSON.parse(body),
            availableAlbums = answer.artist.albums.map(function(item) {
                return parse("album", item.album);
            });
        callback(availableAlbums, artistid);
    });
};

module.exports = Spotify;