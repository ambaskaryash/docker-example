const defaultMovies = [
  "Inception", "The Dark Knight", "Sholay", "3 Idiots", "Avengers: Endgame",
  "Dangal", "Interstellar", "Lagaan", "Titanic", "Bahubali",
  "Fight Club", "PK", "Jab We Met", "Forrest Gump", "Drishyam"
];

function renderMovie(data, target) {
  const html = `
    <div class="movie-card">
      <img src="${data.Poster}" alt="Poster"/>
      <h2>${data.Title} (${data.Year})</h2>
      <p><strong>Genre:</strong> ${data.Genre}</p>
      <p><strong>Director:</strong> ${data.Director}</p>
      <p><strong>Plot:</strong> ${data.Plot}</p>
      <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
    </div>
  `;
  $(target).append(html);
}

function searchMovie(title) {
  $.get(`http://43.204.189.240:5001/api/movie?title=${title}`, function (data) {
    $('#movieResult').empty();
    if (data.Response === "False") {
      $('#movieResult').html('<p>Movie not found.</p>');
    } else {
      renderMovie(data, '#movieResult');
    }
  });
}

function loadDefaultMovies() {
  $('#movieResult').html('<h3>Popular Movies</h3>');
  defaultMovies.forEach(title => {
    $.get(`http://43.204.189.240:5001/api/movie?title=${title}`, function (data) {
      if (data.Response === "True") {
        renderMovie(data, '#movieResult');
      }
    });
  });
}

$(document).ready(function () {
  loadDefaultMovies();

  $('#searchButton').click(function () {
    const title = $('#searchBox').val().trim();
    if (title.length >= 3) {
      searchMovie(title);
    }
  });

  $('#searchBox').keypress(function (e) {
    if (e.which === 13) {
      $('#searchButton').click();
    }
  });
});