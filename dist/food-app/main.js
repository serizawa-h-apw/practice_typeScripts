import { Foods } from './foods.js';
// 起動の入口。クラス名Foods → getInstance() → 取得したオブジェクトを変数foodsへ。
export const foods = Foods.getInstance();
foods.activeElements; // getter実行。初期値は[]。戻り値はここでは使わない。
foods.activeElementsScore; // 内部でactiveElementsも実行。初期値は[]。
// 初期表示の0はindex.html由来。Score.render()はクリック時に実行。
