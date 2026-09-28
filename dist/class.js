"use strict";
/**
 * 学習: クラス / アクセス制限 / 継承 / this
 * 実行: Personを2個作成 → 各greeting() → Teacherを作成 → greeting()
 * 型注釈・アクセス制限・readonly: TypeScriptの検査用。実行時の凍結ではない。
 */
// class: データと処理の設計図。Person: 名前・年齢・挨拶をまとめるクラス名。
class Person {
    // constructor: new Person(...)で実行される初期化処理。
    // 引数にpublic等を付ける → 保存場所の用意 + this.name = name等を自動化。
    constructor(
    // public: 外部からアクセス可能 / readonly: 名前の再代入を禁止。
    // name: 受け取る名前と保存先の名前 / string: 文字列型。
    name, 
    // protected: Personと子クラス内でアクセス可能（外部からは不可）。
    // age: 受け取った年齢をthis.ageに保存 / number: 数値型。
    age) {
        this.name = name;
        this.age = age;
        // readonly: 作成後の再代入を禁止（このクラスのconstructor内では代入可能）。
        // id: 識別用の値 / : number: 数値型 / = 16: 初期値。
        this.id = 16;
        // this: 作成中のPerson / random(): 0以上1未満 / floor(): 小数を切り捨て。
        // 0〜1未満 → 100倍 → 0〜99の整数 → this.idへ保存。idの重複はあり得る。
        this.id = Math.floor(Math.random() * 100);
        // 受け取った名前 → 'serizawa'で上書き。'Haruto'や'Jack'は残らない。
        this.name = 'serizawa';
    }
    // incrementAge: 年齢を1増やすメソッド / 戻り値: void（ここでは未呼び出し）。
    incrementAge() {
        this.age += 1; // += 1: this.age = this.age + 1と同じ。
    }
    // this: Person: 呼び出し元の型を指定。実行時の引数には含まれない。
    // 例: haruto.greeting() → thisはharuto。thisを固定する機能ではない。
    greeting() {
        // `...${値}...`: 文字列への値の埋め込み / console.log: コンソールへ表示。
        console.log(`Hello! My name is ${this.name} and I am ${this.age} years old.`);
    }
}
// extends: 親のデータ・処理を継承 / Teacher: 子 / Person: 親。
class Teacher extends Person {
    // name・age: 親へ渡す引数 / private: Teacher内だけでアクセス可能。
    // subject: 教科名。private付き引数なのでthis.subjectへ自動保存。
    constructor(name, age, subject) {
        // super: 親のconstructorを呼ぶ。子でthisを使う前に必要。
        // name・age → Personで保存 → 親の処理によりnameは'serizawa'に変わる。
        super(name, age);
        this.subject = subject;
    }
    // greeting: 親の同名メソッドを上書き（オーバーライド）。
    // age: 親のprotectedなので参照可能 / subject: このクラスのprivate。
    greeting() {
        console.log(`Hello! My name is ${this.name}, I am ${this.age} years old and I teach ${this.subject}.`);
    }
}
// const: 変数への再代入を禁止（中身の凍結ではない） / new: インスタンスを作成。
// haruto: 作成したPersonの保存先。型はPersonと推論される。
const haruto = new Person('Haruto', 20);
haruto.greeting(); // 名前: serizawa / 年齢: 20。
// 別のnew → 別のインスタンス。年齢やidはそれぞれが保持。
const anotherHaruto = new Person('Another Haruto', 25);
anotherHaruto.greeting(); // 名前: serizawa / 年齢: 25。
const teacher = new Teacher('Jack', 21, 'Math');
teacher.greeting(); // 子のgreetingを実行。名前: serizawa / 年齢: 21 / 教科: Math。
