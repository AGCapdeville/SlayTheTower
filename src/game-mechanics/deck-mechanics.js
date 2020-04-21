
class DeckMechanic{
    constructor(deckTitle, deck){
        // grab card from JSON file
        this.title = deckTitle
        this.deck = []
        this.
    }


    shuffle_deck(self){
        var j, x, i;
        for (i = self.deck.length-1; i > 0; i--){
            j = Math.floor(Math.random() * (i + 1));
            x = slef.deck[i];
            self.deck[i] = self.deck[j];
            self.deck[j] = x;
        }
    }

    remaining_cards(self){
        return self.deck.length()
    }

    draw_card(){

    }

    draw_hand(){

    }

    discard_hand(){

    }


}




// -------------------------- TODO: Implement these functions with store and game in mind: --------------------------


function rando(deck) {
    var j, x, i
    for (i = deck.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1))
      x = deck[i]
      deck[i] = deck[j]
      deck[j] = x
    }
    return deck
  }
  
  // deck = [0,1,2,3,4,5,6,7,8,9]
  // deck = [{"card":0, "lonk":" 0IMGUR_URL"},{"card":1, "lonk":" 1IMGUR_URL"},{"card":2, "lonk":" 2IMGUR_URL"}]
  
  // console.log(deck[0]["card"])
  
  // Try edit message
  const data = {
    message: 'Hello world',
  }
  
  // deck = rando(deck)
  
  // deckOrder = deck.map(deck => deck["lonk"])
  // console.log(deckOrder)
  
  // data.message = (deckOrder)
  
  // $('#msg').html(data.message)
  // console.log(data)
  
  // !!!!!!!!!!!!! This would be in a hero-data file !!!!!!!!!!!!!
  // import { sword } from './heros.js'
  const sword = {
    title: "sword",
    health: 55, 
    energy: 3,
    deck: [
        {id:0, card:'slash'}, {id:1, card:'slash'}, {id:2, card:'slash'}, {id:3, card:'slash'}, {id:4, card:'slash'},
        {id:5, card:'guard'}, {id:6, card:'guard'}, {id:7, card:'guard'}, {id:8, card:'guard'}, {id:9, card:'heal'}
    ],
    last_id: 9
  }
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
  const player = {
    title: "",
    health: 0,
    energy: 0,
    armor: 0,
    deck: [],
    hand: [],
    grave: [],
    void: [],
    last_id: 0
  }
  
  // initialize deck: ( from a import )
  console.log(sword.deck);
  player.title = sword.title;
  player.health = sword.health;
  player.energy = sword.energy;
  player.deck = sword.deck;
  player.last_id = sword.last_id;
  console.log('PLAYER INITIALIZED:',player)
  
  //// adding cards to a deck:
  player.deck.push({id:(player.last_id+1), card:"slash"});
  player.last_id = player.last_id+1;
  console.log('\nADDING A SLASH CARD TO DECK:', player);
  
  // how to find cards in a deck:
  id = 2
  let cardObj = player.deck.find(deck => deck.id === id)
  
  // discard card from deck
  console.log('\nCard to be removed:', cardObj)
  const index = player.deck.indexOf(id)
  if (index > -1) {
    player.deck.splice(index, 1)
  }
  console.log('Card is removed:', player)
  
  
  // Shuffle decl:
  console.log("Shuffled deck")
  player.deck = rando(player.deck)
  
  // draw 5 cards
  console.log("Drawing 5 cards")
  for (var hand = 0; hand<5; hand++){
    player.hand.push(player.deck.pop())
  }
  
  console.log(player)
  
  
  // Play a card:
  console.log("Play a card:")
  function play_card(choice){
    chosen_card = player.hand[choice]
    whole_hand = player.hand.map(hand => hand['card'])
  
    console.log("hand:",whole_hand)
    console.log("chose:",chosen_card)
    // parse card's action & play it out in game
    // update players energy in store,
    // also check to make sure the player can even play said card
    // ( will probably write a function to play out the cards effect )
    card = player.hand.splice(player.hand.indexOf(chosen_card.id),1)
    console.log("card_splice",card[0])
    player.grave.push(card[0])
    console.log("player hand", player)
  }
  
  play_card(0)
  play_card(1)
  play_card(2)
  