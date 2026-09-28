"use strict";
var _a, _b;
// serizawa: 変数名 / : EngineerBlogger: 型指定 / {...}: 実際のデータ。
const serizawa = {
    name: 'serizawa',
    role: 'front-end',
    follower: 1000,
};
function toUpperCase(x) {
    // typeof: 実際の値の種類を調べる / ===: 一致判定。
    if (typeof x === "string") {
        return x.toUpperCase(); // この分岐のx: string型 → 大文字化。
    }
    return x; // 文字列は上でreturn済み → ここではnumber型。
}
// 'hello' → string用の宣言を選択 → upperHelloの型はstring、値は'HELLO'。
const upperHello = toUpperCase('hello');
function describeProfile(nomadWorker) {
    console.log(nomadWorker.name); // name: 両方の型にあるので直接参照可能。
    // in: 項目の存在を調べる / 'role'あり → この分岐ではEngineer型。
    if ("role" in nomadWorker) {
        console.log(nomadWorker.role);
    }
    if ("follower" in nomadWorker) {
        console.log(nomadWorker.follower); // この分岐ではBlogger型。
    }
}
// describeProfileは未呼び出し。serizawaを渡した場合は2つのifが両方成立。
class Dog {
    constructor() {
        // kind: 種類を区別する目印 / : 'dog': この文字列だけを許す型 / = 'dog': 初期値。
        this.kind = 'dog';
    }
    speak() {
        console.log('bow-wow');
    }
}
class Bird {
    constructor() {
        this.kind = 'bird'; // 'bird'だけを許す型（文字列リテラル型）。
    }
    speak() {
        console.log('tweet-tweet');
    }
    fly() {
        console.log('flutter');
    }
}
function havePet(pet) {
    pet.speak(); // 共通メソッド → DogでもBirdでも実行可能。
    // switch: 値による分岐 / kind: 型の判別用の目印（タグ付きユニオン）。
    switch (pet.kind) {
        case 'bird': // kindが'bird' → petはBird型と分かる。
            pet.fly();
            break; // switchを抜ける。関数全体は終了しない。
    }
    // instanceof: 指定クラスのprototypeにつながるか判定 → ここではBird型に絞る。
    // interfaceは実行時に消えるため、instanceofの判定対象には使えない。
    if (pet instanceof Bird) {
        pet.fly();
    }
}
havePet(new Bird()); // 出力: tweet-tweet → flutter → flutter（2つの分岐が成立）。
// getElementById: idで検索。通常の戻り値はHTMLElement | null。
// as HTMLInputElement: 入力要素の型として扱う指定（型アサーション）。実物の検証なし。
const input = document.getElementById('input');
input.value = 'initial input value'; // value: 入力欄の値。要素がなければここでエラー。
const designer = {
    name: 'serizawa',
    role: 'front-end', // 任意キーを追加可能。値はstringが必要。
    fafa: 'fafa'
};
const downloadedData = {
    id: 1, // 手元で作成したデータ。通信処理はない。
};
// ?.: 左側がnull/undefinedなら参照を止め、undefinedを返す（オプショナルチェーン）。
// userなし → undefined。式の型はstring | undefined。上のDOM処理成功時のみ到達。
console.log((_b = (_a = downloadedData.user) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.first);
