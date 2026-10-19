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

    btn.onclick = filterAlbums;

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

    row.appendChild(artistName);
    row.appendChild(albumName);
    row.appendChild(releasedDate);
    row.className = currentGenre;

    albumsTable.appendChild(row);
  });

  let albumRows = document.querySelectorAll("tr");
  console.log(albumRows);

  /*
  albumRows.forEach(function (row) {
    if (row.className == "Rock") {
      row.style.display = "none";
    }
  });
*/

  function filterAlbums(e) {
    let filter = e.target.innerText;
    console.log(filter);

    albumRows.forEach(function (row) {
      row.style.display = "none";
      if (row.className == filter || row.className == "head") {
        row.style.display = "table-row";
      }
    });
  }
});

//Magi - det taler vi om senere!!
async function fetchData(url) {
  let request = await fetch(url);
  let json = await request.json();
  return json;
}
