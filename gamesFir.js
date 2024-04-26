const chats = {}
const attempts = {}
const {gameOptions,againOptions} = require('./options');

const startGame1 = async (bot,chatId, data) => {
    attempts[chatId] = 3
    const fullHeart = '❤️';
    const brokenHeart = '💔';

    await bot.sendMessage(chatId, `Угадай цифру от 0 до 9`)
    await bot.sendMessage(chatId, fullHeart.repeat(3))
    
    
    const randomNum = Math.floor(Math.random()*10)
    chats[chatId] = randomNum

    while (attempts[chatId] > 0){

        

        const waitForNumber = new Promise((resolve) => {
            bot.on('callback_query', async (msg) => {
                const data = msg.data;
                if (data === '/again' ||  (data >= 0 && data <= 9)) { 
                    resolve(data); 
                }
            });
        });

        bot.sendMessage(chatId, `Выбери цифру`, gameOptions)
        const selectedNumber = await waitForNumber;


        if (Number(selectedNumber) == chats[chatId]) {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_014.webp?v=1713592083')
            await bot.sendMessage(chatId, `🎉 Ты победил! Число было ${chats[chatId]} \n ${fullHeart}${fullHeart}${fullHeart}`, againOptions);
            delete chats[chatId];
            return
        } else {
            attempts[chatId] -= 1
            const remainingHearts = fullHeart.repeat(attempts[chatId]); 
            const brokenHearts = brokenHeart.repeat(3 - attempts[chatId]); 
            await bot.sendMessage(chatId, `${remainingHearts}${brokenHearts}` )
            if (attempts[chatId] === 0) {
                                await bot.sendSticker(chatId,'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_009.webp?v=1713592083')

                await bot.sendMessage(chatId, `Вы проиграли. Число было ${chats[chatId]}`, againOptions)
                delete chats[chatId];
                
            } else {
                await bot.sendMessage(chatId, `😔 Попробуй еще\n `); 
            }

        }
    }
       
}

module.exports = {startGame1}
