const base_url = 'https://api.football-data.org/v2';
  const options = {
    headers: {
      'X-Auth-Token': 'f6cd28316d0d49b0a8fe42d15dbd511f'
    }
  };

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);

    return Promise.reject(new Error(response.statusText));
  } else {

    return Promise.resolve(response);
  }
}


function json(response) {
  return response.json();
}


function error(error) {

  console.log("Error : " + error);
}


function getTeam() {
  if ("caches" in window) {
    caches.match(base_url + "/competitions/2021/teams", options).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let team = "";
          data.teams.forEach(function(club) {
            team += `
            <ul class="col s6 collection">
              <li class="collection-item avatar">
                <img href="./team.html?id=${club.id}" src="${club.crestUrl}" alt="" class="center circle">
                <a href="./team.html?id=${club.id}">${club.name}</a>
              </li>
            </ul>
                `;
              });
              document.getElementById("team").innerHTML = team;
          });
        }
      });
    }

    fetch(base_url + "/competitions/2021/teams", options)
      .then(status)
      .then(json)
      .then(function(data) {
        let team = "";
        data.teams.forEach(function(club) {
          team += `
          <ul class="col s6 collection">
            <li class="collection-item avatar">
              <img href="./team.html?id=${club.id}" src="${club.crestUrl}" alt="" class="center circle">
              <a href="./team.html?id=${club.id}">${club.name}</a>
            </li>
          </ul>
              `;
            });
            document.getElementById("team").innerHTML = team;
      })
      .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if ("caches" in window) {
      caches.match(base_url + "/teams/" + idParam, options).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            let team = `
            <style>
            .gambar{
              max-width: 400px;
              height: 400px;
              margin: auto;
            }
            </style>
            <div class="center card">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="gambar activator" src="${data.crestUrl}">
            </div>
            <div class="card-content">
              <h4 class="card-title activator grey-text text-darken-4">${data.name}</h4>
              <p>"Click image to reveals Club's Profile" </p>
            </div>
            <div class="card-reveal">
            <span class="card-title grey-text text-darken-4">Club's Profile: <i class="material-icons right">close</i></span>
                <table class="highlight" border="2">  
                    <tr>                        
                      <th>Address</th>
                      <td>${data.address}</td>
                    </tr>
                    <tr>  
                      <th>Founded</th>
                      <td>${data.founded}</td>
                    </tr>
                    <tr>  
                      <th>Website</th>
                      <td>${data.website}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>${data.email}</td>
                    </tr>
                    <tr>
                      <th>Stadium</th>
                      <td>${data.venue}</td>
                    </tr>                    
                  </table>
            </div>
          </div>
            <h5 class="card-title">Squad List :</h5>
          `;
              let squads = "";
              data.squad.forEach(function(club) {
                squads += `
                    <div class="col s12 m6 card">
                      <table class="highlight" border="2">
                        <tr>
                          <th>Name</th>
                          <td>${club.name}</td>
                        </tr>
                        <tr>
                          <th>Position</th>
                          <td>${club.position}</td>
                        </tr>
                        <tr>  
                          <th>Nationality</th>
                          <td>${club.nationality}</td>
                        </tr>
                        <tr>  
                          <th>Shirt Number</th>
                          <td>${club.shirtNumber}</td>
                        </tr>
                      </table>
                    </div> 
                      `;
              document.getElementById("body-content").innerHTML = team+squads;
              resolve(data);
            });
          });
        }
      });
    }
    fetch(base_url + "/teams/" + idParam, options)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log(data);
        let team = `
        <style>
        .gambar{
          max-width: 400px;
          height: 400px;
          margin: auto;
        }
        </style>
        <div class="center card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="gambar activator" src="${data.crestUrl}">
        </div>
        <div class="card-content">
          <h4 class="card-title activator grey-text text-darken-4">${data.name}</h4>
          <p>"Click image to reveals Club's Profile" </p>
        </div>
        <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">Club's Profile: <i class="material-icons right">close</i></span>
            <table class="highlight" border="2">  
                <tr>                        
                  <th>Address</th>
                  <td>${data.address}</td>
                </tr>
                <tr>  
                  <th>Founded</th>
                  <td>${data.founded}</td>
                </tr>
                <tr>  
                  <th>Website</th>
                  <td>${data.website}</td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>${data.email}</td>
                </tr>
                <tr>
                  <th>Stadium</th>
                  <td>${data.venue}</td>
                </tr>                    
              </table>
        </div>
      </div>
        <h5 class="card-title">Squad List :</h5>
      `;
          let squads = "";
          data.squad.forEach(function(club) {
            squads += `
                <div class="col s12 m6 card">
                  <table class="highlight" border="2">
                    <tr>
                      <th>Name</th>
                      <td>${club.name}</td>
                    </tr>
                    <tr>
                      <th>Position</th>
                      <td>${club.position}</td>
                    </tr>
                    <tr>  
                      <th>Nationality</th>
                      <td>${club.nationality}</td>
                    </tr>
                    <tr>  
                      <th>Shirt Number</th>
                      <td>${club.shirtNumber}</td>
                    </tr>
                  </table>
                </div> 
                  `;
              document.getElementById("body-content").innerHTML = team+squads;
              resolve(data);
          });
      });
  });
}

function getStandings() {
  if ("caches" in window) {
    caches.match(base_url + "/competitions/2021/standings", options).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let kepala = "";
      kepala +=`
      <h5><img src="/index.png" width="50" heigth="50">Standings</h5>
      <table class="highlight" border="2">
        <thead>
          <tr>
            <th width="5%">Pos</th>
            <th width="55%">Team</th>
            <th width="5%">MP</th>
            <th width="5%">W</th>
            <th width="5%">D</th>
            <th width="5%">L</th>
            <th width="5%">GF</th>
            <th width="5%">GA</th>
            <th width="5%">GD</th>
            <th width="5%">Pts</th>
          </tr>
        </thead>    
      `;
      let klasemen = "";
          data.standings[0].table.forEach(function(peringkat) {
            klasemen += `
            <style>
            @media screen and (min-width: 320px) and (max-device-width: 980px) {
              .logo {
                display: none;
              }
            }
            </style>
            <table class="highlight" border="2">
              <tbody>
              <tr>
                <td width="5%">${peringkat.position}</td>
                <td><img class="logo" src="${peringkat.team.crestUrl}" alt="" width="30px" height="30px"></td>
                <td width=55%">${peringkat.team.name}</td>
                <td width="5%">${peringkat.playedGames}</td>
                <td width="5%">${peringkat.won}</td>
                <td width="5%">${peringkat.draw}</td>
                <td width="5%">${peringkat.lost}</td>
                <td width="5%">${peringkat.goalsFor}</td>
                <td width="5%">${peringkat.goalsAgainst}</td>
                <td width="5%">${peringkat.goalDifference}</td>
                <td width="5%">${peringkat.points}</td>
              </tr>
              </tbody>
            </table>
                `;
          });
          document.getElementById("standing").innerHTML = kepala+klasemen;
        });
      }
    });
  }

  fetch(base_url + "/competitions/2021/standings", options)
    .then(status)
    .then(json)
    .then(function(data) {
      let kepala = "";
      kepala +=`
      <h5><img src="/index.png" width="50" heigth="50">Standings</h5>
      <table class="highlight" border="2">
        <thead>
          <tr>
            <th width="5%">Pos</th>
            <th width="55%">Team</th>
            <th width="5%">MP</th>
            <th width="5%">W</th>
            <th width="5%">D</th>
            <th width="5%">L</th>
            <th width="5%">GF</th>
            <th width="5%">GA</th>
            <th width="5%">GD</th>
            <th width="5%">Pts</th>
          </tr>
        </thead>    
      `;
      let klasemen = "";
          data.standings[0].table.forEach(function(peringkat) {
            klasemen += `
            <style>
            @media screen and (min-width: 320px) and (max-device-width: 980px) {
              .logo {
                display: none;
              }
            }
            </style>
            <table class="highlight" border="2">
              <tbody>
              <tr>
                <td width="5%">${peringkat.position}</td>
                <td><img class="logo" src="${peringkat.team.crestUrl}" alt="" width="30px" height="30px"></td>
                <td width=55%">${peringkat.team.name}</td>
                <td width="5%">${peringkat.playedGames}</td>
                <td width="5%">${peringkat.won}</td>
                <td width="5%">${peringkat.draw}</td>
                <td width="5%">${peringkat.lost}</td>
                <td width="5%">${peringkat.goalsFor}</td>
                <td width="5%">${peringkat.goalsAgainst}</td>
                <td width="5%">${peringkat.goalDifference}</td>
                <td width="5%">${peringkat.points}</td>
              </tr>
              </tbody>
            </table>
                `;
          });
          document.getElementById("standing").innerHTML = kepala+klasemen;
        })
    .catch(error);
}

function getSchedules() {
  if ("caches" in window) {
    caches.match(base_url + "/competitions/2021/matches", options).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          let jadwal1 = "";
          data.matches.forEach(function(schedule) {
            const date = new Date(schedule.utcDate);
            date.setHours(date.getHours()+7);
            jadwal1 += `
            <style>
            .card:hover {
              background-color: #00b8d4;
            }
            </style>
            <div col s6 class="card">
            <table border="1">
              <tr>
                  <td class="center-align">${schedule.homeTeam.name} VS ${schedule.awayTeam.name} <br>
                  Matchday: ${schedule.matchday} <br> Date: ${date.toString()} <br>
                  Status : ${schedule.status} <br>
                  Result : <strong>${schedule.score.fullTime.homeTeam}</strong> - <strong>${schedule.score.fullTime.awayTeam}</strong></td>
              </tr>
            </table>
            </div>  
            `;
          });
          document.getElementById("schedule").innerHTML = jadwal1;
        });
      }
    });
  }

  fetch(base_url + "/competitions/2021/matches", options)
    .then(status)
    .then(json)
    .then(function(data) {
    
      let jadwal = "";
          data.matches.forEach(function(schedule) {
            const date = new Date(schedule.utcDate);
            date.setHours(date.getHours());
            jadwal += `
            <style>
            .card:hover {
              background-color: #00b8d4;
            }
            </style>
            <div col s6 class="card">
            <table border="1">
              <tr>
                  <td class="center-align">${schedule.homeTeam.name} VS ${schedule.awayTeam.name} <br>
                  Matchday: ${schedule.matchday} <br> Date: ${date.toString()} <br>
                  Status : ${schedule.status} <br>
                  Result : <strong>${schedule.score.fullTime.homeTeam}</strong> - <strong>${schedule.score.fullTime.awayTeam}</strong></td>
              </tr>
            </table>
            </div>  
            `;
          });
          document.getElementById("schedule").innerHTML = jadwal;
        })
    .catch(error);
  }

  function getSavedTeam() {
    getAll().then(function(savedTeam) {
      console.log(savedTeam);
      var savedTeamHtml = "";
      savedTeam.forEach(function(club) {
        savedTeamHtml += `
        <ul class="col s6 collection">
          <li class="collection-item avatar">
            <img href="./team.html?id=${club.id}&saved=true" src="${club.crestUrl}" alt="" class="center circle">
            <a href="./team.html?id=${club.id}&saved=true">${club.name}</a>
          </li>
        </ul>
            `;
      });
      document.getElementById("body-content").innerHTML = savedTeamHtml;
    });
  }

  function getSavedTeamById() {
    var urlParams = new URLSearchParams(window.location.search);
    var idParam = urlParams.get("id");
    
    getById(idParam).then(function(data) {
      getSavedTeamHtml = '';
      var getSavedTeamHtml = `
      <style>
      .gambar{
        max-width: 400px;
        height: 400px;
        margin: auto;
      }
      </style>
      <div class="center card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="gambar activator" src="${data.crestUrl}">
      </div>
      <div class="card-content">
        <h4 class="card-title activator grey-text text-darken-4">${data.name}</h4>
        <p>"Click image to reveals Club's Profile" </p>
      </div>
      <div class="card-reveal">
      <span class="card-title grey-text text-darken-4">Club's Profile: <i class="material-icons right">close</i></span>
          <table class="highlight" border="2">  
              <tr>                        
                <th>Address</th>
                <td>${data.address}</td>
              </tr>
              <tr>  
                <th>Founded</th>
                <td>${data.founded}</td>
              </tr>
              <tr>  
                <th>Website</th>
                <td>${data.website}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>${data.email}</td>
              </tr>
              <tr>
                <th>Stadium</th>
                <td>${data.venue}</td>
              </tr>                    
            </table>
      </div>
    </div>
      <h5 class="card-title">Squad List :</h5>
    `;
        let squads = "";
        data.squad.forEach(function(club) {
          squads += `
              <div class="col s12 m6 card">
                <table class="highlight" border="2">
                  <tr>
                    <th>Name</th>
                    <td>${club.name}</td>
                  </tr>
                  <tr>
                    <th>Position</th>
                    <td>${club.position}</td>
                  </tr>
                  <tr>  
                    <th>Nationality</th>
                    <td>${club.nationality}</td>
                  </tr>
                  <tr>  
                    <th>Shirt Number</th>
                    <td>${club.shirtNumber}</td>
                  </tr>
                </table>
              </div> 
                `;

      document.getElementById("body-content").innerHTML = getSavedTeamHtml+squads;
    });
  });
}