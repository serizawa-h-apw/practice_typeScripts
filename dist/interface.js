"use strict";
/**
 * 学習: interface / 関数の型 / extends / implements
 * 実行: 加算関数を変数へ代入 → Developerを作成。各メソッドは未呼び出し。
 * interface: 必要な項目・型を定義。JavaScriptへの変換時に消える。
 */
// type: 型に名前を付ける別の書き方。下のinterfaceと同じ関数の形。
// type addFunc = (num1: number, num2: number ) => number;
// let: 再代入可能 / 左のaddFunc: 変数名 / 右のaddFunc: 上で定義した型名。
let addFunc;
// =>: アロー関数 / n1・n2: 受け取った数値 / return: 結果を呼び出し元へ返す。
addFunc = (n1, n2) => {
    return n1 + n2; // 例: addFunc(2, 3) → 5。
};
// implements: 型の条件を満たすか検査。ここではname・age・greetingが必要。
// extendsとの違い: 処理を受け継がない。各メンバーをDeveloper側で用意する。
class Developer {
    // public: 外部からアクセス可能。引数に付けるとthis.引数名へ自動保存。
    // name: 名前 / age: 年齢 / language: 独自に追加した使用言語。
    constructor(name, age, language) {
        this.name = name;
        this.age = age;
        this.language = language;
    }
    // message → コンソールへ表示。保存処理なし / 戻り値はvoidと推論。
    greeting(message) {
        console.log(message);
    }
}
// new: Developerを作成 / tmpDeveloper: 保存先の変数（Developer型）。
// 保存内容: name='Aoi', age=21, language='TypeScript'。
const tmpDeveloper = new Developer('Aoi', 21, 'TypeScript');
