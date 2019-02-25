const cache = [];
const defaultTimeout = 60 * 1000;

const debug = () =>
    Object.keys(cache).map(c => {
        console.log(c, cache[c].expire - Date.now());
    });

const setIntervalAsync = (fn, ms) => {
    fn().then(() => {
        setTimeout(() => setIntervalAsync(fn, ms), ms);
    });
};

setIntervalAsync(() => {
    Object.keys(cache).map(c => {
        if (cache[c].expire - Date.now() < 0) {
            if (cache[c].cb) cache[c].cb();
            del(c);
        }
    });

    return Promise.resolve();
}, 1000);

const del = key => {
    const oldRecord = cache[key];

    if (oldRecord) {
        delete cache[key];
        return true;
    }

    return false;
};

const get = key => {
    var data = cache[key];

    if (data) {
        if (isNaN(data.expire) || data.expire >= Date.now()) {
            return data.value;
        } else {
            del(key);
        }
    }

    return null;
};

const put = (key, value, ttl = defaultTimeout, cb) => {
    const oldRecord = cache[key];

    const record = {
        value: value,
        expire: ttl + Date.now(),
        ttl,
        cb
    };

    cache[key] = record;
    return value;
};

module.exports = {
    get,
    del,
    put,
    debug
};
