# Betting Exchange Profit Simulator

A web-based simulation tool for modeling the long-term performance of betting exchange trading strategies. This simulator helps traders visualize how their strategies might perform over time given specific parameters like win rates, average profits, and losses.

## Features

- **Monte Carlo Simulation**: Runs probabilistic simulations based on your trading parameters
- **Interactive Charts**: Real-time visualization of bankroll progression using Chart.js
- **Key Metrics**: Displays final bankroll, total profit/loss, and ROI
- **Responsive Design**: Works on desktop and mobile devices with Tailwind CSS styling

## Parameters

- **Initial Bankroll**: Starting capital amount (£)
- **Average Stake**: Typical bet size (£)
- **Win Rate**: Percentage of trades that are profitable (%)
- **Average Profit per Win**: Expected profit on winning trades (£)
- **Average Loss per Loss**: Expected loss on losing trades (£)
- **Number of Trades**: Total trades to simulate

## Getting Started

### Prerequisites

- Node.js (for development)
- A modern web browser

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd betting-exchange-profit-sim
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the local development URL (typically `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## How It Works

The simulator uses a simple Monte Carlo approach:

1. For each trade in the simulation, a random number determines if it's a win or loss based on your specified win rate
2. If it's a win, the average profit is added to the bankroll
3. If it's a loss, the average loss is subtracted from the bankroll
4. The progression is visualized in real-time on a chart

## Use Cases

- **Strategy Validation**: Test if your trading strategy is profitable over the long term
- **Risk Assessment**: Understand potential drawdowns and volatility
- **Parameter Optimization**: Experiment with different win rates and profit/loss ratios
- **Educational Tool**: Learn about the importance of positive expected value in trading

## Technical Stack

- **Vanilla JavaScript**: No frameworks, just modern ES6+ JavaScript
- **Chart.js**: For interactive charting and data visualization
- **Tailwind CSS**: For responsive, modern styling
- **Vite**: For fast development and building

## License

This project is private and not licensed for public use.