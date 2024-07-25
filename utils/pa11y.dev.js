const fs = require('fs');
const path = require("path");
const { exec } = require("child_process");
const { promisify } = require('util');
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const rootDir = path.resolve(__dirname, "..");

const createOutputDir = `rm -rf ${path.resolve(
  rootDir,
  "pa11y-results"
)} && mkdir ${path.resolve(rootDir, "pa11y-results")}`;

const createOutputFile = `touch ${path.resolve(
  rootDir,
  "pa11y-results"
)}/index.html`;

const runPa11y = `pa11y ${path.resolve(
  rootDir,
  "src"
)}/index.html --config ${rootDir}/pa11y-config.json > ${path.resolve(
  rootDir,
  "pa11y-results"
)}/index.html`;


// Start by executing the 'createOutputDir' command
exec(createOutputDir, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing command: ${error}`);
    return;
  }
  if (stderr) {
    console.error(`stderr: ${stderr}`);
    return;
  }

  // If no errors, execute the 'createOutputFile' command
  exec(createOutputFile, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    // If no errors, execute the 'runPa11y' command
    exec(runPa11y, async (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
      }

      // If no errors, write the CSS to 'pa11y-results/style.css'
      try {
        const cssString = await readFile(path.resolve(`${__dirname}/reporters/base.css`), 'utf-8');
        await writeFile(`${path.resolve(rootDir, "pa11y-results")}/style.css`, cssString);
      } catch (error) {
        console.error(`Error writing CSS: ${error}`);
      }

      try {
        const { default: chalk } = await import("chalk");
        console.log(
          chalk.cyan("Accessibility report written to 'pa11y-results/index.html' 🚀")
        );
      } catch (error) {
        console.error(`Error with dynamic import: ${error}`);
      }
    });
  });
});
