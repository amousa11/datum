$(document).ready(function() {

    //  Instantiate IOTA with provider 'http://localhost:14265'
    var iota = new IOTA({
        // 'host': 'http://localhost',
        // 'port': 14265
        'host': 'http://service.iotasupport.com',
        'port': 14265
    });

    var seed;
    var address;
    var checkedTxs = 0;

    var subscribed = [];
    //
    //  Gets the addresses and transactions of an account
    //  As well as the current balance
    //  Automatically updates the HTML on the site
    //
    function getAccountInfo() {

        // Command to be sent to the IOTA Node
        // Gets the latest transfers for the specified seed
        iota.api.getAccountData(seed, function(e, accountData) {

            console.log("Account data", accountData);

            // Update address in case it's not defined yet
            if (!address && accountData.addresses[0]) {

                address = iota.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1]);

                updateAddressHTML(address);
            }

            var transferList = [];

            //  Go through all transfers to determine if the tx contains a message
            //  Only valid JSON data is accepted
            if (accountData.transfers.length > checkedTxs) {

                console.log("RECEIVED NEW TXS");

                accountData.transfers.forEach(function(transfer) {

                    try {

                        var message = iota.utils.extractJson(transfer);
                        console.log("Extracted JSON from Transaction: ", message);

                        message = JSON.parse(message);
                        console.log("JSON: ", message);

                        var newTx = {
                            'name': message.name,
                            'message': message.message,
                            'value': transfer[0].value
                        }
                        transferList.push(newTx);

                    } catch(e) {
                        console.log("Transaction did not contain any JSON Data");
                    }
                })

                // Increase the counter of checkedTxs
                checkedTxs = accountData.transfers.length;
            }

            // If we received messages, update the leaderboard
            if (transferList.length > 0) {

                updateLeaderboardHTML(transferList);

            }
        })
    }
    

    var balance = 0; //balance = accountData.balance in getAccountInfo function (setInterval to say 60 seconds)
    //address is your own address where you'd be checking a confirmation of payment (Set in getAccountInfo)
    //Assumption: "address" in this function is always the correct one. Must know who is sending iota because you cant parse your transfers to find out as addresses are temp
    function validateAndSend(amountSent, sendToAddress, MAMkey){ //MAM channel key generated elsewhere (or other MAM related things to send).

        var old_balance = balance;

        iota.api.getAccountData(seed, function(e, accountData) {

            console.log("Account data", accountData);

            // Update address
            if (!address && accountData.addresses[0]) {

                address = iota.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1]);

            }
            balance = accountData.balance;

            if(!iota.valid.isAddress(address)){
            console.log("Not a valid address");
            }

            iota.api.isReattachable(address, function(e, confirmed) {

                if(!e && old_balance + amountSent == balance && confirmed) { //Only if balance is updated and the transaction was confirmed

                    old_balance = balance;
                    //lastItem = accountData.transfers.length - 1
                    //accountData.transfers[lastItem][accountData.transfers[lastItem].length - 1]["*Whatever attribute*"] for data on latest transaction
                    sendTransfer(sendToAddress, 0, MAMkey) 

                }

            })

        })

    }

    /*
    Shuffle steps:
    1. Generate a new seed.
    2. Transfer tokens and data out of current seed into new seed.
    3. Give the person who bought data the old seed with all the data.
    4. Add old seed into "subscribed array" -> send data to every seed in the array.
    */
    function shuffle(){

        iota.api.getAccountData(seed, function(e, accountData) {

            console.log("Account data", accountData);

            // Update address
            if (!address && accountData.addresses[0]) {

                address = iota.utils.addChecksum(accountData.addresses[accountData.addresses.length - 1]);

            }
            balance = accountData.balance;

            if(!iota.valid.isAddress(address)){
            console.log("Not a valid address");
            }

            var newAddress;
            
            iota.api.getNewAddress( seed, { 'checksum': true }, function( e, newAddr ) {

                if (!e) {

                    newAddress = newAddr;

                } else {

                    console.log(e);
                }

            })

            //Transfer all tokens to newAddress
            var tempMessage = iota.utils.toTrytes(JSON.stringify(messageToSend));
            var val = accountData.balance;
            var transfer = [{
                'address': newAddress,
                'value': parseInt(val),
                'message': tempMessage
            }]


            iota.api.sendTransfer(address, 4, 18, transfer, function(e){ //Move all your tokens
                if(e){
                    console.log(e);
                }
            })

            var allTransfers = iota.api.getTransfers(address, function(e)
            {
                if(!e){
                    //do stuff in frontend
                }
                else {
                    console.log(e);
                }
            }) //all the transfers in the current address (node)

            for(int i = 0; i < allTransfers.length; i++){
                var oldTransfer = allTransfers[i];

                sendTransfer(newAddress, 0, oldTransfer.message);

            }


        })

        subscribed.push(address); //Add to the subscribed list
        address = newAddress; //set your address to the newly generated

        //** INSERT SEND SEED TO BUYER HERE** aka MAM stuff
    }


    function sendTransfer(address, value, messageTrytes) {

        var transfer = [{
            'address': address,
            'value': parseInt(value),
            'message': messageTrytes
        }]

        console.log("Sending Transfer", transfer);

        // We send the transfer from this seed, with depth 4 and minWeightMagnitude 18
        iota.api.sendTransfer(seed, 4, 18, transfer, function(e) {

            if (e){

                //Failed transaction. Update UI

            } else {

            
                //Successful transaction. Update UI

            }
        })
    }



});
