function testEmails() {
    const testCases = [
        'john@example.com',
        'jane.doe@sub.domain.co.uk',
        'invalid-email',
        'user@.com',
        '@example.com'
    ];

    console.log("Testing email inputs:");
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;

    for (const input of testCases) {
        const isEmailValid = emailRegex.test(input);
        console.log(`"${input}" is a valid email? ${isEmailValid}`);
    }
    console.log('\n');
}

function testPhoneNumbers() {
    const testCases = [
        '123-456-7890',
        '(123) 456-7890',
        '1234567890',
        '123 456 7890',
        '123-456-789',
        '1234-567-890'
    ];

    console.log("Testing phone number inputs:");
    const phoneRegex = /^(\d{3}-\d{3}-\d{4}|\(\d{3}\)\s?\d{3}-\d{4}|\d{10}|\d{3}\s\d{3}\s\d{4})/;

    for (const input of testCases) {
        const isPhoneValid = phoneRegex.test(input);
        console.log(`"${input}" is a valid US phone number? ${isPhoneValid}`);
    }
    console.log('\n');
}

function testURLs() {
    const testCases = [
        'https://www.example.com',
        'ftp://ftp.example.com',
        'www.example.com',
        'invalid.url',
        'http://',
        'http://example.com/path with spaces'
    ];

    console.log("Testing URL inputs:");
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

    for (const input of testCases) {
        const isUrlValid = urlRegex.test(input);
        console.log(`"${input}" is a valid URL? ${isUrlValid}`);
    }
    console.log('\n');
}

testEmails();
testPhoneNumbers();
testURLs();
