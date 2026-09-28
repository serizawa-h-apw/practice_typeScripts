// interface: クラスが公開する項目・操作の型。実行時には残らない。
export interface Scoreable {
    // readonly: 再代入禁止 / totalScore: 合計 / number: 数値型。
    readonly totalScore: number;
    // render: 表示処理 / (): 引数なし / void: 利用する戻り値なし。
    render(): void;
}

export interface Foodable {
    element: HTMLDivElement; // element: 担当カード / HTMLDivElement: div要素の型。
    clickEventHandler(): void; // クリックされたときの処理。
}

export interface Foodsable {
    // NodeListOf<T>: DOM要素の集まり / <HTMLDivElement>: 各要素がdiv型。
    elements: NodeListOf<HTMLDivElement>;
    activeElements: HTMLDivElement[]; // []: 配列。選択中のカードを並べる。
    activeElementsScore: number[]; // 選択中の点数。例: [5, 2, -3]。
}