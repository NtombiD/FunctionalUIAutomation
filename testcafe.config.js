const createTestCafe = require('testcafe');

async function setupTestCafe() {
    const testcafe = await createTestCafe('localhost');
    try {
        const runner = testcafe.createRunner();
        const failedCount = await runner
            .src('*.spec.ts')
            .browsers(['chrome'])
            .run();
        console.log(`Failed tests: ${failedCount}`);     
        testcafe.close();
    } catch (error) {
        console.error(error);
        testcafe.close();
    }
}

setupTestCafe();