const { exec } = require('child_process');

const command = "echo '' > ./pa11y-results.html && pa11y ./src/index.html --config ./pa11y-config.json > ./pa11y-results.html";

exec(command, async (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing command: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }

    try {
        const { default: chalk} = await import('chalk');
        console.log(chalk.cyan("Accessibility report written to 'pa11y-results.html'"));
    } catch (error) {
        console.error(`Error with dynamic import: ${error}`);
    }
});
