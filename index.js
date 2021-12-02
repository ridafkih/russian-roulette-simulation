const SIMULATIONS = 1e6;

const CHAMBERS_COUNT = 6;
const BULLETS_COUNT = 1;

if (BULLETS_COUNT > CHAMBERS_COUNT)
  throw Error("There are not enough chambers to account for the bullets.");

const loadAndSpin = (array) => {
  let clone = [...array];
  for (let i = clone.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
};

const generateRevolver = () => {
  const chambers = {
    empty: [...Array(CHAMBERS_COUNT - BULLETS_COUNT)].map(() => false),
    filled: [...Array(BULLETS_COUNT)].map(() => true),
  };

  return loadAndSpin([...chambers.empty, ...chambers.filled]);
};

console.table({
  numberOfBullets: BULLETS_COUNT,
  numberOfChambers: CHAMBERS_COUNT,
});

const games = [];
for (let i = 0; i < SIMULATIONS; i++) {
  const revolver = generateRevolver();
  const firstBulletPosition = revolver.indexOf(true);
  games.push({ winner: firstBulletPosition % 2 === 0 ? 1 : 2 });
}

const gamesPlayed = games.length;
const playerOneWins = games.filter(({ winner }) => winner === 1).length;
const playerTwoWins = games.length - playerOneWins;

const estimatedOdds = `${Math.round(
  (playerOneWins / gamesPlayed) * 100
)} / ${Math.round((playerTwoWins / gamesPlayed) * 100)}`;

console.table({ gamesPlayed, playerOneWins, playerTwoWins, estimatedOdds });
