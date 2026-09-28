"use strict";
/**
 * 学習: デコレーター / 関数を返す関数 / クラスの置き換え
 * 状態: 以下はブロックコメント内。実行・型検査ともに対象外。
 * 方式: experimentalDecoratorsを使う従来方式（標準方式とは引数等が異なる）。
 * 定義時: @の関数を実行 → 対象を確認・変更。
 * 作成時: new User(...) → 置き換え後のconstructorを実行。
 */
/*
// Logging: デコレーターを作る関数（ファクトリー） / message: 設定用の文字列。
function Logging(message: string) {
    console.log('Logging Factory'); // @Logging(...)の式を評価するときに出力。
    // return function: 関数を返す / constructor: 対象クラス / Function: 広い関数型。
    return function (constructor: Function) {
        console.log(message); // 外のmessageを保持して参照（クロージャー）。
        console.log(constructor);
    }
}
// template: 表示するHTML / selector: 表示先を探すCSSセレクター。
function Component(template: string, selector: string) {
    console.log('Component Factory');
    // T: 対象クラスの型 / extends: 必要な条件を指定。
    // new(...args: any[]): newで作成可能 / ...args: 任意個の引数を配列で受け取る。
    // { name: string }: 作成されるオブジェクトには文字列のnameが必要。
    // constructor: T型の対象クラス / any: 引数の詳しい型の検査は緩くなる。
    return function <T extends { new(...args: any[]): { name: string } }>(constructor: T) {
        // return class: 新しいクラスを返してUserを置き換える / extends: 元のクラスを継承。
        return class extends constructor {
        constructor(...args: any[]) {
            super(...args); // ...: 配列を引数に展開 → 元クラスの初期化処理へ。
            console.log('Component');
            // querySelector: 最初に一致する要素 / mountedElement: 要素またはnull。
            const mountedElement = document.querySelector(selector);
            // new constructor(): 元クラスから、thisとは別のオブジェクトを追加作成。
            // 注意: 引数なし → この例では追加個体の_ageはundefined。
            const instance = new constructor();
            if (mountedElement) { // 表示先が存在するときだけDOMを変更。
            mountedElement.innerHTML = template; // innerHTML: 要素内のHTMLを置き換える。
            // querySelector('h1'): 見出しを取得 / !: nullではないと型検査に伝える。
            // textContent: 表示文字 / instance.name: 追加個体の名前'Quill'。
            // {{ name }}の自動展開ではなくh1全体の文字を置換。h1がなければエラー。
            mountedElement.querySelector('h1')!.textContent = instance.name;
            }
        }
        }
    }
}

// プロパティ用: target=User.prototype / propertyKey='name'。
// target: 各インスタンスではない。初期値'Quill'もここでは渡されない。
function PropertyLogging(target: any, propertyKey: string) {
    console.log('propertyLogging');
    console.log(target);
    console.log(propertyKey);
}
// メソッド用: target=User.prototype / propertyKey='greeting'。
// descriptor: 設定情報 / value: 関数本体 / writable: 上書き可否 / enumerable: 列挙可否。
function MethodLogging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('MethodLogging'); // 定義時のログ。greetingを呼ぶたびに出るわけではない。
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}
// isEnumerable: 列挙可否の設定（boolean）。false → for...in等の列挙対象から除外。
function enumerable(isEnumerable: boolean) {
    // _付きの名前: 今回は使わない引数を示す慣習。特別な言語機能ではない。
    return function (_target: any, _propertyKey: string, _descriptor: PropertyDescriptor) {
        // return: 対象の設定情報を返す。呼び出し可否を変える処理ではない。
        // クラスメソッドは通常も非列挙。ここでは設定方法の練習。
        return {
        enumerable: isEnumerable
        }
    }
}

// getter/setter用: propertyKey='age' / descriptor: get・setの関数等を持つ設定情報。
function AccessorLogging(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('AccessorLogging'); // 定義時に出力。ageを読むたびの出力ではない。
    console.log(target);
    console.log(propertyKey);
    console.log(descriptor);
}

// 引数用: target=User.prototype / propertyKey='greeting' / parameterIndex=0（先頭）。
// parameterIndex: 引数の位置。実際に渡されるmessageの値ではない。
function ParameterLogging(target: any, propertyKey: string, parameterIndex: number) {
    console.log('ParameterLogging');
    console.log(target);
    console.log(propertyKey);
    console.log(parameterIndex);
}

// @: 対象へのデコレーター適用。
// 同じ対象の順序: 式の評価は上→下、適用は下→上。
// この2つ: Logging(...) → Component(...)を評価 → Componentで置換 → Loggingで記録。
@Logging('Logging User')
@Component('<h1>{{ name }}</h1>', '#app')
class User {
    @PropertyLogging
    name = 'Quill'; // name: 名前 / =: 初期値 / 型はstringと推論。
    // private: User内だけでアクセス可能 / _age: 年齢 / number: 数値型。
    // 引数にprivate → 保存場所の用意 + this._age = _ageを自動化。
    constructor(private _age: number) {
        console.log('User was created!');
    }
    @AccessorLogging
    // get: user.ageを読むと実行 / _age: 実際の保存先 / 戻り値: number。
    get age() {
        return this._age;
    }
    // set: user.age = 33で実行 / value: 代入された値（numberと推論）。
    set age(value) {
        this._age = value; // 保存値を更新。範囲チェックはない。
    }
    @enumerable(false)
    @MethodLogging
    // @ParameterLogging: 引数の位置を記録 / message: 呼び出し時の文字列。
    greeting(@ParameterLogging message: string) {
        console.log(message);
    }
}
// newごとの流れ: super(32) → Componentの処理 → 引数なしの追加new → #appへ描画。
// 元Userのconstructor: 各回2回実行 / #app: 現在のindex.htmlにはない。
// 下の3行: 別々のUserを作成。greeting・ageのget/setは未呼び出し。
const user1 = new User(32);
const user2 = new User(32);
const user3 = new User(32);
*/
