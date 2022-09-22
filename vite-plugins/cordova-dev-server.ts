import { spawn } from 'child_process';
import * as chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';

let child: any = null;
function closeProcess() {
    if (child) {
        child.stdin.pause();
        child.kill();
        child = null;
    }
}

async function waitForFileExists(filePath, currentTime = 0, timeout = 5000) {
    if (fs.existsSync(filePath)) return true;
    if (currentTime === timeout) return false;
    // wait for 1 second
    await new Promise((resolve, reject) => setTimeout(() => resolve(true), 1000));
    // waited for 1 second
    return await waitForFileExists(filePath, currentTime + 1000, timeout);
  }

function startAndWatch(options: any, config: any) {
    let last_update = null;
    let ready = false;

    function handleHotUpdate(path: string) {
        if (ready) {
            clearTimeout(last_update);
            last_update = setTimeout(() => {
                closeProcess();
                startAndWatch({ ...options, nolaunch: true, start_delay: 1 }, config);

            }, options.update_delay || 1500)
        }
    }

    setTimeout(() => {
        spawn('cordova', ["build", "browser"]).on('close', () => {

            const watcher = chokidar.watch(config.build.outDir, { ignored: /^\./, persistent: true, awaitWriteFinish: true });
            watcher.on('ready', async () => {
                ready = true
                await waitForFileExists(path.join(config.build.outDir, 'index.html'));
                const args = ["run", "custom-browser", "--live-reload"];
                if (options.nolaunch) {
                    args.push("--target=none")
                }
                child = spawn('cordova', args, { env: process.env, detached: false });
                child.stdout.on('data', (data: any) => console.info(data?.toString()));
                child.stderr.on('data', (data: any) => console.error(data?.toString()));
                child.on('close', () => {
                    // const code = child?.exitCode || child?.signalCode || 0;
                    watcher.close();
                    // console.error(`Server process exited with code ${code}\n`);
                });
            })
            .on('add', handleHotUpdate)
            .on('change', handleHotUpdate)
            .on('unlink', handleHotUpdate)
            .on('error', console.error)
        })

    }, options.start_delay || 1500) //start delay

}

export const cordovaDevServer = (options: any = {}) => {
    let config: any;
    return {
        name: 'cordova-dev-server',
        configResolved(resolvedConfig): any {
            // store the resolved config
            config = resolvedConfig
            if (config.command === 'build' && config.build.watch) {
                startAndWatch(options, config);
            }
        }
    }
}

export default cordovaDevServer; 