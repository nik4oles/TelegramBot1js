const {menu, againOptions2,gameSelections, optionsPredictions, buyTicketButton } = require('./options');
const games = {}; // хранилище для состояний игр
const fs = require('fs');
const loadWords = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./dictionary.txt', 'utf-8', (err, data) => {
            if (err) {
                reject(err)
            } else {
                const words = data.split('\n').map(line => line.trim()).filter(line => line != '')
                resolve(words)
            }
        });
    })
}

const startGame2 = async (bot, chatId) => {
    if (games[chatId]) { 
        bot.sendMessage(chatId, "Игра уже запущена. Завершите текущую игру, чтобы начать новую.");
        return;
    }
    const fullHeart = '❤️';

    const words = await loadWords() //загружаем строки
    const randomLine = words[Math.floor(Math.random() * words.length)] //выбираем строку
    const [wordToGuess, definition] = randomLine.split('-');
    const wordCount = wordToGuess.split(' ').length;
    hiddenWord = wordToGuess.trim().replace(/[\w\d]/g, '*'); //заменяем символы на _
    let lives = 6; //количество жизней
    const usedLetters = new Set(); //использованные буквы



    
    const gameMessage = `Угадай слово: ${hiddenWord}\n
    Осталось жизней: ${fullHeart.repeat(lives)}`;


    

    bot.sendMessage(chatId, `Определение: ${definition}`);
    bot.sendMessage(chatId, gameMessage)

    games[chatId] = { 
        wordToGuess,
        hiddenWord,
        lives,
        usedLetters,
    };

    bot.on('message', async (msg) => {
        const chatId = msg.chat.id;
        const game = games[chatId]; 

        if (!game) {
            return;
        }

        if (msg.chat.id === chatId) {
            
            const letter = msg.text.toLowerCase()


            if (letter.length !== 1) {
                bot.sendMessage(chatId, 'Пожалуйста, введите одну букву.');
                bot.removeListener('message', msg.listener);
                return;
              }
            if (game.usedLetters.has(letter)) {
                bot.sendMessage(chatId,  'Эта буква уже использовалась.')
                return
            }
            game.usedLetters.add(letter)
            if(game.wordToGuess.toLowerCase().includes(letter)){
                game.hiddenWord = game.wordToGuess.split('').map(letter => {
                    return game.usedLetters.has(letter.toLowerCase()) ? letter : (letter === ' ' ? ' ' : '*'); 
                }).join('');
                
            

                if (game.hiddenWord === game.wordToGuess) {
                    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_038.webp?v=1713592083')
                    bot.sendMessage(chatId, `Ура! Вы победили! \nслово: ${game.wordToGuess}`, againOptions2)
                    delete games[chatId];
                    return
                }
            } else {
                game.lives--;
                
                if (game.lives===0){
                    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_002.webp?v=1713592083')
                    await bot.sendMessage(chatId, `Вы проиграли. Слово было: ${game.wordToGuess}`, againOptions2)
                    bot.removeListener('message', msg.listener);
                    delete games[chatId];
                    return;

                } 
            }
            bot.sendMessage(chatId, game.hiddenWord)
            updatedMessage = `Осталось жизней: ${fullHeart.repeat(game.lives)}`;
            
            bot.sendMessage(chatId, updatedMessage);
            
        }
        
    })

}

module.exports = {startGame2}