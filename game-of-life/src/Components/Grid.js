import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';

function Grid() {
    const [numRows, setNumRows] = useState(30);
    const [numCols, setNumCols] = useState(30);

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
            let col = (x + i + numColsRef.current) % numColsRef.current;
            let row = (y + j + numRowsRef.current) % numRowsRef.current;
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
    const numRowsRef = useRef(numRows);
    numRowsRef.current = numRows;
    const numColsRef = useRef(numCols);
    numColsRef.current = numCols;
    const gridRef = useRef(grid);
    gridRef.current = grid;


    const runSimulation = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        // passing new generation as a function to clean up closure
        setGeneration(generation => generation + 1);
        setGrid(g => {
            return produce(g, gridCopy => {
                for (let i = 0; i < numRowsRef.current; i++) {
                    for (let j = 0; j < numColsRef.current; j++) {
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
    
    function handleSpeedChange(event) {
        setSpeed(parseInt(event.target.value));
    }

    useEffect( () => { 
        setGrid(fillWithRandom(make2DArray(numCols, numRows)));
        setGeneration(0);
    }, [numRows, numCols] );

    function handleSizeChange(event) {
        setNumRows(parseInt(event.target.value));
        setNumCols(parseInt(event.target.value));
        setGrid(fillWithRandom(make2DArray(numCols, numRows)));
        setGeneration(0);
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
            <label htmlFor="speed">Select speed:</label>
            <select name="speed" id="speed" value={speed} onChange={handleSpeedChange}>
                <option value = "1000">Very Slow</option>
                <option value = "500">Slow</option>
                <option value = "200">Normal</option>
                <option value = "50">Fast</option>
            </select>
            <label htmlFor="size">Select size:</label>
            <select name="size" id="size" onChange={handleSizeChange}>
                <option value = "10">10x10</option>
                <option value = "20">20x20</option>
                <option value = "30">30x30</option>
                <option value = "40">40x40</option>
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
                            const newGrid = produce(gridRef.current, gridCopy => {
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