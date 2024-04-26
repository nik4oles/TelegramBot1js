const lotteryTicketCost = 100;
const wizardsInfo = {}
const {buyTicketButton} = require('./options');
const fs = require('fs');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const cardInfo = async(bot, chatId) =>{
    getWizardInfo(chatId)
  
    if (!(chatId in wizardsInfo)) {
        wizardsInfo[chatId] = getWizardInfo(chatId); 
    } 
    const wizardInfo = wizardsInfo[chatId]
  

    if (wizardInfo) {
    const message = `
        Ваше имя: ${wizardInfo.name}
        Ваша сила: ${wizardInfo.power}
        Ваш уровень опасности: ${wizardInfo.dangerLevel}
        Ваши любимые цветы: ${wizardInfo.flower}
        Ваш адрес фактического проживания: ${wizardInfo.area}
        Ваш тайный воздыхатель: ${wizardInfo.admirerName}
        Ваш кошелек: ${wizardInfo.wallet}💰
      `;
      
    await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_004.webp?v=1713592083')

    bot.sendMessage(chatId, message, buyTicketButton); 

    } else {
        bot.sendMessage(chatId, 'Ошибка получения информации.');
    }
}



function playLottery(wizardInfo) { 
  if (wizardInfo.name === 'Гарри Поттер') {
        return 10000000; 
  }
  let randomNum = Math.random(); 
  let accumulatedProbability = 0;

  for (const prize of lotteryPrizes) {
      accumulatedProbability += prize.probability; 
      if (randomNum < accumulatedProbability) {
          return prize.amount; 
      }
  }

  return 0;
}

const lotteryPrizes = [
  { amount: 50, probability: 0.7 },  
  { amount: 100, probability: 0.25 }, 
  { amount: 10000000, probability: 0.05 } 
];

function getWizardInfo() {
    const wizardsFile = './info.txt'; 

    try {
        const data = fs.readFileSync(wizardsFile, 'utf8');
        const lines = data.split('\n').filter(line => line.trim() !== '');
        const randomLine = lines[getRandomInt(lines.length)];
        const [name, power, dangerLevel, flower, area] = randomLine.split(',');
       

        let admirerLine;
        do {
            admirerLine = lines[getRandomInt(lines.length)];
        } while (admirerLine === randomLine);
        const admirerName = admirerLine.split(',')[0];

        return {
            name,
            power,
            dangerLevel,
            flower,
            area,
            admirerName,
            wallet: getRandomInt(10000) 
        };
    } catch (err) {
        console.error('Ошибка чтения файла волшебников:', err);
        return null;
    }
}

const lottery = async (bot, query) => {
    const chatId = query.message.chat.id;
    const wizardInfo = wizardsInfo[chatId]; 
            
    if (wizardInfo.wallet >= lotteryTicketCost) {
        wizardInfo.wallet -= lotteryTicketCost;
        const prize = playLottery(wizardInfo);
        wizardInfo.wallet += prize; 

        if (prize >= 100) {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_024.webp?v=1713592083')
        } else {
            await bot.sendSticker(chatId, 'https://chpic.su/_data/stickers/b/Boo_Nyasticks/Boo_Nyasticks_025.webp?v=1713592083')
        }
                    
        const message = `
            Вы купили лотерейный билет! 
            Ваш выигрыш: ${prize}💰
            Ваш новый баланс: ${wizardInfo.wallet}💰
        `;
                    
        bot.sendMessage(chatId, message, buyTicketButton)
        } else {
        bot.sendMessage(chatId, 'У вас недостаточно средств для покупки билета.');
    }
}
module.exports = {cardInfo, lottery}