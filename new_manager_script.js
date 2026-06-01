if (typeof prompt === 'undefined') {
    const fs = require('fs');
    globalThis.prompt = function (message) {
        process.stdout.write(message + ': ');
        const buffer = Buffer.alloc(1024);
        try {
            const bytesRead = fs.readSync(0, buffer, 0, 1024, null);
            return buffer.toString('utf8', 0, bytesRead).trim();
        } catch (e) {
            return "";
        }
    };
}

let properties = []

//function for adding property
let add_property = () => {
    while (true) {
        property_address = prompt("Enter property address");
        property_type = prompt("Type (house/apartment/plot)");
        property_price = Number(prompt("Price (₹)"));
        property_status = prompt("Status (for-sale/rented/owned)");

        properties.push({
            location: property_address,
            type: property_type,
            price: property_price,
            status: property_status
        });

        console.log("✅ Property added.");

        // ── yahan inner loop ka decision hota hai ──
        let again = prompt("Add another property? (y/n)");

        if (again.toLowerCase() === 'n') {
            break;   // inner while loop se bahar, wapas main menu
        }
        // agar 'y' ya kuch bhi aur likha → loop dobara chalta hai
    }
};
// function for viewing property
let view_properties = () => {

    if (properties.length === 0) {
        console.log("❌ Error: No items in the list.");
    } else {
        console.log("💰 List of items:");
        properties.forEach((item, index) => {
            console.log(`${index + 1}. ${item.location}: ₹${item.price}, $${item.type}, ${item.status}`);
        });
    };

};
// function for deleting property
let delete_property = () => {
    view_properties();
    delete_item = prompt("Enter the number of the item to delete: ");
    if (isNaN(delete_item)) {
        console.log("❌ Error: Invalid input. Please enter numbers only.");
    } else if (delete_item > properties.length || delete_item < 1) {
        console.log("❌ Error: Invalid input. Please enter a valid number.");
    } else {
        properties.splice(delete_item - 1, 1);
        console.log("✅ Item deleted.");
    };
};

// menu driven loop
while (true) {
    console.log("\n1. add_property\n2. view_properties\n3. delete_property\n4.exit");
    let choice = Number(prompt("Enter your choice"));

    if (choice == 1) {
        add_property();
    } else if (choice == 2) {
        view_properties();
    } else if (choice == 3) {
        delete_property();
    } else if (choice == 4) {
        console.log("Goodbye!");
        break;
    } else {
        console.log("invalid choice");
    };
};

