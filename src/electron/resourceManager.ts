import osUtils from 'os-utils'
import fs from 'fs';
import os from 'os';

const POLLING_INTERVAL = 500;

export function pollResources() {
setInterval(async() => {
    const cpuUsage = await getCpuUsage();
    console.log(`CPU Usage: ${cpuUsage}`);
    const ramUsage = getRamUsage();
    console.log(`RAM Usage: ${ramUsage}`);
    const storageUsage = getStorageData();
    console.log(`Storage Usage: ${storageUsage.usage}`);
}, POLLING_INTERVAL);
}

export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalRam = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        cpuModel,
        totalRam
    }
}

function getCpuUsage() {
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve)
    });
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total : Math.floor(total / 1_000_000_000),
        usage : 1 - free/total
    };
}