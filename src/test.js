var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function run(film, character) {
  let charFilms = request(
    "https://challenges.hackajob.co/swapi/api/people/?search=",
    character
  );

  let filmChars = request(
    "https://challenges.hackajob.co/swapi/api/films/?search=",
    film
  );

  if (filmChars.results[0] !== undefined) {
    filmChars = filmChars.results[0].characters.map(character => {
      return request(character, "").name;
    });
  } else {
    charFilms = ["none"];
  }

  if (charFilms.results[0] !== undefined) {
    charFilms = charFilms.results[0].films.map(film => {
      return request(film, "").title;
    });
  } else {
    charFilms = ["none"];
  }
  return (
    film +
    ": " +
    filmChars.sort().join(", ") +
    "; " +
    character +
    ": " +
    charFilms.sort().join(", ")
  );
}

function request(url, param) {
  let request = new XMLHttpRequest();
  request.open("GET", url + param, false);
  request.send(null);

  if (request.status === 200) {
    return JSON.parse(request.responseText);
  }
}

console.log(run("A New Hope", "Raymus Antilles"));
