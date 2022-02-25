import prompts from "prompts";
import chalk from 'chalk';
import gradient from 'gradient-string';
import figlet from 'figlet';

console.clear();
const wait = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
export const scores = {
  user: 0,
  me: 0,
};

let cachedName: string;

export async function getName() {
  const response = await prompts({
    type: "text",
    name: "name",
    message: "What is your name?",
  });
  return response.name;
}

export async function getUserOption() {
  const response = await prompts({
    type: "select",
    name: "option",
    message: "Select an option",
    choices: [
      {
        title: "Rock",
        description: "Select rock as your choice",
        value: "rock",
      },
      {
        title: "Paper",
        description: "Select paper as your choice",
        value: "paper",
      },
      {
        title: "Scissors",
        description: "Select scissors as your choice",
        value: "scissors",
      },
    ],
  });
  return response.option;
}

export function getMyOption() {
  const options = ["rock", "paper", "scissors"];
  const choice = options[Math.floor(Math.random() * options.length)];
  return choice;
}

export async function getConfirmation() {
  const response = await prompts({
    type: "confirm",
    name: "confirm",
    message: "Do you want to play again?",
  });
  return response.confirm;
}

export async function start(name: string) {
  cachedName = name;
  const userOption = await getUserOption();
  const myOption = getMyOption();
  let scores = await handleWin(userOption, myOption);
  const confirmation = await getConfirmation();
  if (!confirmation) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    console.clear();
    if (scores.me > scores.user) {
        const data = figlet.textSync("You Lose!")
        console.log(gradient.pastel.multiline(data) + "\n");
        console.log(chalk.redBright.bold(`${name}, you lost better luck next time! 😢`));
        console.log(gradient.cristal(`Your score: ${scores.user}, my score ${scores.me}`));
    } else if (scores.me < scores.user) {
        const data = figlet.textSync("You Win!")
        console.log(gradient.pastel.multiline(data) + "\n");
        console.log(chalk.greenBright.bold(`${name}, you win! 🎉`));
        console.log(gradient.cristal(`Your score: ${scores.user}, my score ${scores.me}`));
    } else {
        const data = figlet.textSync("Draw!")
        console.log(gradient.pastel.multiline(data) + "\n");
        console.log(chalk.magentaBright.bold("It was a tie 🙂"));
        console.log(gradient.cristal(`Your score: ${scores.user}, my score ${scores.me}`));
    }
    process.exit(0);
  }
  await replay();
}

async function replay() {
  const name = cachedName ? cachedName : await getName();
  await start(name);
}

export async function handleWin(userChoice: string, myChoice: string) {
  console.log(chalk.bold(`You choose ${userChoice}, I choose ${myChoice}`));
  await wait();
  switch (userChoice) {
    case myChoice:
      console.log(chalk.magentaBright("It's a tie!"));
      scores.user++;
      scores.me++;
      break;
    case "rock":
      if (myChoice === "paper") {
        console.log(chalk.redBright("✖ You lose! Paper beats Rock."));
        scores.me++;
      } else {
        console.log(chalk.greenBright("✔ You win! Rock beats Scissors."));
        scores.user++;
      }
      break;
    case "paper":
      if (myChoice === "scissors") {
        console.log(chalk.redBright("✖ You lose! Scissors beats Paper."));
        scores.me++;
      } else {
        console.log(chalk.greenBright("✔ You win! Paper beats Rock."));
        scores.user++;
      }
      break;
    case "scissors":
      if (myChoice === "rock") {
        console.log(chalk.redBright("✖ You lose! Rock beats Scissors."));
        scores.me++;
      } else {
        console.log(chalk.greenBright("✔ You win! Scissors beats Paper."));
        scores.user++;
      }
      break;
  }
  return scores
}
