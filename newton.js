// 許容誤差の定義
const EPS = 0.0001;

// ページが読み込まれた時の処理
document.addEventListener("DOMContentLoaded", () => {
  // グラフ描画用の要素やボタンなどを取得
  const graphDiv = document.getElementById("graph");
  const calculateButton = document.getElementById("calculateButton");
  const resultText = document.getElementById("resultText");
  const output = document.getElementById("output");
  const output2 = document.getElementById("output2");
  const output3 = document.getElementById("output3");

  // 「計算」ボタンがクリックされたときの処理を設定
  calculateButton.addEventListener("click", () => {
    // グラフを描画
    plotGraph(graphDiv);

    // 結果表示エリアをリセット
    resultText.innerHTML = "";

    // ニュートン法による近似解を計算
    let x = newtonMethod();
    
    // 初期値 a を 1.0 に設定し、近似解を計算
    let a = 1.0;
    let b;
    let iterationCount = 0; // 計算回数をカウントする変数
    while (1) {
      // 近似解を更新
      b = a - func_y(a) / func_z(a);
      // 更新した近似解を表示
      output2.innerHTML += b + "<br>";
      iterationCount++; // 計算回数をインクリメント
      // 計算の収束判定
      if (Math.abs(a - b) < EPS) break;
      else a = b;
    }
    
    // 計算過程表示エリアを設定
    output.innerHTML = `計算過程（計算回数: ${iterationCount}回）:<br>`;

    // 近似解を表示
    output3.innerHTML += "近似解 x = " + b;
  });
});

// ニュートン法の計算
function newtonMethod() {
  let a = 1.0;
  let b;

  while (1) {
    // 近似解を更新
    b = a - func_y(a) / func_z(a);
    
    // 計算の収束判定
    if (Math.abs(a - b) < EPS) break;
    else a = b;
  }

  return b;
}

// 方程式の関数
function func_y(x) {
  return Math.pow(x, 3.0) + x - 1.0;
}

// 方程式の導関数
function func_z(x) {
  return 3.0 * Math.pow(x, 2.0) + 1.0;
}

// グラフを描画
function plotGraph(graphDiv) {
  const xValues = [];
  const yValues = [];

  // x の値を -2 から 2 まで変化させて y の値を計算し、データを準備
  for (let x = -2; x <= 2; x += 0.01) {
    xValues.push(x);
    yValues.push(func_y(x));
  }

  // グラフのトレースデータを準備
  const trace = {
    x: xValues,
    y: yValues,
    mode: "lines",
    type: "scatter",
    name: "関数",
  };

  // 近似解を示す点を用意
  const rootPoint = {
    x: [newtonMethod()],
    y: [0],
    mode: "markers",
    type: "scatter",
    name: "近似",
    marker: { color: "green", size: 10 },
  };

  // グラフのレイアウト設定
  const layout = {
    title: "ニュートン法シミュレータ",
    xaxis: { title: "x" },
    yaxis: { title: "f(x)" },
    showlegend: true,
  };

  // グラフを描画
  const data = [trace, rootPoint];
  Plotly.newPlot(graphDiv, data, layout);
}
