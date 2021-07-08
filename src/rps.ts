import readline from 'readline'
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
})

let botscore = 0
let userscore = 0
let scores = {}
let botcscore = 'Your score: '
let usercscore = 'My score: '
const botchoices = ['Rock', 'Paper', 'Scissors']

if (scores[botcscore] === undefined) {
	scores[botcscore] = 0
}
if (scores[usercscore] === undefined) {
	scores[usercscore] = 0
}

function start() {
		rl.question('Enter your choice: ', (input) => {
			if (input.toLowerCase() === 'rock') {
				const botchoice = botchoices[Math.floor(Math.random() * botchoices.length)];
				if (botchoice === 'Paper') {
					console.log(`You choose ${input} and I chose ${botchoice}\nI win!`)
					scores[botcscore] = botscore += 1
					console.log(`Your score is ${scores[usercscore]}\nMy score is ${scores[botcscore]}`)
				}
				else if (botchoice === 'Scissors') {
					console.log(`You choose ${input} and I chose ${botchoice}\nYou win!`)
					scores[usercscore] = userscore += 1
					console.log(`Your score is ${scores[usercscore]}\nMy score is ${scores[botcscore]}`)
				}
				else {
					console.log(`You choose ${input} and I chose ${botchoice}\nNo one wins!`)
				}
			}
			else if (input.toLowerCase() === 'paper') {
				const botchoice = botchoices[Math.floor(Math.random() * botchoices.length)];
				if (botchoice === 'Scissors') {
					console.log(`You choose ${input} and I chose ${botchoice}\nI win!`)
					scores[botcscore] = botscore += 1
					console.log(`Your score is ${scores[usercscore]}\nMy score is ${scores[botcscore]}`)
				}
				else if (botchoice === 'Rock') {
					console.log(`You choose ${input} and I chose ${botchoice}\nYou win!`)
					scores[usercscore] = userscore += 1
					console.log(`Your score is ${scores[usercscore]}\nMy score is ${scores[botcscore]}`)
				}
				else {
					console.log(`You choose ${input} and I chose ${botchoice}\nNo one wins!`)
				}
			}
			else if (input.toLowerCase() === 'scissors') {
				const botchoice = botchoices[Math.floor(Math.random() * botchoices.length)];
				if (botchoice === 'Rock') {
					console.log(`You choose ${input} and I chose ${botchoice}\nI win!`)
					scores[botcscore] = botscore += 1
					console.log(`Your score is ${scores[usercscore]}\nMy score is ${scores[botcscore]}`)
				}
				else if (botchoice === 'Paper') {
					console.log(`You choose ${input} and I chose ${botchoice}\nYou win!`)
					scores[usercscore] = userscore += 1
					console.log(`Your score is ${scores[usercscore]}\nMy score is ${scores[botcscore]}`)
				}
				else {
					console.log(`You choose ${input} and I chose ${botchoice}\nNo one wins!`)
				}
			}
			else if (input === 'scores') {
				console.log(`Your score is ${scores[usercscore]}\nMy score is ${scores[botcscore]}`)
			}
			else {
				console.log('Not a valid argument!')
			}
			replay()
	})
}
function replay() {
	rl.question('Do you want to play again?\n', (answer) => {
		if (answer.toLowerCase() === 'yes' || answer.toLowerCase() === 'y') {
			start()
		}
		if (answer.toLowerCase() === 'no' || answer.toLowerCase() === 'n') {
			rl.close()
		}
	})
}
start()
rl.on('close', () => {
	console.log('Alright see you later homie!')
	scores[usercscore] = 0
	scores[botcscore] = 0
})