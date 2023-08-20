import { ServerAdvertisement, ping } from 'bedrock-protocol';

export const utils = {
    ping: async () => await ping({
        host: 'localhost',
        port: 19132,
    }),
    online: () => new Promise<ServerAdvertisement>(async (resolve, reject) => {
        let intervalId = setInterval(async () => {
            try {
                const motd = await utils.ping();

                if (motd.version) {
                    clearInterval(intervalId);
                    resolve(motd);
                }
            } catch (e) { }
        }, 1000)
    })
};