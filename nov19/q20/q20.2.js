function createBankAccount() {
    let balance = 0; // private

    return {
        deposit: function (amount) {
            balance += amount;
            console.log("Deposited:", amount);
        },

        withdraw: function (amount) {
            if (amount > balance) {
                console.log("Insufficient balance");
            } else {
                balance -= amount;
                console.log("Withdrawn:", amount);
            }
        },

        checkBalance: function () {
            console.log("Current balance:", balance);
        }
    };
}
