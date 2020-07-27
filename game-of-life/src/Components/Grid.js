import React, { useState } from 'react';

function Grid() {
    let numRows = 30;
    let numCols = 30;

    const [grid, setGrid] = useState(() => {
        const rows = [];
        for (let i = 0; i < numRows; i++) {
            rows.push(Array.from(Array(numCols), () => Math.floor(Math.random() + 0.5)))
        }

        return rows;
    })

    // function make2DArray(cols, rows) {
    //     let arr = new Array(cols);
    //     for (let i = 0; i < arr.length; i++) {
    //       arr[i] = new Array(rows);
    //     }
    //     for (let i = 0; i < cols; i++) {
    //         for (let j = 0; j < rows; j++) {
    //           arr[i][j] = Math.floor(Math.random() + 0.5);
    //         }
    //     }
    //     return arr;
    // }
    
    // let grid = make2DArray(numCols, numRows);
    console.log(grid);

    return(
        <>
            <p>My Grid will be here</p>
            <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${numCols}, 15px)`
            }}>
                {grid.map((rows, i) =>
                    rows.map((col, j) => <div 
                    key={`${i}-${j}`}
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