"use strict";
(() => {
  // src/food-app/score.ts
  var Score = class _Score {
    // get: totalScoreを読むと実行。呼び方はscore.totalScore（括弧不要）。
    // 読むたびに再計算。合計値を保存して使い回す処理はない。
    get totalScore() {
      const foods2 = Foods.getInstance();
      return foods2.activeElementsScore.reduce((total, score) => total + score, 0);
    }
    render() {
      document.querySelector(".score__number").textContent = String(this.totalScore);
      console.log("\u30B9\u30B3\u30A2\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F");
    }
    // private: 外からnew Score()することを禁止。作成はgetInstance内だけ。
    constructor() {
    }
    // static: Score.getInstance()で呼べる / 戻り値: 共有のScore。
    static getInstance() {
      if (!_Score.instance) {
        _Score.instance = new _Score();
      }
      return _Score.instance;
    }
  };

  // src/food-app/food.ts
  var Food = class {
    // constructor: 作成時の処理 / public: 外部からアクセス可能 + 引数を自動保存。
    // element: 担当カード / HTMLDivElement: div要素の型 / 保存先: this.element。
    constructor(element) {
      this.element = element;
      element.addEventListener("click", this.clickEventHandler.bind(this));
    }
    clickEventHandler() {
      console.log(this);
      this.element.classList.toggle("food--active");
      const score = Score.getInstance();
      score.render();
    }
  };

  // src/food-app/foods.ts
  var Foods = class _Foods {
    // private constructor: 外からnew Foods()は不可。初回getInstance時だけ実行。
    constructor() {
      // elements: 全カードの保存先 / querySelectorAll: 一致する要素をすべて取得。
      // <HTMLDivElement>: 要素の型を指定（実物の検証はしない） / '.food': 検索条件。
      // 結果: NodeListOf<HTMLDivElement>。後から追加したカードは自動で増えない。
      this.elements = document.querySelectorAll(".food");
      // private: 外部から直接操作不可 / _activeElements: 選択カードの作業用配列。
      // HTMLDivElement[]: div要素の配列 / = []: 空配列で開始 / _: 内部用を示す命名。
      this._activeElements = [];
      // _activeElementsScore: 選択した点数の作業用配列 / number[]: 数値の配列。
      this._activeElementsScore = [];
      console.log("Foods\u304C\u4F5C\u3089\u308C\u307E\u3057\u305F");
      this.elements.forEach((element) => {
        new Food(element);
      });
    }
    // get: foods.activeElementsを読むと実行 / 戻り値: 選択カードの配列。
    get activeElements() {
      this._activeElements = [];
      this.elements.forEach((element) => {
        if (element.classList.contains("food--active")) {
          this._activeElements.push(element);
        }
      });
      return this._activeElements;
    }
    // get: foods.activeElementsScoreを読むと実行 / 戻り値: 点数の配列。
    get activeElementsScore() {
      this._activeElementsScore = [];
      this.activeElements.forEach((element) => {
        const foodScore = element.querySelector(".food__score");
        if (foodScore) {
          this._activeElementsScore.push(Number(foodScore.textContent));
        }
      });
      return this._activeElementsScore;
    }
    // static: Foods.getInstance()で呼ぶ / getInstance: 共有Foodsを返すメソッド名。
    // 初回だけnew、以後は再利用 → イベントの重複登録を防ぐ（シングルトン）。
    static getInstance() {
      if (!_Foods.instance) {
        _Foods.instance = new _Foods();
      }
      return _Foods.instance;
    }
  };

  // src/food-app/main.ts
  var foods = Foods.getInstance();
  foods.activeElements;
  foods.activeElementsScore;
})();
