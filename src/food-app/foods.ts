import type { Foodsable } from './interface.js';
import { Food } from './food.js';

// Foods: 全食品の取得・選択状態の読み取りを担当。
export class Foods implements Foodsable {
    // private: Foods内だけでアクセス可能（外からFoods.instanceは不可）。
    // static: クラスに属する共有の保存場所（foods.instanceではなくFoods.instance）。
    // instance: 作成したFoodsを保持する名前。特別な予約語ではない。
    // : Foods: 保存する値の型。この宣言だけではnew Foods()は実行されない。
    private static instance: Foods;

    // elements: 全カードの保存先 / querySelectorAll: 一致する要素をすべて取得。
    // <HTMLDivElement>: 要素の型を指定（実物の検証はしない） / '.food': 検索条件。
    // 結果: NodeListOf<HTMLDivElement>。後から追加したカードは自動で増えない。
    elements = document.querySelectorAll<HTMLDivElement>('.food');
    // private: 外部から直接操作不可 / _activeElements: 選択カードの作業用配列。
    // HTMLDivElement[]: div要素の配列 / = []: 空配列で開始 / _: 内部用を示す命名。
    private _activeElements: HTMLDivElement[] = [];
    // _activeElementsScore: 選択した点数の作業用配列 / number[]: 数値の配列。
    private _activeElementsScore: number[] = [];

    // get: foods.activeElementsを読むと実行 / 戻り値: 選択カードの配列。
    get activeElements() {
        this._activeElements = []; // 前回分を消す → 重複・解除済みカードの残存を防ぐ。
        // forEach: 各カードに処理 / element: 今のカード / =>: 外側のthisを引き継ぐ。
        this.elements.forEach((element) => {
            // contains: クラスの有無をtrue/falseで返す → 選択中だけ対象にする。
            if (element.classList.contains('food--active')) {
                this._activeElements.push(element); // push: 配列末尾へ追加。
            }
        })
        return this._activeElements;
    }

    // get: foods.activeElementsScoreを読むと実行 / 戻り値: 点数の配列。
    get activeElementsScore() {
        this._activeElementsScore = []; // 前回の点数を消す。
        // this.activeElements: 上のgetterを実行 → 現在選択中のカードを取得。
        this.activeElements.forEach((element) => {
            // element.querySelector: このカード内を検索 / foodScore: 点数要素またはnull。
            const foodScore = element.querySelector('.food__score');
            if (foodScore) { // nullを除外 → 以下ではElement型として扱える。
                // textContent: 点数の文字列 / Number: '+5' → 5 / push: 配列へ追加。
                // 前提: HTMLが正しい数値。数値でない文字列 → NaN、空文字・null → 0。
                this._activeElementsScore.push(Number(foodScore.textContent));
            }
        })
        return this._activeElementsScore; // 例: [5, 2, -3] → Score側のreduceへ。
    }

    // private constructor: 外からnew Foods()は不可。初回getInstance時だけ実行。
    private constructor() {
        console.log("Foodsが作られました")
        this.elements.forEach((element) => {
            new Food(element); // 各カード用のFood作成 → クリック処理の登録。
        })
    }
    // static: Foods.getInstance()で呼ぶ / getInstance: 共有Foodsを返すメソッド名。
    // 初回だけnew、以後は再利用 → イベントの重複登録を防ぐ（シングルトン）。
    static getInstance() {
        if (!Foods.instance) { // 未作成か確認。
            Foods.instance = new Foods(); // 作成 → staticのinstanceへ保存。
        }
        return Foods.instance;
    }
}