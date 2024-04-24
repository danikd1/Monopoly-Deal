const cards = [
    { id: 1, type: 'property', name: 'Водопровод', color: 'mint', value: 2, image: '/images/Vodoprovod.png', setSize: 2 },
    { id: 2, type: 'property', name: 'Электростанция', color: 'mint', value: 2, image: '/images/2.png', setSize: 2 },
    { id: 3, type: 'property', name: 'Нагатинская Ул.', color: 'brown', value: 1, image: '/images/3.png', setSize: 2 },
    { id: 4, type: 'property', name: 'Житная Ул.', color: 'brown', value: 1, image: '/images/4.png', setSize: 2 },
    { id: 5, type: 'property', name: 'Варшавское шоссе',color: 'azure', value: 1, image: '/images/5.png', setSize: 3 },
    { id: 6, type: 'property', name: 'Первая Парковая Ул.',color: 'azure', value: 1, image: '/images/6.png', setSize: 3 },
    { id: 7, type: 'property', name: 'Ул. Огарева', color: 'azure',value: 2, image: '/images/7.png', setSize: 3 },
    { id: 8, type: 'property', name: 'Курская Железная Дорога',color: 'black', value: 2, image: '/images/8.png', setSize: 4 },
    { id: 9, type: 'property', name: 'Казанская Железная Дорога',color: 'black', value: 2, image: '/images/9.png', setSize: 4 },
    { id: 10, type: 'property', name: 'Ленинградская Железная Дорога',color: 'black', value: 2, image: '/images/10.png', setSize: 4 },
    { id: 11, type: 'property', name: 'Рижская Железная Дорога',color: 'black', value: 2, image: '/images/11.png', setSize: 4 },
    { id: 12, type: 'property', name: 'Кутузовский проспект',color: 'green', value: 4, image: '/images/12.png', setSize: 3 },
    { id: 13, type: 'property', name: 'Гоголевский бульвар',color: 'green', value: 4, image: '/images/13.png', setSize: 3 },
    { id: 14, type: 'property', name: 'Ул. Щусева',color: 'green', value: 4, image: '/images/14.png', setSize: 3 },
    /*{ id: 15, type: 'property', name: 'Рублевское шоссе',color: 'orange', value: 2, image: '/images/15.png', setSize: 3 },
    { id: 16, type: 'property', name: 'Рязанский проспект',color: 'orange', value: 2, image: '/images/16.png', setSize: 3 },
    { id: 17, type: 'property', name: 'Ул. Вавилова', color: 'orange',value: 2, image: '/images/17.png', setSize: 3 },
    { id: 18, type: 'property', name: 'Ул. Чайковского', color: 'yellow',value: 3, image: '/images/18.png', setSize: 3 },
    { id: 19, type: 'property', name: 'Ул. Грузинский Вал',color: 'yellow', value: 3, image: '/images/19.png', setSize: 3 },
    { id: 20, type: 'property', name: 'Смоленская площадь', color: 'yellow',value: 3, image: '/images/20.png', setSize: 3 },
    { id: 21, type: 'property', name: 'Площадь маяковского',color: 'red', value: 3, image: '/images/21.png', setSize: 3 },
    { id: 22, type: 'property', name: 'Пушкинская улица',color: 'red', value: 3, image: '/images/22.png', setSize: 3 },
    { id: 23, type: 'property', name: 'Ул. Тверская',color: 'red', value: 3, image: '/images/23.png', setSize: 3 },
    { id: 24, type: 'property', name: 'Ростовская Наб.',color: 'purple', value: 2, image: '/images/24.png', setSize: 3 },
    { id: 25, type: 'property', name: 'Ул. Сретенка',color: 'purple', value: 2, image: '/images/25.png', setSize: 3 },
    { id: 26, type: 'property', name: 'Ул. Полянка',color: 'purple', value: 2, image: '/images/26.png', setSize: 3 },*/
    { id: 27, type: 'property', name: 'Малая Бронная', color: 'blue',value: 4, image: '/images/27.png', setSize: 2 },
    { id: 28, type: 'property', name: 'Ул. Арбат', color: 'blue',value: 4, image: '/images/28.png', setSize: 2 },

    { id: 29, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 30, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    //{ id: 31, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    /*{ id: 32, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 33, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 34, type: 'money', name: 'One', value: 1, image: '/images/29.png' },
    { id: 35, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },*/
    //{ id: 36, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 37, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 38, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    //{ id: 39, type: 'money', name: 'Two', value: 2, image: '/images/35.png' },
    { id: 40, type: 'money', name: 'Three', value: 3, image: '/images/40.png' },
    // { id: 41, type: 'money', name: 'Three', value: 3, image: '/images/40.png' },
    // { id: 42, type: 'money', name: 'Three', value: 3, image: '/images/40.png' },
    //  { id: 43, type: 'money', name: 'Four', value: 4, image: '/images/43.png' },
    //{ id: 44, type: 'money', name: 'Four', value: 4, image: '/images/43.png' },
    { id: 45, type: 'money', name: 'Four', value: 4, image: '/images/43.png' },
    //{ id: 46, type: 'money', name: 'Five', value: 5, image: '/images/46.png' },
    { id: 47, type: 'money', name: 'Five', value: 5, image: '/images/46.png' },
    { id: 48, type: 'money', name: 'Ten', value: 10, image: '/images/48.png' },

    /*{ id: 49, type: 'action', name: 'Rent Black&LightGreen', value: 1, image: '/images/49.png' },
    { id: 50, type: 'action', name: 'Rent Black&LightGreen', value: 1, image: '/images/49.png' },

    { id: 51, type: 'action', name: 'Rent Blue&Green', value: 1, image: '/images/51.png' },
    { id: 52, type: 'action', name: 'Rent Blue&Green', value: 1, image: '/images/51.png' },

    { id: 53, type: 'action', name: 'Rent Orange&Purple', value: 1, image: '/images/53.png' },
    { id: 54, type: 'action', name: 'Rent Orange&Purple', value: 1, image: '/images/53.png' },

    { id: 55, type: 'action', name: 'Rent Yellow&Red', value: 1, image: '/images/55.png' },
    { id: 56, type: 'action', name: 'Rent Yellow&Red', value: 1, image: '/images/55.png' },

    { id: 57, type: 'action', name: 'Rent Brown&Azure', value: 1, image: '/images/57.png' },
    { id: 58, type: 'action', name: 'Rent Brown&Azure', value: 1, image: '/images/57.png' },*/

    { id: 59, type: 'action', name: 'Birthday', value: 2, image: '/images/59.png' },
    { id: 60, type: 'action', name: 'Birthday', value: 2, image: '/images/59.png' },
    { id: 61, type: 'action', name: 'Birthday', value: 2, image: '/images/59.png' },
];

module.exports = { cards, shuffle };
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
