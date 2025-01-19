
export const gameState = {
  scores: [
    { player: 'Aditi', score: 10, rank: 1 },
    { player: 'Bob', score: 15, rank: 2 },
    { player: 'Charlie', score: 8, rank: 3 },
  ],
  roomCode: '',
  players: ['Aditi', 'Bob', 'Charlie'],
  currentWord: 'dob',
  isWordGiver: true,
  currentRound: 1,
  timeLeft: 60,
  guesses: [],
  hints: [],
  questions: [],
  currentTurn: 'Aditi'
};

export const gameCards = [
  { cardName: 'Apple', tabooWords: new Set(['Fruit', 'Red', 'Tree', 'Juice', 'Pie']) },
  { cardName: 'Football', tabooWords: new Set(['Soccer', 'Goal', 'Team', 'Ball', 'Kick']) },
  { cardName: 'Ocean', tabooWords: new Set(['Sea', 'Water', 'Waves', 'Beach', 'Fish']) },
  { cardName: 'Pencil', tabooWords: new Set(['Write', 'Eraser', 'Paper', 'Sharpen', 'Lead']) },
  { cardName: 'Sun', tabooWords: new Set(['Day', 'Light', 'Heat', 'Sky', 'Bright']) },
  { cardName: 'Pizza', tabooWords: new Set(['Cheese', 'Crust', 'Toppings', 'Slice', 'Oven']) },
  { cardName: 'Dog', tabooWords: new Set(['Pet', 'Bark', 'Tail', 'Fetch', 'Puppy']) },
  { cardName: 'Doctor', tabooWords: new Set(['Hospital', 'Medicine', 'Patient', 'Nurse', 'Health']) },
  { cardName: 'Bicycle', tabooWords: new Set(['Wheels', 'Pedal', 'Ride', 'Helmet', 'Chain']) },
  { cardName: 'Rainbow', tabooWords: new Set(['Colors', 'Sky', 'Rain', 'Arc', 'Weather']) },
  { cardName: 'Computer', tabooWords: new Set(['Keyboard', 'Mouse', 'Screen', 'Laptop', 'Internet']) },
  { cardName: 'Music', tabooWords: new Set(['Song', 'Melody', 'Instrument', 'Dance', 'Rhythm']) }
];
