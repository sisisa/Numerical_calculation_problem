// 許容誤差の定義
const EPS = 0.0001;

document.addEventListener("DOMContentLoaded", () => {
  // グラフ描画用の要素や入力要素を取得
  const graphDiv = document.getElementById("graph");
  const aInput = document.getElementById("aInput");
  const bInput = document.getElementById("bInput");
  const calculateButton = document.getElementById("calculateButton");
  const resultText = document.getElementById("resultText");
  const output = document.getElementById("output");
  const output2 = document.getElementById("output2");
  const output3 = document.getElementById("output3");

  // 「計算」ボタンがクリックされたときの処理を設定
  calculateButton.addEventListener("click", () => {
    // 入力値を取得し、グラフを描画
    const a = parseFloat(aInput.value);
    const b = parseFloat(bInput.value);
    

    plotGraph(graphDiv, a, b);
    resultText.innerHTML = "";

    // 2分法で近似解を求め、計算過程を表示
    const x = nibun(a, b);

    
    // output3.innerHTML += "近似解 x = " + b;
    resultText.innerHTML = `近似解 x = ${x.toFixed(4)}`;
  });
});

// 2分法による計算
function nibun(a, b) {
  let c;
  let iterationCount = 0; // 計算回数をカウントする変数

  // 計算過程を格納する変数を定義
  let calc_Process = '';

  while (Math.abs(a - b) > EPS) {
    c = (a + b) / 2.0;
    calc_Process += c + "<br>";
    iterationCount++; // 計算回数をインクリメント
    if (func_y(c) * func_y(a) < 0) b = c;
    else a = c;
  } 

  // 計算過程を出力する要素に代入
  output2.innerHTML = calc_Process;
  // 計算過程表示エリアを設定
  output.innerHTML = `計算過程（計算回数: ${iterationCount}回）:<br>`;
  return c;
}

// 方程式の関数
function func_y(x) {
  return Math.pow(x, 3.0) + x - 1.0;
}

// グラフを描画
function plotGraph(graphDiv, a, b) {
  const xValues = [];
  const yValues = [];

  // xの値をaからbまで変化させてyの値を計算し、データを準備
  for (let x = a; x <= b; x += 0.01) {
    xValues.push(x);
    yValues.push(func_y(x));
  }

  // グラフの設定
  const trace = {
    x: xValues,
    y: yValues,
    mode: "lines",
    type: "scatter",
    name: "関数",
  };

  const intervalLine = {
    x: [a, b],
    y: [0, 0],
    mode: "lines",
    type: "scatter",
    name: "区間",
    line: { color: "red" },
  };

  const rootPoint = {
    x: [nibun(a, b)],
    y: [func_y(nibun(a, b))],
    mode: "markers",
    type: "scatter",
    name: "近似解",
    marker: { color: "green", size: 10 },
  };

  // グラフのレイアウト設定
  const layout = {
    title: "二分法シミュレータ",
    xaxis: { title: "x" },
    yaxis: { title: "f(x)" },
    showlegend: true,
  };

  // グラフを描画
  const data = [trace, intervalLine, rootPoint];
  Plotly.newPlot(graphDiv, data, layout);
}
