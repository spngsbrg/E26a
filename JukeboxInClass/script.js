fetchData("data/albums.json").then(function (data) {
  console.log(data);

  console.log(data.albums[0].tracks[0].genre.name);

  const genreArray = [];

  for (let i = 0; i < data.albums.length; i++) {
    if (!genreArray.includes(data.albums[i].tracks[0].genre.name)) {
      genreArray.push(data.albums[i].tracks[0].genre.name);
    }
  }

  genreArray.sort();

  console.log(genreArray);

  let btnContainer = document.getElementById("btns");

  genreArray.forEach(function (genre) {
    let btn = document.createElement("button");
    btn.innerText = genre;
    btn.addEventListener("click", () =>{
      hideOtherGenres(genre)
    })
    btnContainer.appendChild(btn);
  });

  console.log(data.albums[0].artist.name);
  console.log(data.albums[0].title);
  console.log(data.albums[0].released);

  let albumsTable = document.getElementById("albums");

  //for (let i in data.albums)  {}
  //for (let i = 0; i < data.albums.length; i++) {}

  data.albums.forEach(function (album) {
    let row = document.createElement("tr");
    let artistName = document.createElement("td");
    let albumName = document.createElement("td");
    let releasedDate = document.createElement("td");
    let currentGenre = album.tracks[0].genre.name;

    artistName.innerText = album.artist.name;
    albumName.innerText = album.title;
    releasedDate.innerText = album.released;

    row.style.display = "block";
    row.appendChild(artistName);
    row.appendChild(albumName);
    row.appendChild(releasedDate);
    row.className = currentGenre;

    albumsTable.appendChild(row);
  });
  
  
});


function hideOtherGenres(genre){
  console.log(genre);
  let albumsTableRows = document.getElementById("albums");
  for (child of albumsTableRows.getElementsByTagName("tr")) {
    if (child.className !== genre){
      child.style.display = "none";
      // console.log(child.innerText + " is not " + genre);
    } else {
      child.style.display = "block";
      // console.log(child.innerText + " is " + genre);
    }
  };
};


//Magi - det taler vi om senere!!
async function fetchData(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
