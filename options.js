


module.exports = {
    gameOptions: {
       reply_markup: JSON.stringify({
           inline_keyboard: [
               [{text: '1', callback_data: '1'}, {text: '2', callback_data: '2'}, {text: '3', callback_data: '3'}],
               [{text: '4', callback_data: '4'}, {text: '5', callback_data: '5'}, {text: '6', callback_data: '6'}],
               [{text: '7', callback_data: '7'}, {text: '8', callback_data: '8'}, {text: '9', callback_data: '9'}],
               [{text: '0', callback_data: '0'}],
           ]
       })
   },

   againOptions: {
       reply_markup: JSON.stringify({
           inline_keyboard: [
               [{text: 'Играть еще раз', callback_data: '/again'}],
               [{text: 'Покинуть игру', callback_data: '/retu'}],
           ]
       })
   },

   menu: {
    reply_markup: JSON.stringify({
        inline_keyboard: [
            [{text: 'Игры', callback_data: '/game'}],
            [{text: 'Информация', callback_data: '/info'}],
            [{text: 'Шар предсказаний', callback_data: '/prediction'}],
        ]
    })
    }   ,

    gameSelections: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Угадай цифру', callback_data: '/game1'}],
                [{text: 'Виселица', callback_data: '/game2'}],
                [{text: 'Меню', callback_data: '/retu'}],
            ]
        })
   },
    againOptions : {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Играть еще раз', callback_data: '/again'}],
                [{text: 'Покинуть игру', callback_data: '/retu'}],
            ]
        })
    },
    againOptions2: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: 'Играть еще раз', callback_data:'/game2'}],
                [{text: 'Покинуть игру', callback_data: '/retu'}],
            ]
        })
    },
    optionsPredictions: {
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Шар предсказаний', callback_data: 'prediction_p1' },
                    { text: 'Печенье', callback_data: 'prediction_p2' }
                ],
                [{text: 'Меню', callback_data: '/retu'}],
            ]
        }
    },
    buyTicketButton: {
        reply_markup: {
            inline_keyboard: [
                [{ text: 'Купить лотерейный билет 100$ 🎟️', callback_data: 'buy_lottery_ticket' }],
                [{text: 'Меню', callback_data: '/retu'}],
            ]
        }
    }

}




