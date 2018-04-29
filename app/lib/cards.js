import { fromJS, List } from 'immutable';

export const shuffle = (array) => {
    let j, x, i;
    for (i = array.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = array[i - 1];
        array[i - 1] = array[j];
        array[j] = x;
    }
};


export const newDeck = () => {
    const colour = ['red','green','purple'];
    const number = ['one','two','three'];
    const shape = ['diamond','squiggle','oval'];
    const fill = ['solid','stripe','stroke'];
    const deck = [];

    colour.forEach ( (c) => {
        number.forEach((n) =>{
            shape.forEach((s) =>{
                fill.forEach((f) =>{
                    deck.push({'colour':c, 'number':n, 'shape':s, 'fill':f});
                });
            });
        });
    });

    shuffle(deck);
    return fromJS(deck);

};

// export const deal = (deck,n) => {
//     let dealtCards = deck.takeLast(n);
//     let newDeck = deck.skipLast(n);
//     return [newDeck, dealtCards];
// }

export const deal = (deck, n) => {
   if(n == 1) {
       const r = Math.floor(Math.random() * deck.size);
       let dealtCards = new List([deck.get(r)]);
       let newDeck = deck.remove(r);
       return [newDeck, dealtCards]
   }

   let dealtCards = new List();
   let newDeck = deck;
   for(let i = 0; i < n; i += 1) {
       let [d, c] = deal(newDeck, 1);
       dealtCards = dealtCards.push(c.first());
       newDeck = d;
   }
   return [newDeck, dealtCards];
};
