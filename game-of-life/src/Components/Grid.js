import React, { useState, useCallback, useRef } from 'react';
import produce from 'immer';

function Grid() {
    let numRows = 30;
    let numCols = 30;

    function make2DArray(cols, rows) {
        let arr = new Array(cols);
        for (let i = 0; i < arr.length; i++) {
          arr[i] = new Array(rows);
        }
        return arr;
    }

    function fillWithRandom(arr) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
              arr[i][j] = Math.floor(Math.random() + 0.5);
            }
        }
        return arr;
    }

    function fillWithEmpty(arr) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
              arr[i][j] = 0;
            }
        }
        return arr;
    }

    function countNeighbors(grid, x, y) {
        let sum = 0;
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {
            // wrap around to the far side
            let col = (x + i + numCols) % numCols;
            let row = (y + j + numRows) % numRows;
            sum += grid[col][row];
          }
        }
        sum -= grid[x][y];
        return sum;
    }
    
    let firstGrid = fillWithRandom(make2DArray(numCols, numRows));

    const [grid, setGrid] = useState(firstGrid);
    const [running, setRunning] = useState(false);
    const [generation, setGeneration] = useState(0);
    const [speed, setSpeed] = useState(200);
    
    const runningRef = useRef();
    runningRef.current = running;
    const speedRef = useRef(speed);
    speedRef.current = speed;


    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        // passing new generation as a function to clean up closure
        setGeneration(generation => generation + 1);
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRows; i++) {
                    for (let j = 0; j < numCols; j++) {
                        let state = g[i][j];
                        let neighbors = countNeighbors(g, i, j);

                        if (state === 0 && neighbors === 3) {
                            gridCopy[i][j] = 1;
                        } else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                            gridCopy[i][j] = 0;
                        } else {
                            gridCopy[i][j] = state;
                        }
                    }
                }
            })
        })
        setTimeout(runSimulation, speedRef.current);
    }, []);
    
    function handleChange(event) {
        console.log(parseInt(event.target.value));
        setSpeed(parseInt(event.target.value));
    }

    return(
        <>
            <p>Generation: {generation}</p>
            <button
                onClick={() => {
                    setRunning(!running);
                    runningRef.current = true;
                    runSimulation();
                }}>
                {running ? "stop" : "start"}
            </button>
            <button
                onClick={() => {
                    if (!running) {
                        setGrid(fillWithEmpty(make2DArray(numCols, numRows)));
                        setGeneration(0);
                    }
                }}
            >clear</button>
            <button
                onClick={() => {
                    if (!running) {
                        setGrid(fillWithRandom(make2DArray(numCols, numRows)));
                        setGeneration(0);
                    }
                }}
            >random</button>
            <label for="speed">Choose a speed:</label>
            <select name="speed" id="speed" value={speed} onChange={handleChange}>
                <option value = "1000">Very Slow</option>
                <option value = "500">Slow</option>
                <option value = "200">Normal</option>
                <option value = "50">Fast</option>
            </select>
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 15px)`
            }}>
                {grid.map((rows, i) =>
                    rows.map((col, j) => <div 
                    key={`${i}-${j}`}
                    onClick={() => {
                        if (!running) {
                            const newGrid = produce(grid, gridCopy => {
                                gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
                            })
                            setGrid(newGrid);
                        }
                    }}
                    style={{ 
                        width: 15, 
                        height: 15,
                        backgroundColor: grid[i][j] ? 'black' : 'white',
                        border: 'solid 1px black'
                    }}/>
                ))}
            </div>
        </>
    )
}

export default Grid;