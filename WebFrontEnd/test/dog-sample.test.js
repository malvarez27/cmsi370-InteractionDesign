  // Used JsonP and Jasmine does not work
  // made tests for all of my buttons

describe("Dog search example", () => {
    beforeEach(() => {
        fixture.setBase("test");
        fixture.load("search.fixture.html");
        window.DogSearchController.init();
    });

    afterEach(() => {
        fixture.cleanup();
    });

    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-button1").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a dog breed search when the search button is clicked", () => {
            expect(request.url).toBe(
              "http://api.petfinder.com/breed.list?animal=dog&format=json&key=4b5717dd1298af6b1b1b4f481b398b1a&callback=?");
        });

        it("should populate the image container when search results arrive", () => {
            expect($("listbreeds").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "tumblr.com",
                        petfinder: {
                            breeds: {
                                breed: [{ $t: "Affenpinscher"}, { $t: "Afghan Hound"}, {$t: "Airedale Terrier"}]
                            }
                        }
                    }]
                })
            });

            expect($("listbreeds").children().length).toBe(3);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });
    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-button2").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a dog breed search when the search button is clicked", () => {
            expect(request.url).toBe(
              'http://api.petfinder.com/pet.find?animal=dog&format=json&' +
              'key=4b5717dd1298af6b1b1b4f481b398b1a&breed=' + capitalize(breedSearchTerm.val()) + '&' +
                'sex=' + capitalize(sexSearchTerm.val()) + '&location=90250&callback=?');
        });

        it("should populate the image container when search results arrive", () => {
            expect($("findpet").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "tumblr.com",
                        petfinder: {
                            pets: {
                                pet: [{ $t: "descripton"}, { $t: "address1"}, {$t: "email"}]
                            }
                        }
                    }]
                })
            });

            expect($("findpet").children().length).toBe(3);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });
    describe("API calls", () => {
        var request;

        beforeEach(() => {
            jasmine.Ajax.install();

            $("#search-button3").click();

            request = jasmine.Ajax.requests.mostRecent();
        });

        afterEach(() => {
            jasmine.Ajax.uninstall();
        });

        it("should trigger a dog breed search when the search button is clicked", () => {
            expect(request.url).toBe(
              'http://api.petfinder.com/shelter.find?format=json&' +
              'key=4b5717dd1298af6b1b1b4f481b398b1a&location=90245&callback=?');
        });

        it("should populate the image container when search results arrive", () => {
            expect($("findpet").children().length).toBe(0);

            // To manage size, we supply a mock response that contains _only_ what the app will need. This does mean
            // that we need to revise the mock response if our app starts using more (or different) data.
            request.respondWith({
                status: 200,
                responseText: JSON.stringify({
                    data: [{
                        source_tld: "tumblr.com",
                        petfinder: {
                            shelters: {
                                shelter: [{ $t: "name"}, { $t: "address1"}, {$t: "city"}]
                            }
                        }
                    }]
                })
            });

            expect($("findshelter").children().length).toBe(3);
            // We can go even further by examining the resulting element(s) and expecting their content to match the
            // mock response, but we will leave this as "further work" for now.
        });
    });
});
