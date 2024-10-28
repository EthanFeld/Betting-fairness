function updateLabel(id, value) {
    document.getElementById(id + "Label").textContent = value + "%";
}

function runSimulation() {
    const x = parseFloat(document.getElementById("x").value) / 100;
    const v = parseFloat(document.getElementById("v").value) / 100;
    const rounds = parseInt(document.getElementById("rounds").value);

    const xProb = Math.max(0, Math.min(1, x - v));
    const yProb = Math.max(0, Math.min(1, (1 - x - v)));

    let amount = 10;
    const amounts = [amount];

    for (let i = 0; i < rounds; i++) {
        const bet = amount * 0.1;
        const randomValue = Math.random();

        if (randomValue < xProb) {
            amount += bet;
        } else if (randomValue < xProb + yProb) {
            amount += bet;
        } else {
            amount -= bet;
        }

        amounts.push(amount);

        if (amount <= 0) {
            break;
        }
    }

    drawChart(amounts);
    document.getElementById("finalAmount").textContent = `Final Amount: ${amounts[amounts.length - 1].toFixed(2)} units`;
}

function drawChart(amounts) {
    const ctx = document.getElementById("simulationChart").getContext("2d");
    if (window.simulationChart) {
        window.simulationChart.destroy();
    }

    window.simulationChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: amounts.map((_, index) => index),
            datasets: [{
                label: 'Total Amount',
                data: amounts,
                borderColor: 'blue',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Round'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Total Amount'
                    }
                }
            }
        }
    });
}
