import React, { useState, useCallback, useRef, useEffect } from 'react';
import produce from 'immer';
import styled from 'styled-components';


function Grid() {
    const [numRows, setNumRows] = useState(30);
    const [numCols, setNumCols] = useState(30);

    const MainGrid = styled.div`
        display: grid;
        grid-template-columns: repeat(${numCols}, 7px);
        @media(min-width: 400px){
            grid-template-columns: repeat(${numCols}, 10px);
        }
        @media(min-width: 600px){
            grid-template-columns: repeat(${numCols}, 15px);
        }

    `

    const GridCell = styled.div`
        width: 7px; 
        height: 7px;
        border: solid 1px gray;
        cursor: pointer;
        @media(min-width: 400px){
            width: 10px; 
            height: 10px;
        }
        @media(min-width: 600px){
            width: 15px; 
            height: 15px;
        }
    `

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

    function fillWithPulsar(arr) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
              arr[i][j] = 0;
            }
        }
        let center = Math.floor(numCols/2);
        arr[center-3][center+7] = 1;
        arr[center+3][center+7] = 1;
        arr[center-3][center+6] = 1;
        arr[center+3][center+6] = 1;
        arr[center-3][center+5] = 1;
        arr[center+3][center+5] = 1;
        arr[center-2][center+5] = 1;
        arr[center+2][center+5] = 1;
        arr[center-7][center+3] = 1;
        arr[center+7][center+3] = 1;
        arr[center-6][center+3] = 1;
        arr[center+6][center+3] = 1;
        arr[center-5][center+3] = 1;
        arr[center+5][center+3] = 1;
        arr[center-2][center+3] = 1;
        arr[center+2][center+3] = 1;
        arr[center-1][center+3] = 1;
        arr[center+1][center+3] = 1;
        arr[center-5][center+2] = 1;
        arr[center+5][center+2] = 1;
        arr[center-3][center+2] = 1;
        arr[center+3][center+2] = 1;
        arr[center-1][center+2] = 1;
        arr[center+1][center+2] = 1;
        arr[center-3][center+1] = 1;
        arr[center+3][center+1] = 1;
        arr[center-2][center+1] = 1;
        arr[center+2][center+1] = 1;
        arr[center-3][center-1] = 1;
        arr[center+3][center-1] = 1;
        arr[center-2][center-1] = 1;
        arr[center+2][center-1] = 1;
        arr[center-5][center-2] = 1;
        arr[center+5][center-2] = 1;
        arr[center-3][center-2] = 1;
        arr[center+3][center-2] = 1;
        arr[center-1][center-2] = 1;
        arr[center+1][center-2] = 1;
        arr[center-7][center-3] = 1;
        arr[center+7][center-3] = 1;
        arr[center-6][center-3] = 1;
        arr[center+6][center-3] = 1;
        arr[center-5][center-3] = 1;
        arr[center+5][center-3] = 1;
        arr[center-2][center-3] = 1;
        arr[center+2][center-3] = 1;
        arr[center-1][center-3] = 1;
        arr[center+1][center-3] = 1;
        arr[center-3][center-5] = 1;
        arr[center+3][center-5] = 1;
        arr[center-2][center-5] = 1;
        arr[center+2][center-5] = 1;
        arr[center-3][center-6] = 1;
        arr[center+3][center-6] = 1;
        arr[center-3][center-7] = 1;
        arr[center+3][center-7] = 1;

        return arr;
    }

    function fillWithPentadecathlon(arr) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
              arr[i][j] = 0;
            }
        }
        let center = Math.floor(numCols/2);
        arr[center+5][center] = 1;
        arr[center+4][center] = 1;
        arr[center+3][center-1] = 1;
        arr[center+3][center+1] = 1;
        arr[center+2][center] = 1;
        arr[center+1][center] = 1;
        arr[center][center] = 1;
        arr[center-1][center] = 1;
        arr[center-2][center-1] = 1;
        arr[center-2][center+1] = 1;
        arr[center-3][center] = 1;
        arr[center-4][center] = 1;

        return arr;
    }

    function fillWithGlider(arr) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
              arr[i][j] = 0;
            }
        }
        let center = Math.floor(numCols/2);
        arr[center-1][center] = 1;
        arr[center][center+1] = 1;
        arr[center+1][center-1] = 1;
        arr[center+1][center] = 1;
        arr[center+1][center+1] = 1;

        return arr;
    }

    function fillWithLightweightSpaceship(arr) {
        for (let i = 0; i < arr[0].length; i++) {
            for (let j = 0; j < arr.length; j++) {
              arr[i][j] = 0;
            }
        }
        let center = Math.floor(numCols/2);
        arr[center+1][center+1] = 1;
        arr[center+1][center-2] = 1;
        arr[center][center+2] = 1;
        arr[center-1][center-2] = 1;
        arr[center-1][center+2] = 1;
        arr[center-2][center-1] = 1;
        arr[center-2][center] = 1;
        arr[center-2][center+1] = 1;
        arr[center-2][center+2] = 1;


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
    const [color, setColor] =useState("black");

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

    // cleaning up closure for size change
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

    function handleColorChange(event) {
        setColor(event.target.value);
        console.log(color);
    }

    return(
        <div className="gameContainer">
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
            

            <div className="grid-container">
                <MainGrid>
                    {grid.map((rows, i) =>
                        rows.map((col, j) => <GridCell 
                        key={`${i}-${j}`}
                        onClick={() => {
                            if (!running) {
                                const newGrid = produce(gridRef.current, gridCopy => {
                                    gridCopy[i][j] = gridCopy[i][j] ? 0 : 1;
                                })
                                setGrid(newGrid);
                            }
                        }}
                        className="gridCell"
                        style={{ 
                            backgroundColor: grid[i][j] ? color : 'white'
                        }}/>
                    ))}
                </MainGrid>

                <p className="generation">Generation: {generation}</p>


                <p className="smallHeader">Try some famous shapes:</p>
                <div className="shapesButtons">
                    { numRows === 10 ? (
                        <>
                        <p style={{color: 'darkred'}}>To see Pulsar and Pentadecathlon select a bigger grid</p>
                        <p style={{color: 'darkred'}}>You still can watch Glider and Lightweight Spaceship</p>
                        </>
                    ) : null }
                    <button
                        id="pulsarButton"
                        onClick={() => {
                            if (!running && numRows > 10) {
                                setGrid(fillWithPulsar(make2DArray(numCols, numRows)));
                                setGeneration(0);
                            } 
                        }}
                    >Pulsar (period 3)</button>
                    <button
                        onClick={() => {
                            if (!running && numRows > 10) {
                                setGrid(fillWithPentadecathlon(make2DArray(numCols, numRows)));
                                setGeneration(0);
                            }
                        }}
                    >Pentadecathlon (period 15)</button>
                    <button
                        onClick={() => {
                            if (!running) {
                                setGrid(fillWithGlider(make2DArray(numCols, numRows)));
                                setGeneration(0);
                            }
                        }}
                    >Glider</button>
                    <button
                        onClick={() => {
                            if (!running) {
                                setGrid(fillWithLightweightSpaceship(make2DArray(numCols, numRows)));
                                setGeneration(0);
                            }
                        }}
                    >Lightweight spaceship (LWSS)</button>
                </div>

                <div className="settings">
                    <p className="smallHeader">Settings:</p>
                    <label htmlFor="speed">Select speed:
                    <select name="speed" id="speed" value={speed} onChange={handleSpeedChange}>
                        <option value = "1000">Very Slow</option>
                        <option value = "500">Slow</option>
                        <option value = "200">Normal</option>
                        <option value = "50">Fast</option>
                    </select></label>
                    <label htmlFor="size">Select size:&nbsp;
                    <select name="size" id="size" value={numCols} onChange={handleSizeChange}>
                        <option value = "10">10x10</option>
                        <option value = "20">20x20</option>
                        <option value = "30">30x30</option>
                        <option value = "40">40x40</option>
                    </select></label>
                    <label htmlFor="color">Select color:
                    <select name="color" id="color" value={color} onChange={handleColorChange}>
                        <option value = "black" style={{color: 'black'}}>black</option>
                        <option value = "red" style={{color: 'red'}}>red</option>
                        <option value = "Chartreuse" style={{color: '#1c8a23'}}>green</option>
                        <option value = "DarkBlue" style={{color: 'DarkBlue'}}>blue</option>
                        <option value = "orange" style={{color: '#b35900'}}>orange</option>
                        <option value = "DeepPink" style={{color: 'DeepPink'}}>pink</option>
                        <option value = "Yellow" style={{color: '#999900'}}>yellow</option>
                        <option value = "Purple" style={{color: 'Purple'}}>purple</option>
                        <option value = "DarkRed" style={{color: 'DarkRed'}}>dark red</option>
                    </select></label>
                </div>
            </div>

            
        </div>
    )
}

export default Grid;