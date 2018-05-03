/*
   This is a very simple example of a web front end for a publicly available web service.
   Due to its pedagogical nature, comments are more elaborate than they typically need to
   be, or may even be present when no developer explanation would usually be necessary.

   Further, this example uses JavaScript ES6 syntax.
*/
"use strict";

// Yes, this is a "global." But it is a single entry point for all of the code in the module,
// and in its role as the overall controller code of the page, this is one of the acceptable
// uses for a [single!] top-level name.
//
// Module managers address even this issue, for web apps of sufficient complexity.
(() => {
    let capitalize = (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    window.DogSearchController = {
        init: () => {
            let searchButton1 = $("#search-button1");
            let searchButton2 = $("#search-button2");
            let searchButton3 = $("#search-button3");
            let breedSearchTerm = $("#breed-search-term");
            let sexSearchTerm = $("#sex-search-term");
            let breeds = $("#listbreeds");
            let pets = $("#findpet");
            let shelters = $("#findshelter");


            searchButton1.click(() => {
                // The getJSON function initiates a connection to the web service.
                //
                // The design of jQuery’s functions allows this entire sequence to be
                // rendered in a _single statement_, thus obviating the need for curly
                // braces but resulting in what many will view to be a decrease in readability
                // (for those who aren’t used to functional-style programming). YMMV
                $.getJSON(
                    'http://api.petfinder.com/breed.list?animal=dog&format=json&' +
                      'key=4b5717dd1298af6b1b1b4f481b398b1a&callback=?')
                    .done(function(petApiData){
                        let breedArray = petApiData.petfinder.breeds.breed;
                        breeds.empty().append(
                            breedArray.map(breed => $("<div> </div>").addClass("col-6").append(
                                $(`<p>${breed.$t}</p>`)
                            )));
                    });
            });

            $(() => {
                $(".slider-this").slider({
                    change: function (dog) {
                        breedSearchTerm.val(dog);
                    }
                });
            });

            searchButton2.click(() =>
                $.getJSON('http://api.petfinder.com/pet.find?animal=dog&format=json&' +
                'key=4b5717dd1298af6b1b1b4f481b398b1a&breed=' + capitalize(breedSearchTerm.val()) + '&' +
                  'sex=' + capitalize(sexSearchTerm.val()) + '&location=90250&callback=?')
                    .done(function(petApiData){
                        // console.log(petApiData);
                        let petFinderArray = petApiData.petfinder.pets.pet;
                        pets.empty();
                        let currentGroup;
                        petFinderArray.forEach((pet, index) => {
                            if (index % 3 === 0) {
                                currentGroup = $("<div></div>").addClass("card-group");
                                pets.append(currentGroup);
                            }
                            let template = $("#pet-template").clone();
                            template.attr({ id: "" });
                            template.removeClass("invisible");
                            template.find("img").attr({ src: pet.media.photos.photo[3].$t });
                            template.find("em.description").text(`${pet.description.$t}`);
                            template.find("em.address").text(`${pet.contact.address1.$t}`);
                            template.find("em.email").text(`${pet.contact.email.$t}`);
                            currentGroup.append(template);
                        });
                    })
            );
            searchButton3.click(() =>
            // shelter.find
                $.getJSON('http://api.petfinder.com/shelter.find?format=json&' +
                'key=4b5717dd1298af6b1b1b4f481b398b1a&location=90245&callback=?')
                    .done(function(petApiData){
                      // console.log(petApiData);
                        let shelterFinderArray = petApiData.petfinder.shelters.shelter;
                        shelters.empty().append(
                            shelterFinderArray.map(shelter => $("<div> </div>").addClass("col-6").append(
                                $(`<p>Shelter Name: ${shelter.name.$t} <br>
                                  Shelter Address: ${shelter.address1.$t} <br>
                                  City: ${shelter.city.$t}  <br>
                                  Zip Code: ${shelter.zip.$t} <br>
                                  Email: ${shelter.email.$t}</p>`)
                            )));
                    })

            );
        }
    };
}
)();
