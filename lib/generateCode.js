const generatedNumbers = new Set();

export function generateCode5digit() {
    let uniqueNumber;

    do {
        // Generate a random number between 10000 and 99999 (inclusive)
        uniqueNumber = Math.floor(10000 + Math.random() * 90000);
    } while (generatedNumbers.has(uniqueNumber));

    // Add the unique number to the Set
    generatedNumbers.add(uniqueNumber);
    
    return uniqueNumber;
}