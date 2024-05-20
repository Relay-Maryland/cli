#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import os from 'node:os';
import { Command } from 'commander';
import chalk from 'chalk';
import inquirer from 'inquirer';
import yaml from 'js-yaml';

const program = new Command();

program
  .name('relay')
  .description('CLI app for creating events')
  .version('0.1.0');

// Define the 'cal' command and its alias 'event'
program
  .command('cal')
  .alias('event')
  .description('Create a calendar event')
  .action(async () => {
    console.log(chalk.green('Create a new Relay calendar entry:'));

    // Define the questions
    const questions = [
      {
        type: 'input',
        name: 'date',
        message: 'Date (YYYY-MM-DD):',
        validate: function (value) {
          const pass = value.match(/^\d{4}-\d{2}-\d{2}$/);
          if (pass) {
            return true;
          }
          return 'Please enter a valid date in the format YYYY-MM-DD';
        }
      },
      {
        type: 'input',
        name: 'title',
        message: 'Title:'
      },
      {
        type: 'input',
        name: 'time',
        message: 'Time (ie, 3-5pm, 9am, etc.):'
      },
      {
        type: 'input',
        optional: true,
        name: 'location',
        message: 'Location:'
      }
    ];

    // Prompt the user with questions
    const answers = await inquirer.prompt(questions);

    // Display the collected answers
    console.log(chalk.blue('\nYour event details:'));
    console.log(`Date: ${chalk.yellow(answers.date)}`);
    console.log(`Title: ${chalk.yellow(answers.title)}`);
    console.log(`Time: ${chalk.yellow(answers.time)}`);
    console.log(`Location: ${chalk.yellow(answers.location)}`);

    // Define the output directory and file path
    const homeDir = os.homedir();
    const outputDir = path.resolve(
      homeDir,
      'Code/relaymaryland.com/src/content/calendar/'
    );
    const outputFileName = `${answers.date} ${answers.title}.yml`;
    const outputFilePath = path.join(outputDir, outputFileName);

    // Ensure the directory exists
    fs.mkdirSync(outputDir, { recursive: true });

    // Convert answers to YAML format
    const yamlContent = yaml.dump(answers);

    // Write the YAML content to the file
    fs.writeFileSync(outputFilePath, yamlContent, 'utf8');

    console.log(
      chalk.green(`\nEvent details have been written to ${outputFilePath}`)
    );
  });

// Parse the arguments
program.parse(process.argv);
