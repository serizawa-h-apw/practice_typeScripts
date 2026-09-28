import type { Scoreable } from './interface.js';
import { Foods } from './foods.js';

// Score: 合計と表示を担当 / implements: Scoreableの項目・型を満たすか検査。
export class Score implements Scoreable {
    // private: Score内だけでアクセス可能（外からScore.instanceは不可）。
    // static: クラスに属する共有の保存場所（各オブジェクトには作られない）。
    // instance: 作成したScoreを保持する名前 / : Score: 保存する値の型。
    private static instance: Score;

    // get: totalScoreを読むと実行。呼び方はscore.totalScore（括弧不要）。
    // 読むたびに再計算。合計値を保存して使い回す処理はない。
    get totalScore(){
        const foods = Foods.getInstance(); // 共有Foodsを取得。foodsの型はFoods。
        // activeElementsScore: 点数の配列 / reduce: 順に値をまとめる配列メソッド。
        // total: 途中の合計 / score: 今回の点数 / =>: 足し算する関数 / 0: 合計の初期値。
        // [5, 2, -3] → 0+5 → 5+2 → 7-3 → 4。未選択の[] → 0。
        return foods.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
        // querySelector: 最初に一致する要素を取得 / '.score__number': 表示先のCSSクラス。
        // !: nullでないと型検査へ伝える（存在確認ではない。要素がなければエラー）。
        // this.totalScore: getterで合計取得 / String: 文字列化 / textContent: 表示文字。
        document.querySelector('.score__number')!.textContent = String(this.totalScore);
        console.log("スコアを更新しました") // 開発者向けのログ。
    }

    // private: 外からnew Score()することを禁止。作成はgetInstance内だけ。
    private constructor() {}
    // static: Score.getInstance()で呼べる / 戻り値: 共有のScore。
    static getInstance() {
        // !: 否定。未作成ならtrue（上の要素取得後の!とは別の使い方）。
        if (!Score.instance) {
            Score.instance = new Score(); // 初回だけ作成して共有の保存場所へ。
        }
        return Score.instance; // 2回目以降も同じScoreを返す。
    }
}