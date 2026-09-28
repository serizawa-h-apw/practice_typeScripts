import type { Foodable } from './interface.js';
import { Score } from './score.js';

// Food: カード1枚を担当。カードの数だけ作成 / Foodable: 必要な項目・操作の型。
export class Food implements Foodable {
    // constructor: 作成時の処理 / public: 外部からアクセス可能 + 引数を自動保存。
    // element: 担当カード / HTMLDivElement: div要素の型 / 保存先: this.element。
    constructor(public element: HTMLDivElement) {
        // addEventListener: イベント処理の登録 / 'click': クリック / 第2引数: 呼ぶ関数。
        // this.clickEventHandler: このFoodの処理 / bind(this): thisをこのFoodに固定。
        // bindなし → 通常のイベント関数のthisはDOM要素になり、this.elementと合わない。
        element.addEventListener('click', this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
        console.log(this); // this: bindで固定した、担当カードのFood。
        // classList: 要素のCSSクラス一覧 / toggle: なければ追加、あれば削除。
        // food--active: 選択中の印。CSSで見た目も変わる。
        this.element.classList.toggle('food--active');
        const score = Score.getInstance(); // 共有Scoreを取得。
        score.render(); // 選択中の全食品を集計 → 表示更新。
    }
}