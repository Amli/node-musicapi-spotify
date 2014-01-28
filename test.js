var assert = require('assert'),
    Spotify = require('./spotify');

describe('Spotify', function() {
    describe('icon', function() {
        it('should return an url', function() {
            var service = new Spotify();
            assert(service.getServiceIconUrl());
        })
    })
    describe('query', function() {
        var service;
        before(function() {
            service = new Spotify();
        })
        describe("search artist", function() {
            it("should return a not empty an array of objects", function(done) {
                this.timeout(5000);
                service.search("artist", "Daft Punk", function(results) {
                    assert.notEqual(results.length, 0);
                    done();
                });
            });
        });

        describe("get albums for artist", function() {
            var results;
            before(function(done) {
                service.getArtistAlbums("spotify:artist:4tZwfgrHOc3mvqYlEYSvVi", function(r) {
                    results = r;
                    done();
                });
            });
            it("should return a not empty an array of objects", function() {
                assert.notEqual(results.length, 0);
            });
            it("should contain a title", function() {
                assert.ok("title" in results[0]);
            });
            it("should contain an href", function() {
                assert.ok("href" in results[0]);
            });
            it("should contain an id", function() {
                assert.ok("id" in results[0]);
            });
            it("should contain a cover", function() {
                assert.ok("cover" in results[0]);
            });
            it("should contain a release_date", function() {
                assert.ok("release_date" in results[0]);
            });
        });

        describe("get artist", function() {
            var result;
            before(function(done) {
                service.get("artist", "spotify:artist:4tZwfgrHOc3mvqYlEYSvVi", function(r) {
                    result = r;
                    done();
                });
            });
            it("should contain a name", function() {
                assert.ok("name" in result);
            });
            it("should contain an href", function() {
                assert.ok("href" in result);
            });
            it("should contain an id", function() {
                assert.ok("id" in result);
            });
            it("should contain an icon", function() {
                assert.ok("icon" in result);
            });
        });
    });
});
