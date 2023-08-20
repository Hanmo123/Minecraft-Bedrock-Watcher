import AgonesSDK from '@google-cloud/agones-sdk';
import { utils } from './utils';

(async () => {
    const sdk = new AgonesSDK();

    console.log('Connecting to Agones SDK Server...');

    await sdk.connect();
    console.log('Done.' + '\n');
    console.log('Waiting for server to be online...');

    const motd = await utils.online();
    console.log('Done.' + '\n');

    console.log('Change server\'s status to ready...');
    sdk.ready();
    console.log('Done.' + '\n');

    // console.log('Set server\'s player capacity to ' + motd.playersMax + '...');
    // sdk.alpha.setPlayerCapacity(motd.playersMax);
    // console.log('Done.' + '\n');

    console.log('Start to watch server...');
    setInterval(async () => {
        try {
            console.log('Ping...');

            const motd = await utils.ping();

            if (motd.version) {
                console.log('Pone.');

                sdk.health(() => {
                    console.error('Report Health Status Error.');
                });
            } else throw new Error('Unknown Error.');
        } catch (e) {
            console.error(e);
        }
    }, 10000);
})();