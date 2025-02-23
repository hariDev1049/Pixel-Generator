import { useState } from "react";

export default function PixelGenerator() {
    const [rows, setRows] = useState(0);
    const [cols, setCols] = useState(0);
    const [hover, setHover] = useState(false);
    const [showGrid, setShowGrid] = useState(false);

    const createGrid = () => Array(rows).fill(null).map(() => Array(cols).fill("#fff"));
    const [grid, setGrid] = useState(createGrid());

    const handleSizeChange = (row, col) => {
        setRows(row);
        setCols(col);
        setGrid(createGrid());
    }

    const handleCreateGrid = () => {
        setShowGrid(true);

    }

  return (
    <div className={` w-3/4 h-1/2 flex flex-col bg-green-950 text-sky-50 p-10 rounded drop-shadow-2xl`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <label className="flex justify-between mb-3"><span>Select Rows :</span><span>{rows}</span> </label>
      <input type="range" min={0} max={30} value={rows} onChange={(e) => handleSizeChange(Number(e.target.value), cols)} className="accent-yellow-50"/>
      <label className="flex justify-between my-3"><span>Select Columns :</span><span>{cols}</span> </label>
      <input type="range" min={0} max={30} value={cols} onChange={(e) => handleSizeChange(rows, Number(e.target.value))} className="accent-yellow-50"/>
      <div>
      <button className="my-6 p-2 bg-yellow-50 text-green-950 rounded" onClick={handleCreateGrid}>Generate Grid</button>  

      </div> 
      {showGrid ? (<div
        className="grid border border-gray-300"
        style={{
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((color, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="border border-gray-300 cursor-pointer"
              style={{
                backgroundColor: color,
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
              }}
              onClick={() => handlePixelClick(rowIndex, colIndex)}
            />
          ))
        )}
      </div>) : <>No grid</>}
    
    </div>
  );
}
