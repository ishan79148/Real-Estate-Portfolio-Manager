const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Template (Empty Dictonary)

const propertyTemplate = {
    id: null,
    location: null,
    type: null,
    price: null,
    status: null
};

// in-memory array
const properties = [];

let nextId = 1;

//function for saving file
function saveToFile() {
    // JSON.stringify converts the JS array to a string
    // null, 2  means: pretty-print with 2-space indent
    fs.writeFileSync('data.json', JSON.stringify(properties, null, 2));
};

// function for adding property
function addProperty(callback) {
    rl.question('Address   : ', (address) => {
        rl.question('Type (house/apartment/plot): ', (type) => {
            rl.question('Price (₹) : ', (price) => {
                rl.question('Status (for-sale/rented/owned): ', (status) => {

                    // Build a new object using the template's shape
                    const newProperty = {
                        id: nextId++,
                        address: address.trim(),
                        type: type.trim(),
                        price: parseFloat(price),   // hint: convert price to a number
                        status: status.trim()
                    };

                    properties.push(newProperty);   // hint: which array method adds to end?
                    saveToFile();
                    console.log(`\n Property added! ID is ${newProperty.id}`);

                    callback();   // go back to the menu
                });
            });
        });
    });
};
// function for view property
function viewProperties() {
    if (properties.length === 0) {
        console.log('\n No properties found.');
        return;
    }

    console.log('\n ID  | Address                   | Type        | Price (₹)       | Status');
    console.log('-----|---------------------------|-------------|-----------------|----------');

    properties.forEach((p) => {
        // hint: use .padEnd(n) to make each column a fixed width
        // so the table stays aligned
        console.log(
            String(p.id).padEnd(4) + ' | ' +
            p.address.padEnd(25) + ' | ' +
            p.type.padEnd(11) + ' | ' +
            String(p.price).padEnd(15) + ' | ' +
            p.status
        );
    });
};

// function for deleting property 
function deleteProperty(callback) {
    viewProperties();   // show list so user knows which IDs exist

    rl.question('\n Enter ID to delete (0 to cancel): ', (input) => {
        const id = parseInt(input);

        if (id === 0) return callback();

        // find the index of the property with this id
        const index = properties.findIndex(p => p.id === id);

        if (index === -1) {
            console.log(' ID not found.');
        } else {
            const removed = properties[index];
            properties.splice(index, 1);    // removes 1 item at that index
            saveToFile();
            console.log(` Deleted: ${removed.address}`);
        }

        callback();
    });
};

// menu driven system for user 
function showMenu() {
    console.log('\n╔══════════════════════════════╗');
    console.log('║   Real Estate Portfolio      ║');
    console.log('╠══════════════════════════════╣');
    console.log('║  1. Add property             ║');
    console.log('║  2. View all properties      ║');
    console.log('║  3. Delete property          ║');
    console.log('║  0. Exit                     ║');
    console.log('╚══════════════════════════════╝');

    rl.question('\n Your choice: ', (choice) => {
        switch (choice.trim()) {
            case '1':
                addProperty(showMenu);      // after adding, call showMenu again
                break;
            case '2':
                viewProperties();
                showMenu();                 // viewProperties is sync, call menu right after
                break;
            case '3':
                deleteProperty(showMenu);   // after deleting, call showMenu again
                break;
            case '0':
                console.log('\n Goodbye!\n');
                rl.close();
                break;
            default:
                console.log(' Invalid choice. Try again.');
                showMenu();
        }
    });
};


showMenu();