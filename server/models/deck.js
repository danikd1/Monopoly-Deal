const cards = [
    { id: 1, type: 'property', name: 'Водопровод', value: 2, image: '/images/Vodoprovod.png' },
    { id: 2, type: 'property', name: 'Электростанция', value: 2, image: '/images/2.png' },
    { id: 3, type: 'property', name: 'Нагатинская Ул.', value: 1, image: '/images/3.png' },
    { id: 4, type: 'property', name: 'Житная Ул.', value: 1, image: '/images/4.png' },
    { id: 5, type: 'property', name: 'Варшавское шоссе', value: 1, image: '/images/5.png' },
    { id: 6, type: 'property', name: 'Первая Парковая Ул.', value: 1, image: '/images/6.png' },
    { id: 7, type: 'property', name: 'Ул. Огарева', value: 2, image: '/images/7.png' },
    { id: 8, type: 'property', name: 'Курская Железная Дорога', value: 2, image: '/images/8.png' },
    { id: 9, type: 'property', name: 'Казанская Железная Дорога', value: 2, image: '/images/9.png' },
    { id: 10, type: 'property', name: 'Ленинградская Железная Дорога', value: 2, image: '/images/10.png' },
    { id: 11, type: 'property', name: 'Рижская Железная Дорога', value: 2, image: '/images/11.png' },
    { id: 12, type: 'property', name: 'Кутузовский проспект', value: 4, image: '/images/12.png' },
    { id: 13, type: 'property', name: 'Гоголевский бульвар', value: 4, image: '/images/13.png' },
    { id: 14, type: 'property', name: 'Ул. Щусева', value: 4, image: '/images/14.png' },
    { id: 15, type: 'property', name: 'Рублевское шоссе', value: 2, image: '/images/15.png' },
    { id: 16, type: 'property', name: 'Рязанский проспект', value: 2, image: '/images/16.png' },
    { id: 17, type: 'property', name: 'Ул. Вавилова', value: 2, image: '/images/17.png' },
    { id: 18, type: 'property', name: 'Ул. Чайковского', value: 3, image: '/images/18.png' },
    { id: 19, type: 'property', name: 'Ул. Грузинский Вал', value: 3, image: '/images/19.png' },
    { id: 20, type: 'property', name: 'Смоленская площадь', value: 3, image: '/images/20.png' },
    { id: 21, type: 'property', name: 'Площадь маяковского', value: 3, image: '/images/21.png' },
    { id: 22, type: 'property', name: 'Пушкинская улица', value: 3, image: '/images/22.png' },
    { id: 23, type: 'property', name: 'Ул. Тверская', value: 3, image: '/images/23.png' },
    { id: 24, type: 'property', name: 'Ростовская Наб.', value: 2, image: '/images/24.png' },
    { id: 25, type: 'property', name: 'Ул. Сретенка', value: 2, image: '/images/25.png' },
    { id: 26, type: 'property', name: 'Ул. Полянка', value: 2, image: '/images/26.png' },
    { id: 27, type: 'property', name: 'Малая Бронная', value: 4, image: '/images/27.png' },
    { id: 28, type: 'property', name: 'Ул. Арбат', value: 4, image: '/images/28.png' },

    { id: 29, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 30, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 31, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 32, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 33, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 34, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 35, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 36, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 37, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 38, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 39, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 40, type: 'money', name: 'Three', value: 3, image: '/images/40.png' },
    { id: 41, type: 'money', name: 'Three', value: 3, image: '/images/40.png' },
    { id: 42, type: 'money', name: 'Three', value: 3, image: '/images/40.png' },
    { id: 43, type: 'money', name: 'Four', value: 4, image: '/images/43.png' },
    { id: 44, type: 'money', name: 'Four', value: 4, image: '/images/43.png' },
    { id: 45, type: 'money', name: 'Four', value: 4, image: '/images/43.png' },
    { id: 46, type: 'money', name: 'Five', value: 5, image: '/images/46.png' },
    { id: 47, type: 'money', name: 'Five', value: 5, image: '/images/46.png' },
    { id: 48, type: 'money', name: 'Ten', value: 10, image: '/images/48.png' },

    { id: 49, type: 'action', name: 'Rent Black&LightGreen', value: 1, image: '/images/49.png' },
    { id: 50, type: 'action', name: 'Rent Black&LightGreen', value: 1, image: '/images/49.png' },

    { id: 51, type: 'action', name: 'Rent Blue&Green', value: 1, image: '/images/51.png' },
    { id: 52, type: 'action', name: 'Rent Blue&Green', value: 1, image: '/images/51.png' },

    { id: 53, type: 'action', name: 'Rent Orange&Purple', value: 1, image: '/images/53.png' },
    { id: 54, type: 'action', name: 'Rent Orange&Purple', value: 1, image: '/images/53.png' },

    { id: 55, type: 'action', name: 'Rent Yellow&Red', value: 1, image: '/images/55.png' },
    { id: 56, type: 'action', name: 'Rent Yellow&Red', value: 1, image: '/images/55.png' },

    { id: 57, type: 'action', name: 'Rent Brown&Azure', value: 1, image: '/images/57.png' },
    { id: 58, type: 'action', name: 'Rent Brown&Azure', value: 1, image: '/images/57.png' },
];

module.exports = { cards, shuffle };
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
