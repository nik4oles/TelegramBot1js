const TeleBotApi = require('node-telegram-bot-api')

const {menu,gameSelections, optionsPredictions} = require('./options');
const {startGame1} = require('./gamesFir');
const {startGame2} = require('./gameSecond');
const {cardInfo, lottery} = require('./info');
const fs = require('fs');

const token = '7108363333:AAHA-lJeoVuR1lLC975UYHDjp2N1m5PVl9Q'

const bot = new TeleBotApi(token, {polling:true})

const start = async () => {
    bot.setMyCommands([
        {command: '/start', description: 'start'},
        {command: '/info', description: 'info'},
        {command: '/game', description: 'game'},
    ])

    bot.on('message', async msg => {
        const text = msg.text;
        const chatId = msg.chat.id;
        console.log(msg)
        if (text === '/start') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_022.webp?v=1713592083')
            await bot.sendMessage(chatId, 'Меню', menu)
        }       
    });

    bot.on('callback_query', async msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if (data === '/game') {
            bot.sendMessage(chatId, 'Выберите игру', gameSelections);
        } else if (data === '/info') {
            cardInfo(bot, chatId)
        } else if (data === '/prediction') {
            bot.sendMessage(chatId, 'Что вас интересует?', optionsPredictions)
        } else if (data.startsWith('prediction_')){
            const chosenFile = data.split('_')[1];
            const prediction = getPrediction(`./${chosenFile}.txt`);
            bot.sendMessage(chatId, prediction, optionsPredictions);
        } else if (data === '/game1') {
            startGame1(bot, chatId, data);
        } else if (data === '/game2') {
            startGame2(bot, chatId);
        } else if (data === '/again') {
            startGame1(bot, chatId);
        } else if (data === '/retu') {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_022.webp?v=1713592083')
            await bot.sendMessage(chatId, 'Меню', menu);
        }
    });
}


const getPrediction = (fileName) => {
    const predictions = fs.readFileSync(fileName, 'utf-8').split('\n');
    const randomIndex = Math.floor(Math.random() * predictions.length);
    return predictions[randomIndex].trim();
};

bot.onText(/\/info/, (msg) => {
    const chatId = msg.chat.id;
    cardInfo(bot, chatId)
       
});

bot.on('callback_query', async (query) => {
    if (query.data === 'buy_lottery_ticket') {
        lottery(bot, query)
    }
});

start()



