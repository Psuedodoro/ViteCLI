import type { Arguments, CommandBuilder } from 'yargs';
import chalk from 'chalk';
import * as logos from '../logos';
import fs from 'fs';
import { isProject, initCheck } from './init';

type Options = {
    name?: string;
};

export const command: string[] = ["component", "c", "comp"];
export const desc: string = 'Creates a component. Use: "vcli component title" - this makes a new title component (optional).';

export const builder: CommandBuilder<Options, Options> = (yargs) =>
    yargs
        .options({
            name: { type: 'string' },
        });

export const handler = (argv: Arguments<Options>): void => {
    const { name } = argv;
    const componentName = name ? name : '';
    const fLCapitcal = componentName.charAt(0).toUpperCase() + componentName.slice(1)
    if (!isProject()) {
        console.log(chalk.red(`${logos.prefix} Sorry but please run this command in the root directory of your Vite-ReactTS project.`));
        return;
    } else if (!initCheck()) {
        console.log(chalk.red(`${logos.prefix} Sorry but you haven't initialised your project. Please run 'vcli init' first.`));
    } else if (!name){
        console.log(chalk.red(`${logos.prefix} You need to specify a name for the page component. (--name=compName)`));
        return;
    }
    else if (fs.existsSync(`./src/components/${componentName}/`)) {
        console.log(chalk.red(`${logos.prefix} Sorry but a component with the name ${componentName} already exists.`));
        return;
    } else {
        const msg = chalk.green(`${logos.prefix} The component with the name '${name}' has successfully been created in: `);
        console.time(msg)
        fs.mkdirSync(`./src/components/${fLCapitcal}`);
        fs.writeFileSync(`./src/components/${fLCapitcal}/${fLCapitcal}.component.tsx`, `import React from 'react';\n\n// Styling imports \nimport './${fLCapitcal}.styles.scss';`);
        fs.writeFileSync(`./src/components/${fLCapitcal}/${fLCapitcal}.styles.scss`, `// Add your stylings here!'`);
        console.timeEnd(msg);
    }
};