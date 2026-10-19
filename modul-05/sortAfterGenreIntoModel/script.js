/* 
Puts Albums into a model based off the first track. 
The model can then be used later by a function to show the albums that we want based on Genre
*/

const genreArray = [];
let genreAlbums = {"All": []}; // "Rock": [Artist - Album - Year, Artist - Album - Year...]
btnsElement = document.getElementById("btns");
contentElement = document.getElementById("content");

fetchData("Data/albums.json").then((data) => {
    data.albums.forEach((album) => {
        if (!genreArray.includes(album.tracks[0].genre.name)) {
            genreArray.push(album.tracks[0].genre.name);
        }
    });
console.log(genreArray.sort());
// Display All Button
let allBtn = document.createElement("button");
allBtn.addEventListener("click",()=>{displayAlbums("All")});
allBtn.innerText = "All";
allBtn.id = "All";
allBtn.className = "genreBtn";
btnsElement.appendChild(allBtn);

    // Create buttons for each Genre
    genreArray.forEach((genre) => {
        let btn = document.createElement("button")
        btn.innerText = genre;
        btn.id = genre;
        btn.addEventListener("click", () => {
            displayAlbums(genre);
        });
        btn.className = "genreBtn";
        btnsElement.appendChild(btn);
    });
    // Then put the tracks for each genre into an array in an object called genreAlbums
    data.albums.forEach((album) => {
        const genre = album.tracks[0].genre.name;
        const formattedAlbum = album.artist.name + " - " + album.title + " - " + album.released.slice(0, 4);
        if (!genreAlbums[genre]) {
            genreAlbums[genre] = [];
            genreAlbums[genre].push(formattedAlbum);
        } else {
            genreAlbums[genre].push(formattedAlbum);
        }
        genreAlbums["All"].push(formattedAlbum);
    });

console.log(genreAlbums);

// Default page to Display All
genreAlbums["All"].forEach((album) => {
let p = document.createElement("p");
p.innerText = album;
contentElement.appendChild(p);
});
});

function displayAlbums(genre) {
    contentElement.innerHTML = "";
    genreAlbums[genre].forEach((album) => {
        let p = document.createElement("p");
        p.innerText = album;
        contentElement.appendChild(p);
    });
}


//Magi - det taler vi om senere!!
async function fetchData(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
