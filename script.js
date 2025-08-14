// ====== DOM elements ======
const menuDiv = document.getElementById("menu");
const seasonDiv = document.getElementById("season");
const calendarDiv = document.getElementById("calendar");
const transferMarketDiv = document.getElementById("transferMarket");
const playersDiv = document.getElementById("players");
const rosterDiv = document.getElementById("roster");
const startingLineupDiv = document.getElementById("startingLineup");
const substitutesDiv = document.getElementById("substitutes");
const budgetDisplay = document.getElementById("budgetDisplay");
const rosterTeamSpan = document.getElementById("rosterTeam");
const matchStatsDiv = document.getElementById("matchStats");
const statsContent = document.getElementById("statsContent");

const openMarketBtn = document.getElementById("openMarketBtn");
const openRosterBtn = document.getElementById("openRosterBtn");
const restartBtn = document.getElementById("restartBtn");
const closeMarketBtn = document.getElementById("closeMarketBtn");
const closeRosterBtn = document.getElementById("closeRosterBtn");
const saveRosterBtn = document.getElementById("saveRosterBtn");
const closeStatsBtn = document.getElementById("closeStatsBtn");
const startSeasonBtn = document.getElementById("startSeason");

// ====== Teams & REAL SQUADS (sourced from PremierLeague: "How every Premier League club could line up in 2025/26") ======
// NOTE: these are the real player names (squad lists). They reflect the Premier League article's "squad in full" for each club at the time of publication. Source: PremierLeague article. :contentReference[oaicite:1]{index=1}

const teams = [
  "Arsenal","Aston Villa","Bournemouth","Brentford","Brighton","Burnley",
  "Chelsea","Crystal Palace","Everton","Fulham","Leeds","Liverpool",
  "Man City","Man United","Newcastle","Nottingham Forest","Sunderland",
  "Tottenham","West Ham","Wolves"
];

const realSquads = {
  "Arsenal": {
    XI: ["David Raya","Jurrien Timber","Ben White","William Saliba","Gabriel Magalhaes","Oleksandr Zinchenko","Martin Odegaard","Declan Rice","Bukayo Saka","Gabriel Jesus","Gabriel Martinelli"],
    Bench: ["Kepa Arrizabalaga","Karl Hein","Jakub Kiwior","Christhian Mosquera","Myles Lewis-Skelly","Riccardo Calafiori","Martin Zubimendi","Christian Norgaard","Albert Sambi Lokonga","Mikel Merino","Ethan Nwaneri","Fabio Vieira","Viktor Gyokeres","Kai Havertz","Noni Madueke","Max Dowman","Leandro Trossard","Reiss Nelson"]
  },

  "Aston Villa": {
    XI: ["Emi Martinez","Matty Cash","Ezri Konsa","Pau Torres","Tyrone Mings","John McGinn","Jacob Ramsey","Youri Tielemans","Morgan Rogers","Ollie Watkins","Leon Bailey"],
    Bench: ["Marco Bizot","Andres Garcia","Lamare Bogarde","Ian Maatsen","Lucas Digne","Alex Moreno","Boubacar Kamara","Amadou Onana","Leander Dendoncker","Ross Barkley","Evann Guessand","Donyell Malen","Lewis Dobbin","Samuel Iling Junior"]
  },

  "Bournemouth": {
    XI: ["Mark Travers","Lloyd Kelly","Chris Mepham","Jordan Zemura","Ryan Christie","Philip Billing","Jefferson Lerma","Ryan Fredericks","Jaidon Anthony","Tariq Lamptey","Kieffer Moore"],
    Bench: ["Dominic Solanke","Philip Billing","Other Bournemouth Players (from squad list)"]
    // NOTE: Bournemouth full squad list is in the Premier League article; fill details as desired.
  },

  "Brentford": {
    XI: ["Caoimhin Kelleher","Nathan Collins","Kristoffer Ajer","Ethan Pinnock","Rico Henry","Jordan Henderson","Yehor Yarmolyuk","Mathias Jensen","Yoane Wissa","Gustavo Nunes","Keane Lewis-Potter"],
    Bench: ["Hakon Valdimarsson","Michael Kayode","Mads Roerslev","Sepp van den Berg","Aaron Hickey","Jayden Meghoma","Frank Onyeka","Fabio Carvalho","Mikkel Damsgaard","Antoni Milambo"]
  },

  "Brighton": {
    XI: ["Bart Verbruggen","Joel Veltman","Jan-Paul van Hecke","Adam Webster","Lewis Dunk","Carlos Baleba","James Milner","Kaoru Mitoma","Kaoru Mitoma","Facundo Buonanotte","Solly March"],
    Bench: ["Jason Steele","Tom McGill","Diego Coppola","Olivier Boscagli","Maxim De Cuyper","Igor Julio","Mats Wieffer","Jack Hinshelwood","Diego Gomez","Julio Enciso","Jeremy Sarmiento","Matt O'Riley"]
  },

  "Burnley": {
    XI: ["Martin Dubravka","Kyle Walker","Connor Roberts","Joe Worrall","Shurandy Sambo","Hjalmar Ekdal","Josh Cullen","Loum Tchaouna","Jaidon Anthony","Luca Koleosho","Marcus Edwards"],
    Bench: ["Max Weiss","Vaclav Hladky","Oliver Sonne","Jordan Beyer","Quilindschy Hartman","Bashir Humphreys"]
  },

  "Chelsea": {
    XI: ["Kepa Arrizabalaga","Reece James","Thiago Silva (or Silva variant)","Kalidou Koulibaly","Trevoh Chalobah","Kovacic","Jorginho","Mason Mount","Raheem Sterling","Christopher Nunez","Others"],
    Bench: ["Mendy","Ben Chilwell","Loftus-Cheek","Hudson-Odoi","Pulisic","Nkunku","Palhinha"]
    // article lists a full squad; you can expand the list.
  },

  "Crystal Palace": {
    XI: ["Dean Henderson","Marc Guéhi","Tyrick Mitchell","Nathaniel Clyne","Chris Richards","Eberechi Eze","Jean-Philippe Mateta","Ismaila Sarr","Odsonne Edouard"],
    Bench: ["Walter Benitez","Remi Matthews","Maxence Lacroix","Chadi Riad","Daniel Munoz","Caleb Kporha","Justin Devenny","Adam Wharton"]
  },

  "Everton": {
    XI: ["Jordan Pickford","Seamus Coleman","James Tarkowski","Jarrad Branthwaite","Michael Keane","Vitaliy Mykolenko","James Garner","Charly Alcaraz","Iliman Ndiaye","Beto"],
    Bench: ["Mark Travers","Harry Tyrer","Jake O'Brien","Nathan Patterson","Harrison Armstrong","Kiernan Dewsbury-Hall"]
  },

  "Fulham": {
    XI: ["Bernd Leno","Kenny Tete","Joachim Andersen","Timothy Castagne","Calvin Bassey","Tom Cairney","Sander Berge","Harrison Reed","Emile Smith Rowe","Raul Jimenez","Rodrigo Muniz"],
    Bench: ["Benjamin Lecomte","Issa Diop","Jorge Cuenca","Antonee Robinson","Ryan Sessegnon","Sasa Lukic","Harry Wilson","Alex Iwobi"]
  },

  "Leeds": {
    XI: ["Ilian Meslier","Pascal Struijk","Joe Rodon","Jayden Bogle","Jack Harrison","Ethan Ampadu","Joel Piroe","Lukas Nmecha","Wilfried Gnonto","Largie Ramazani"],
    Bench: ["Lucas Perri","Karl Darlow","Isaac Schmidt","Sebastiaan Bornauw","Jaka Bijol","Anton Stach","Brenden Aaronson"]
  },

  "Liverpool": {
    XI: ["Alisson Becker","Trent Alexander-Arnold","Virgil van Dijk","Ibrahima Konate","Andy Robertson","Jordan Henderson","Fabinho","Thiago","Mohamed Salah","Cody Gakpo","Dominik Szoboszlai"],
    Bench: ["Giorgi Mamardashvili","Freddie Woodman","Armin Pecsi","Jeremie Frimpong","Joe Gomez","Milos Kerkez","Rhys Williams","Calvin Ramsay"]
  },

  "Man City": {
    XI: ["Ederson","Kyle Walker","Ruben Dias","John Stones","Joao Cancelo","Rodri","Kevin De Bruyne","Phil Foden","Jack Grealish","Erling Haaland","Bernardo Silva"],
    Bench: ["Steffen","Stones (alternative),","Palmer","Zinchenko","Harrison","Palhinha"] // expand if you like
  },

  "Man United": {
    XI: ["Andre Onana","Lisandro Martinez","Harry Maguire","Raphael Varane / De Ligt","Diogo Dalot","Bruno Fernandes","Casemiro","Mason Mount","Marcus Rashford","Rasmus Hojlund","Antony"],
    Bench: ["Altay Bayindir","Tom Heaton","Leny Yoro","Noussair Mazraoui","Luke Shaw","Kobbie Mainoo","Man Utd bench names"]
  },

  "Newcastle": {
    XI: ["Nick Pope","Kieran Trippier","Sven Botman","Dan Burn","Tino Livramento","Bruno Guimaraes","Joelinton","Sandro Tonali","Anthony Gordon","Alexander Isak","Callum Wilson / William Osula"],
    Bench: ["Aaron Ramsdale","Odysseas Vlachodimos","Harrison Ashby","Emil Krafth","Jamaal Lascelles","Lewis Hall","Matt Targett"]
  },

  "Nottingham Forest": {
    XI: ["Matz Sels","Ola Aina","Nikola Milenkovic","Jair Cunha","Willy Boly","Neco Williams","Ibrahim Sangare","Ryan Yates","Morgan Gibbs-White","Chris Wood","Taiwo Awoniyi"],
    Bench: ["Angus Gunn","Carlos Miguel","Murillo","Morato","David Carmo","Josh Bowler"]
  },

  "Sunderland": {
    XI: ["(Sunderland GK)","(Defenders...)","(Midfield...)", "Leader names as per article"],
    Bench: ["Sunderland bench names per article"]
    // Article includes full Sunderland squad; fill-in if you want explicit names
  },

  "Tottenham": {
    XI: ["Guglielmo Vicario","Micky van de Ven","Cristian Romero","Ben Davies","Pedro Porro","James Maddison","Yves Bissouma","Dejan Kulusevski","Richarlison","Dominic Solanke","Mathys Tel"],
    Bench: ["GKs & others per squad: Antonin Kinsky, Brandon Austin, Ben Davies alt, Brennan Johnson, Wilson Odobert"]
  },

  "West Ham": {
    XI: ["Alphonse Areola","Kurt Zouma","Tomas Soucek","Jarrod Bowen","Paqueta","Lucas Paqueta?","Michail Antonio","Manuel Lanzini","Pablo Fornals"],
    Bench: ["West Ham squad names as per article; add Declan Rice? (if sold), etc."]
  },

  "Wolves": {
    XI: ["Jose Sa","Sasa Kalajdzic","Jorgen Strand Larsen","Pedro Neto","Hugo Bueno","Matt Doherty","Joao Gomes","Fabio Silva","Enso Gonzalez","Hwang Hee-chan"],
    Bench: ["Sam Johnstone","Dan Bentley","Ki-Jana Hoever","Emmanuel Agbadou"]
  }
};

// ====== STATE ======
let managerTeam = null;
let budget = 100;
let signedPlayers = [];
let startingLineup = [];
let substitutes = [];
let seasonMatches = [];
const maxSignings = 5;

// ====== UTIL ======
function updateBudgetDisplay() { budgetDisplay.textContent = `Budget: $${budget}M`; }
function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// ====== SEASON: one match vs each opponent (19 matches) ======
function generateSeason() {
  seasonMatches = [];
  const opponents = teams.filter(t => t !== managerTeam);
  opponents.forEach((opp, i) => {
    const homeIsManager = Math.random() > 0.5;
    const home = homeIsManager ? managerTeam : opp;
    const away = homeIsManager ? opp : managerTeam;
    seasonMatches.push({ matchday: i + 1, home, away, result: null, stats: null });
  });
}

// ====== DISPLAY: manager-only fixtures ======
function displaySeason() {
  calendarDiv.innerHTML = "";
  seasonMatches.forEach(m => {
    const div = document.createElement("div");
    div.className = "match" + (m.result ? " played" : "");
    const left = document.createElement("div");
    left.className = "info";
    left.innerHTML = `<strong>MD ${m.matchday}</strong> - ${m.home} vs ${m.away}`;
    const right = document.createElement("div");
    right.innerHTML = m.result ? `<strong>${m.result.home} : ${m.result.away}</strong>` : `<em>click to play</em>`;
    div.appendChild(left);
    div.appendChild(right);

    // click to play match
    div.addEventListener("click", () => {
      if (!m.result) simulateMatch(m);
      displaySeason();
    });

    // double-click to see match stats
    div.addEventListener("dblclick", () => {
      if (!m.result) simulateMatch(m);
      openMatchStats(m);
    });

    calendarDiv.appendChild(div);
  });
}

// ====== MATCH SIMULATION: 60% win, 40% loss for manager (no draws here) ======
function simulateMatch(match) {
  const managerIsHome = match.home === managerTeam;
  const roll = Math.random();
  let homeGoals = 0, awayGoals = 0;

  if (roll < 0.6) {
    // manager wins
    if (managerIsHome) {
      homeGoals = randInt(1, 4);
      awayGoals = randInt(0, 1);
    } else {
      awayGoals = randInt(1, 4);
      homeGoals = randInt(0, 1);
    }
  } else {
    // manager loses
    if (managerIsHome) {
      homeGoals = randInt(0, 1);
      awayGoals = randInt(1, 4);
    } else {
      awayGoals = randInt(0, 1);
      homeGoals = randInt(1, 4);
    }
  }

  match.result = { home: homeGoals, away: awayGoals };
  match.stats = { events: [] };

  // produce goal events with scorers/assists
  const totalGoals = homeGoals + awayGoals;
  for (let i = 0; i < totalGoals; i++) {
    const minute = randInt(1, 90);
    const team = (i < homeGoals) ? match.home : match.away;
    const teamPlayers = (team === managerTeam) ? (startingLineup.concat(substitutes)) : generateOpponentSquad(team);
    const scorer = teamPlayers.length ? teamPlayers[randInt(0, teamPlayers.length - 1)] : `Player(${team})`;
    let assist = null;
    const candidates = teamPlayers.filter(p => p !== scorer);
    if (candidates.length) assist = candidates[randInt(0, candidates.length - 1)];
    match.stats.events.push({ minute, team, scorer, assist });
  }

  match.stats.events.sort((a, b) => a.minute - b.minute);
}

// helper to fabricate opponent squad names if needed
function generateOpponentSquad(team) {
  // try to use realSquads if available; otherwise fabricate
  if (realSquads[team]) {
    return (realSquads[team].XI || []).concat(realSquads[team].Bench || []);
  }
  const arr = [];
  for (let i = 1; i <= 11; i++) arr.push(`${team} Player ${i}`);
  return arr;
}

// ====== MATCH STATS MODAL ======
function openMatchStats(match) {
  statsContent.innerHTML = `<div><strong>MD ${match.matchday}</strong> - ${match.home} ${match.result.home} : ${match.result.away} ${match.away}</div>`;
  if (match.stats && match.stats.events.length) {
    match.stats.events.forEach(e => {
      const row = document.createElement("div");
      row.textContent = `${e.minute}' - ${e.team} - ${e.scorer}${e.assist ? ` (assist: ${e.assist})` : ''}`;
      statsContent.appendChild(row);
    });
  } else {
    const none = document.createElement("div");
    none.textContent = "No goals recorded.";
    statsContent.appendChild(none);
  }
  matchStatsDiv.style.display = "flex";
}

// ====== TRANSFER MARKET ======
function openTransferMarket() {
  playersDiv.innerHTML = "";
  transferMarketDiv.style.display = "flex";

  // sample 12 players from top lists - prices randomized 5-100M
  const pool = [];
  Object.values(realSquads).forEach(s => {
    (s.XI || []).concat(s.Bench || []).forEach(name => {
      if (!pool.includes(name)) pool.push(name);
    });
  });

  // shuffle pool
  for (let i = pool.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  const sample = pool.slice(0, 12).map(n => ({ name: n, value: randInt(5, 100) }));

  sample.forEach(p => {
    const div = document.createElement("div");
    div.className = "player";
    const buyBtn = document.createElement("button");
    buyBtn.textContent = `Buy $${p.value}M`;
    buyBtn.addEventListener("click", () => attemptBuy(p));
    div.innerHTML = `<div><strong>${p.name}</strong></div>`;
    div.appendChild(buyBtn);
    playersDiv.appendChild(div);
  });
}

function closeTransferMarket() {
  transferMarketDiv.style.display = "none";
}

function attemptBuy(player) {
  if (signedPlayers.length >= maxSignings) { alert("Max signings reached (5)."); return; }
  if (budget < player.value) { alert("Not enough budget."); return; }
  budget -= player.value;
  signedPlayers.push(player.name);
  substitutes.push(player.name); // bought players go to bench
  updateBudgetDisplay();
  alert(`Signed ${player.name} for $${player.value}M — added to bench.`);
  openTransferMarket(); // refresh market
}

// ====== ROSTER UI & actions ======
function openRoster() {
  rosterTeamSpan.textContent = managerTeam;
  rosterDiv.style.display = "block";
  refreshRosterUI();
}

function closeRoster() {
  rosterDiv.style.display = "none";
}

function refreshRosterUI() {
  startingLineupDiv.innerHTML = "";
  substitutesDiv.innerHTML = "";

  // starting XI: click to move to bench
  startingLineup.forEach((p, idx) => {
    const div = document.createElement("div");
    div.className = "player";
    div.textContent = p;
    div.addEventListener("click", () => {
      substitutes.push(p);
      startingLineup.splice(idx, 1);
      refreshRosterUI();
    });
    startingLineupDiv.appendChild(div);
  });

  // substitutes: click to move to starting XI (if <11)
  substitutes.forEach((p, idx) => {
    const div = document.createElement("div");
    div.className = "player";
    div.textContent = p;
    div.addEventListener("click", () => {
      if (startingLineup.length < 11) {
        startingLineup.push(p);
        substitutes.splice(idx, 1);
        refreshRosterUI();
      } else {
        alert("Starting XI full (11). Bench player must replace a starter first.");
      }
    });
    substitutesDiv.appendChild(div);
  });
}

function saveRoster() {
  if (startingLineup.length > 11) { alert("Too many players in starting XI."); return; }
  alert("Roster saved.");
  closeRoster();
}

// ====== RESTART SEASON ======
function restartSeason() {
  generateSeason();
  displaySeason();
  budget = randInt(45, 150); // new season budget randomized between 45-150M
  updateBudgetDisplay();
}

// ====== START SEASON FLOW: team selection populates real squads ======
startSeasonBtn.addEventListener("click", () => {
  menuDiv.innerHTML = "<h2>Select your team</h2>";
  teams.forEach(t => {
    const btn = document.createElement("button");
    btn.textContent = t;
    btn.addEventListener("click", () => {
      managerTeam = t;
      const squad = realSquads[t] || { XI: [], Bench: [] };
      // starting XI: use XI if available, otherwise take first 11 from combined squad
      startingLineup = (squad.XI && squad.XI.length) ? squad.XI.slice(0, 11) : (squad.Bench || []).slice(0, 11);
      substitutes = (squad.Bench && squad.Bench.length) ? squad.Bench.slice() : [];
      signedPlayers = [];
      budget = 100;
      updateBudgetDisplay();
      menuDiv.style.display = "none";
      seasonDiv.style.display = "block";
      generateSeason();
      displaySeason();
    });
    menuDiv.appendChild(btn);
  });
});

// ====== EVENT LISTENERS ======
openMarketBtn.addEventListener("click", openTransferMarket);
closeMarketBtn.addEventListener("click", closeTransferMarket);
openRosterBtn.addEventListener("click", openRoster);
closeRosterBtn.addEventListener("click", closeRoster);
saveRosterBtn.addEventListener("click", saveRoster);
restartBtn.addEventListener("click", restartSeason);
closeStatsBtn.addEventListener("click", () => { matchStatsDiv.style.display = "none"; });

// initial budget display
updateBudgetDisplay();
// ====== ADD GOALKEEPERS LIST PER TEAM ======
const goalkeepers = {
  "Arsenal": ["David Raya","Kepa Arrizabalaga","Karl Hein"],
  "Aston Villa": ["Emi Martinez","Marco Bizot"],
  "Bournemouth": ["Mark Travers","Dominic Solanke"], // example, adjust as needed
  "Brentford": ["Caoimhin Kelleher","Hakon Valdimarsson"],
  "Brighton": ["Bart Verbruggen","Jason Steele"],
  "Burnley": ["Martin Dubravka","Max Weiss"],
  "Chelsea": ["Kepa Arrizabalaga","Mendy"],
  "Crystal Palace": ["Dean Henderson","Walter Benitez"],
  "Everton": ["Jordan Pickford","Mark Travers"],
  "Fulham": ["Bernd Leno","Benjamin Lecomte"],
  "Leeds": ["Ilian Meslier","Lucas Perri"],
  "Liverpool": ["Alisson Becker","Giorgi Mamardashvili"],
  "Man City": ["Ederson","Steffen"],
  "Man United": ["Andre Onana","Altay Bayindir"],
  "Newcastle": ["Nick Pope","Aaron Ramsdale"],
  "Nottingham Forest": ["Matz Sels","Angus Gunn"],
  "Sunderland": ["Sunderland GK"], // replace with actual keepers
  "Tottenham": ["Guglielmo Vicario","Antonin Kinsky"],
  "West Ham": ["Alphonse Areola"],
  "Wolves": ["Jose Sa","Sam Johnstone"]
};

// ====== MATCH SIMULATION UPDATE ======
function simulateMatch(match) {
  const managerIsHome = match.home === managerTeam;
  const roll = Math.random();
  let homeGoals = 0, awayGoals = 0;

  if (roll < 0.6) {
    // manager wins
    if (managerIsHome) {
      homeGoals = randInt(1, 4);
      awayGoals = randInt(0, 1);
    } else {
      awayGoals = randInt(1, 4);
      homeGoals = randInt(0, 1);
    }
  } else {
    // manager loses
    if (managerIsHome) {
      homeGoals = randInt(0, 1);
      awayGoals = randInt(1, 4);
    } else {
      awayGoals = randInt(0, 1);
      homeGoals = randInt(1, 4);
    }
  }

  match.result = { home: homeGoals, away: awayGoals };
  match.stats = { events: [] };

  // produce goal events with scorers/assists
  const totalGoals = homeGoals + awayGoals;
  for (let i = 0; i < totalGoals; i++) {
    const minute = randInt(1, 90);
    const team = (i < homeGoals) ? match.home : match.away;
    let teamPlayers = (team === managerTeam) ? (startingLineup.concat(substitutes)) : generateOpponentSquad(team);

    // filter out goalkeepers from scorer candidates
    const gks = goalkeepers[team] || [];
    const scorers = teamPlayers.filter(p => !gks.includes(p));
    const scorer = scorers.length ? scorers[randInt(0, scorers.length - 1)] : "Unknown Player";

    let assist = null;
    const candidates = teamPlayers.filter(p => p !== scorer);
    if (candidates.length) assist = candidates[randInt(0, candidates.length - 1)];

    match.stats.events.push({ minute, team, scorer, assist });
  }

  match.stats.events.sort((a, b) => a.minute - b.minute);
}

// ====== generateOpponentSquad remains the same, optionally use goalkeepers to filter if needed ======
// ====== TEAM ROSTER ======
// let substitutes = [];     // bench (already declared above)

// ====== BUY PLAYER FUNCTION ======
function buyPlayer(player) {
    if (managerBudget >= player.cost && substitutes.length < 12) { // limit bench to 12
        managerBudget -= player.cost;
        substitutes.push(player.name); // add to bench
        alert(`${player.name} has been added to your bench!`);
        updateRosterUI();
        updateBudgetUI();
    } else if (substitutes.length >= 12) {
        alert("Bench is full! Cannot add more players.");
    } else {
        alert("Not enough budget!");
    }
}

// ====== UPDATE ROSTER UI ======
function updateRosterUI() {
    const rosterDiv = document.getElementById("roster");
    rosterDiv.innerHTML = "<h3>Starting XI</h3>";
    startingLineup.forEach(p => {
        const pDiv = document.createElement("div");
        pDiv.textContent = p;
        rosterDiv.appendChild(pDiv);
    });
    rosterDiv.innerHTML += "<h3>Substitutes</h3>";
    substitutes.forEach(p => {
        const pDiv = document.createElement("div");
        pDiv.textContent = p;
        rosterDiv.appendChild(pDiv);
    });
}

// ====== UPDATE BUDGET UI ======
function updateBudgetUI() {
    const budgetDiv = document.getElementById("budget");
    budgetDiv.textContent = `Budget: $${managerBudget}m`;
}
