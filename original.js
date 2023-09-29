var Ka = this || self;

function Fb(a) {
    var b = a.length;
    if (0 < b) {
        for (var c = Array(b), d = 0; d < b; d++) c[d] = a[d];
        return c;
    }
    return [];
}

function kIa() {
    this.blockSize = -1;
}
function LG(a, b) {
    this.blockSize = -1;
    this.blockSize = 64;
    this.chunk_ = Ka.Uint8Array
        ? new Uint8Array(this.blockSize)
        : Array(this.blockSize);
    this.total_ = this.inChunk_ = 0;
    this.hash_ = [];
    this.numHashBlocks_ = a;
    this.initHashBlocks_ = b;
    this.w_ = Ka.Int32Array ? new Int32Array(64) : Array(64);
    void 0 === MG && (MG = Ka.Int32Array ? new Int32Array(lIa) : lIa);
    this.reset();
}
var MG;
Za(LG, kIa);
for (var mIa = [], NG = 0; 63 > NG; NG++) mIa[NG] = 0;
var nIa = [].concat(128, mIa);
LG.prototype.reset = function () {
    this.total_ = this.inChunk_ = 0;
    this.hash_ = Ka.Int32Array
        ? new Int32Array(this.initHashBlocks_)
        : Fb(this.initHashBlocks_);
};
function OG(a) {
    for (var b = a.chunk_, c = a.w_, d = 0, e = 0; e < b.length; )
        (c[d++] = (b[e] << 24) | (b[e + 1] << 16) | (b[e + 2] << 8) | b[e + 3]),
            (e = 4 * d);
    for (b = 16; 64 > b; b++) {
        e = c[b - 15] | 0;
        d = c[b - 2] | 0;
        var f =
                ((c[b - 16] | 0) +
                    (((e >>> 7) | (e << 25)) ^
                        ((e >>> 18) | (e << 14)) ^
                        (e >>> 3))) |
                0,
            h =
                ((c[b - 7] | 0) +
                    (((d >>> 17) | (d << 15)) ^
                        ((d >>> 19) | (d << 13)) ^
                        (d >>> 10))) |
                0;
        c[b] = (f + h) | 0;
    }
    d = a.hash_[0] | 0;
    e = a.hash_[1] | 0;
    var k = a.hash_[2] | 0,
        l = a.hash_[3] | 0,
        m = a.hash_[4] | 0,
        n = a.hash_[5] | 0,
        p = a.hash_[6] | 0;
    f = a.hash_[7] | 0;
    for (b = 0; 64 > b; b++) {
        var q =
            ((((d >>> 2) | (d << 30)) ^
                ((d >>> 13) | (d << 19)) ^
                ((d >>> 22) | (d << 10))) +
                ((d & e) ^ (d & k) ^ (e & k))) |
            0;
        h = (m & n) ^ (~m & p);
        f =
            (f +
                (((m >>> 6) | (m << 26)) ^
                    ((m >>> 11) | (m << 21)) ^
                    ((m >>> 25) | (m << 7)))) |
            0;
        h = (h + (MG[b] | 0)) | 0;
        h = (f + ((h + (c[b] | 0)) | 0)) | 0;
        f = p;
        p = n;
        n = m;
        m = (l + h) | 0;
        l = k;
        k = e;
        e = d;
        d = (h + q) | 0;
    }
    a.hash_[0] = (a.hash_[0] + d) | 0;
    a.hash_[1] = (a.hash_[1] + e) | 0;
    a.hash_[2] = (a.hash_[2] + k) | 0;
    a.hash_[3] = (a.hash_[3] + l) | 0;
    a.hash_[4] = (a.hash_[4] + m) | 0;
    a.hash_[5] = (a.hash_[5] + n) | 0;
    a.hash_[6] = (a.hash_[6] + p) | 0;
    a.hash_[7] = (a.hash_[7] + f) | 0;
}
LG.prototype.update = function (a, b) {
    void 0 === b && (b = a.length);
    var c = 0,
        d = this.inChunk_;
    if ('string' === typeof a)
        for (; c < b; )
            (this.chunk_[d++] = a.charCodeAt(c++)),
                d == this.blockSize && (OG(this), (d = 0));
    else if (Ra(a))
        for (; c < b; ) {
            var e = a[c++];
            if (!('number' == typeof e && 0 <= e && 255 >= e && e == (e | 0)))
                throw Error('message must be a byte array');
            this.chunk_[d++] = e;
            d == this.blockSize && (OG(this), (d = 0));
        }
    else throw Error('message must be string or array');
    this.inChunk_ = d;
    this.total_ += b;
};
LG.prototype.digest = function () {
    var a = [],
        b = 8 * this.total_;
    56 > this.inChunk_
        ? this.update(nIa, 56 - this.inChunk_)
        : this.update(nIa, this.blockSize - (this.inChunk_ - 56));
    for (var c = 63; 56 <= c; c--) (this.chunk_[c] = b & 255), (b /= 256);
    OG(this);
    for (c = b = 0; c < this.numHashBlocks_; c++)
        for (var d = 24; 0 <= d; d -= 8) a[b++] = (this.hash_[c] >> d) & 255;
    return a;
};

var lIa = [
    1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993,
    2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987,
    1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774,
    264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986,
    2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711,
    113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291,
    1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411,
    3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344,
    430227734, 506948616, 659060556, 883997877, 958139571, 1322822218,
    1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424,
    2428436474, 2756734187, 3204031479, 3329325298,
];
function PG() {
    LG.call(this, 8, oIa);
}
Za(PG, LG);
var oIa = [
    1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924,
    528734635, 1541459225,
];

function lea() {
    if (!we) {
        we = {};
        for (
            var a =
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'.split(
                        ''
                    ),
                b = ['+/=', '+/', '-_=', '-_.', '-_'],
                c = 0;
            5 > c;
            c++
        ) {
            var d = a.concat(b[c].split(''));
            hea[c] = d;
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                void 0 === we[f] && (we[f] = e);
            }
        }
    }
}
var hea = {},
    we = null,
    iea = ke || le,
    jea = iea || 'function' == typeof Ka.btoa,
    kea = iea || (!ve && !he && 'function' == typeof Ka.atob);
function xe(a, b) {
    void 0 === b && (b = 0);
    lea();
    b = hea[b];
    for (
        var c = Array(Math.floor(a.length / 3)), d = b[64] || '', e = 0, f = 0;
        e < a.length - 2;
        e += 3
    ) {
        var h = a[e],
            k = a[e + 1],
            l = a[e + 2],
            m = b[h >> 2];
        h = b[((h & 3) << 4) | (k >> 4)];
        k = b[((k & 15) << 2) | (l >> 6)];
        l = b[l & 63];
        c[f++] = '' + m + h + k + l;
    }
    m = 0;
    l = d;
    switch (a.length - e) {
        case 2:
            (m = a[e + 1]), (l = b[(m & 15) << 2] || d);
        case 1:
            (a = a[e]),
                (c[f] = '' + b[a >> 2] + b[((a & 3) << 4) | (m >> 4)] + l + d);
    }
    return c.join('');
}

function Azb(a) {
    var b = void 0 === a.perSessionIsolation ? !1 : a.perSessionIsolation,
        c = void 0 === a.perUserIsolation ? !1 : a.perUserIsolation,
        d = void 0 === a.userId ? '' : a.userId;
    this.fileId = a.fileId;
    b &&
        ((a = window.sessionStorage.getItem('kernelSuffix')),
        a ||
            ((a = Math.random().toString(36).slice(2)),
            window.sessionStorage.setItem('kernelSuffix', a)),
        this.setSuffix(a));
    c && d && this.setUsername(d);
}
g = Azb.prototype;
g.setUsername = function (a) {
    this.username = a;
};
g.setSuffix = function (a) {
    this.suffix = a;
};
g.getFileId = function () {
    return this.fileId;
};
g.getUsername = function () {
    return this.username;
};
g.getSuffix = function () {
    return this.suffix;
};
g.equals = function (a) {
    return a
        ? a.getFileId() === this.getFileId() &&
              a.getSuffix() === this.getSuffix() &&
              a.getUsername() === this.getUsername()
        : !1;
};
function Bzb(a) {
    var b = new PG();
    b.update(JSON.stringify(Czb(a)));
    return xe(b.digest(), 3);
}
