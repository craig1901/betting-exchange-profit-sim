import Chart from "chart.js/auto";

document.addEventListener("DOMContentLoaded", () => {
  // --- DOM ELEMENTS ---
  const simBankrollInput = document.getElementById("sim-bankroll");
  const simStakeInput = document.getElementById("sim-stake");
  const simWinRateInput = document.getElementById("sim-win-rate");
  const simAvgWinInput = document.getElementById("sim-avg-win");
  const simAvgLossInput = document.getElementById("sim-avg-loss");
  const simTradesInput = document.getElementById("sim-trades");
  const runSimBtn = document.getElementById("run-simulation-btn");
  const simResultsEl = document.getElementById("simulation-results");
  const simChartCanvas = document
    .getElementById("simulation-chart")
    .getContext("2d");
  let simulationChart;

  // --- SIMULATION LOGIC ---
  function runSimulation() {
    const initialBankroll = parseFloat(simBankrollInput.value);
    const winRate = parseFloat(simWinRateInput.value) / 100;
    const numTrades = parseInt(simTradesInput.value);
    const profitPerWin = parseFloat(simAvgWinInput.value);
    const lossPerLoss = -Math.abs(parseFloat(simAvgLossInput.value)); // Ensure it's negative

    if (
      isNaN(initialBankroll) ||
      isNaN(winRate) ||
      isNaN(numTrades) ||
      isNaN(profitPerWin) ||
      isNaN(lossPerLoss) ||
      winRate < 0 ||
      winRate > 1 ||
      numTrades <= 0
    ) {
      alert("Please enter valid simulation parameters.");
      return;
    }

    let bankroll = initialBankroll;
    const bankrollHistory = [initialBankroll];
    let winCount = 0;

    for (let i = 0; i < numTrades; i++) {
      if (Math.random() < winRate) {
        bankroll += profitPerWin;
        winCount++;
      } else {
        bankroll += lossPerLoss;
      }
      bankrollHistory.push(bankroll);
    }

    displaySimulationResults(initialBankroll, bankroll);
    drawSimulationChart(bankrollHistory);
  }

  function displaySimulationResults(initial, final) {
    const profit = final - initial;
    const roi = initial > 0 ? (profit / initial) * 100 : 0;
    const color = profit >= 0 ? "text-green-400" : "text-red-400";

    simResultsEl.innerHTML = `
                  <div>
                      <p class="text-gray-400 text-sm">Final Bankroll</p>
                      <p class="text-2xl font-bold ${color}">£${final.toFixed(2)}</p>
                  </div>
                  <div>
                      <p class="text-gray-400 text-sm">Total Profit/Loss</p>
                      <p class="text-2xl font-bold ${color}">£${profit.toFixed(2)}</p>
                  </div>
                  <div>
                      <p class="text-gray-400 text-sm">Return on Investment</p>
                      <p class="text-2xl font-bold ${color}">${roi.toFixed(2)}%</p>
                  </div>
              `;
  }

  function drawSimulationChart(data) {
    if (simulationChart) {
      simulationChart.destroy();
    }
    simulationChart = new Chart(simChartCanvas, {
      type: "line",
      data: {
        labels: Array.from({ length: data.length }, (_, i) => i),
        datasets: [
          {
            label: "Bankroll Journey",
            data: data,
            borderColor: "rgba(13, 148, 136, 0.8)", // Phthalo Green / Teal-600
            backgroundColor: "rgba(13, 148, 136, 0.1)", // Phthalo Green / Teal-600
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.1,
            fill: true,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Number of Trades",
              color: "#9ca3af",
            },
            ticks: { color: "#9ca3af" },
          },
          y: {
            title: {
              display: true,
              text: "Bankroll (£)",
              color: "#9ca3af",
            },
            ticks: {
              color: "#9ca3af",
              callback: (value) => `£${value}`,
            },
          },
        },
        plugins: {
          legend: { labels: { color: "#d1d5db" } },
        },
      },
    });
  }

  // --- INITIALIZATION ---
  function initialize() {
    runSimBtn.addEventListener("click", runSimulation);
    runSimulation(); // Run once on load
  }

  initialize();
});
