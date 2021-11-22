# Russian Roulette Simulation
### A simple simulation of the game "Russian Roulette," in order to prove that the odds are 50/50 if the game is played between two players. 

___ 

The program runs 1,000,000 instances of the game, and allows a variable amount of chambers, and bullets. Currently set to 6 chambers, and 1 bullet. 
Note that this fact is irrelevant in the context of the odds of which player ones as long as the `BULLETS_COUNT` variable is `> 1`. 

The program uses the Fisher-Yates algorithm to randomize an array representing the chambers, `false` for empty, `true` for loaded. 

The index of the bullet in the chamber determines the winner, if it is even, player one wins, odds, player two wins. 

An array after the fact may look something like... `[false, false, true, false, false, false]`, the index of the bullet in the chamber in this instance is `2`, representing the third position. 

For example, if the bullet is determined to be in the first chamber, index `0`, player one will be the winner. 

Furthermore, if the bullet is determined to be in the fourth chamber, index `3`, player two will be the winner. 

The games are measured, and displayed in the console. 

## Round One
### 1,000,000 rounds are played between two virtual players.

| (index) | Values |
| --- | --- |
| numberOfBullets | 1 |
| numberOfChambers | 6 |

| (index ) | (Values ) |
| --- | --- |
| gamesPlayed | 1000000 |
| playerOneWins | 499763 |
| playerTwoWins | 500237 |
| estimatedOdds | '50 / 50' |

In this simulation, player one won `499,763` times, while player two won `500,327` times. 

Thanks to the law of averages, we can confirm the odds are 50/50, however to be certain we can run another simulation running 10,000,000 games. 

## Round Two
### 10,000,000 rounds are played between two virtual players.

| (index) | Values |
| --- | --- |
| numberOfBullets | 1 |
| numberOfChambers | 6 |

| (index ) | (Values ) |
| --- | --- |
| gamesPlayed | 10000000 |
| playerOneWins | 5001740 |
| playerTwoWins | 4998260 |
| estimatedOdds | '50 / 50' |

This time, player one was in the lead with slightly more wins than player two, but in the end the odds were the same. Coming out to 50/50. 

The script can be found here. It is default to `1e6` (1,000,000) games, though that value can be changed. 

```js
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
)} / ${Math.round((playerOneWins / gamesPlayed) * 100)}`;

console.table({ gamesPlayed, playerOneWins, playerTwoWins, estimatedOdds });
```
