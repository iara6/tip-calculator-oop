class TipCalculator {
  constructor(billAmount, tipPercent, peopleCount) {
    this.billAmount = billAmount;
    this.tipPercent = tipPercent;
    this.peopleCount = peopleCount;

    this.calcBtn = document.querySelector('.calcBtn');

    this.billAmountDOM = document.querySelector('.billAmount');
    this.tipPercentDOM = document.querySelector('.tipPercent');
    this.peopleCountDOM = document.querySelector('.peopleCount')
    this.resultDOM = document.querySelector('.result');
    this.historyDOM = document.querySelector('.history');

    this.calculate = this.calculate.bind(this);
    
    this.calcBtn.addEventListener('click', this.calculate);
    // this.history = [];
    this.history = JSON.parse(localStorage.getItem('historyEntries')) || [];

    this.history.forEach(() => {
      this.displayHistory(); // Display each existing entry from the start
    });
  }

  calculate() {
    this.billAmount = parseFloat(this.billAmountDOM.value);
    this.tipPercent = parseFloat(this.tipPercentDOM.value);
    this.peopleCount = parseInt(this.peopleCountDOM.value);

    if (isNaN(this.billAmount) || isNaN(this.tipPercent) || isNaN(this.peopleCount) || this.billAmount <= 0 || this.tipPercent <= 0 || this.peopleCount <= 0) {
      alert('Enter valid numbers!');
      return;
    }

    const tip = Math.round(this.billAmount * (this.tipPercent/100)).toFixed(2);
    const totalAmount = (parseFloat(tip) + this.billAmount).toFixed(2);
    const amountPerPerson = (totalAmount / this.peopleCount).toFixed(2);

    this.resultDOM.innerHTML = `<h4>Result:</h4><span>Total Tip:</span> $${tip}, <span>Total Amount:</span> $${totalAmount}, <span>Amount per Person:</span> $${amountPerPerson}`;

    this.addToHistory(this.billAmount, this.tipPercent, this.peopleCount, tip, totalAmount, amountPerPerson);

    this.billAmountDOM.value = '';
    this.tipPercentDOM.value = '';
  }

  addToHistory(billAmount, tipPercent, peopleCount, tip, totalAmount, amountPerPerson) {
    const entry = {
      bill: `$${billAmount.toFixed(2)}`,
      tipPercent: `${tipPercent}%`,
      peopleCount: `${peopleCount}`,
      tip: `$${tip}`,
      total: `$${totalAmount}`,
      perPerson: `$${amountPerPerson}`,
    };

    this.history.push(entry);

    localStorage.setItem('historyEntries', JSON.stringify(this.history));

    this.displayHistory()
  }

  displayHistory() {
    this.historyDOM.innerHTML = '';

    this.history = JSON.parse(localStorage.getItem('historyEntries'));

    this.history.forEach((entry, index) => {
      const infoDiv = document.createElement('div');
      document.querySelector('.history-title').style.display = "block";
  
      infoDiv.innerHTML = `Bill: ${this.history[index].bill}, Tip Percent: ${this.history[index].tipPercent}, People: ${this.history[index].peopleCount},<br> Tip Total: ${this.history[index].tip}, Total: ${this.history[index].total},<br> Amount per Person: ${this.history[index].perPerson} <button class="delete-btn" data-id="${index}"><i class="fa-regular fa-rectangle-xmark"></i></button>`;
  
      this.historyDOM.appendChild(infoDiv);
  
      this.deleteBtn = infoDiv.querySelector('.delete-btn');
      
      this.deleteBtn.addEventListener('click', () => {
       const btnIndex = parseInt(this.deleteBtn.dataset.id, 10); // STRING
          
       this.history.splice(btnIndex, 1); // remove the history entry based on the correct index (btnIndex)
       localStorage.setItem('historyEntries', JSON.stringify(this.history));  // update localStorage with the modified history array
       infoDiv.remove();
       this.updateDeleteBtns(); // update data-id attributes of all remaining delete buttons to keep them in sync
      });
    });
  }

  updateDeleteBtns() {
    const deleteBtns = document.querySelectorAll('.delete-btn');

    deleteBtns.forEach((btn, ind) => {
      btn.setAttribute('data-id', ind);
    });
  }
};

document.addEventListener('DOMContentLoaded', () => {
  new TipCalculator();
});


