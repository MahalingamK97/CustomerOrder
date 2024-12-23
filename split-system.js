class User {
  constructor(name) {
    this.name = name;
    this.balances = {}
  }

  adjustBalanceWith(user, amount) {
    this.balances[user.name] = (this.balances?.[user?.name] || 0) + amount;
  }

  getName() {
    return this.name;
  }

  getBalances() {
    return Object.entries(this.balances).map(([user, amount]) => {
      return {
        user,
        amount
      }  
    })
  }
  
  totalCalculations() {
    let amountToBePaid = 0;
    let amountToBeRecived = 0;
    Object.values(this.balances).map(b => {
      if(b>0) {
        amountToBePaid+= b;
      } else {
        amountToBeRecived+= Math.abs(b)
      }
    })
    return {
      amountToBePaid,
      amountToBeRecived
    }
  }
}

class Transaction {
  constructor(title, amount, payer) {
    this.title = title
    this.amount = amount;
    this.payer = payer;
    this.participants = [payer];
  }

  addParticipant(user) {
    if (!this.participants.includes(user)) {
      this.participants.push(user);
    }
  }

  split() {
    const amountPerPerson = this.amount / this.participants.length;
    this.participants.forEach(participant => {
      if (participant !== this.payer) {
        participant.adjustBalanceWith(this.payer, amountPerPerson);
        this.payer.adjustBalanceWith(participant, -amountPerPerson);
      }
    });
  }
}

class SplitSystem {
  constructor() {
    this.users = [];
    this.transactions = [];
  }

  addUser(name) {
    const user = new User(name);
    this.users.push(user);
    return user;
  }

  createTransaction(title, amount, payer) {
    const transaction = new Transaction(title, amount, payer);
    this.transactions.push(transaction);
    return transaction;
  }

  showDetailedBalances() {
    this.users.forEach(user => {
      console.log(`${user.getName()}:`);
      const total = user.totalCalculations();
      console.log(`Total owes by: ${total.amountToBePaid.toFixed(2)} owes to: ${total.amountToBeRecived.toFixed(2)}`)
      user.getBalances().forEach(balance => {
        if (balance.amount > 0) {
          console.log(`owes ${balance.user}: ${balance.amount.toFixed(2)}`);
        } else if (balance.amount < 0) {
          console.log(`owed by ${balance.user}: ${Math.abs(balance.amount).toFixed(2)}`);
        }
      });
    });
  }
}

const system = new SplitSystem();
const a = system.addUser("A");
const b = system.addUser("B");
const c = system.addUser("C");

const transaction1 = system.createTransaction('Breakfast', 1000, a);
transaction1.addParticipant(b);
transaction1.addParticipant(c);
transaction1.split();

const transaction2 = system.createTransaction('Lunch', 800, a);
transaction2.addParticipant(b);
transaction2.split();

const transaction3 = system.createTransaction('Dinner', 2000, c);
transaction3.addParticipant(a);
transaction3.addParticipant(b);
transaction3.split();

system.showDetailedBalances();
