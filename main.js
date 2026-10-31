import { bubbleSort, bubbleInfo } from './algorithms/sorting/bubbleSort.js';
import {selectionSort, selectionInfo} from './algorithms/sorting/selectionSort.js';
import {mergeSort, mergeInfo} from './algorithms/sorting/mergeSort.js';
import {quickSort, quickInfo} from './algorithms/sorting/quickSort.js';
import {heapSort, heapInfo} from './algorithms/sorting/heapSort.js';
import {linearSearch, linearInfo} from './algorithms/searching/linearSearch.js';
import {binarySearch, binaryInfo} from './algorithms/searching/binarySearch.js';

const canvas = document.getElementById('visualizer-canvas');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const speedSlider = document.getElementById('speed-slider');
const codeRoot = document.getElementById('code-root');
const keyElement = document.getElementById('key')

let currentAlgo = null;
let isSorting = false;

const SORTING_ARRAY = [60, 25, 85, 45, 15, 95, 35, 70, 50, 10];
const SEARCHING_ARRAY = [12, 18, 25, 34, 42, 49, 55, 63, 71, 78, 84, 89, 93, 97, 100];
const SORTING_ALGS = ['bubble', 'selection', 'merge', 'quick', 'heap-sort'];
const SEARCHING_ALGS = ['linear', 'binary', 'bfs', 'dfs', 'dijkstra'];
const DATA_STRUCTURES = ['array', 'linked-list', 'stack', 'queue', 'hashmap', 'heap', 'bst']
const keys = {
    quick: [
        {color: 'var(--accent-color)', label: 'Unsorted' },
        { color: 'var(--pivot)',        label: 'Pivot' },
        { color: 'var(--pointer-i)',    label: 'i' },
        { color: 'var(--pointer-j)',    label: 'j' },
        { color: 'var(--danger)',       label: 'Comparing / Swapping' },
        { color: 'var(--success)',      label: 'Sorted' }
    ], 
    bubble: [
        { color: 'var(--accent-color)', label: 'Unsorted' },
        { color: 'var(--danger)',       label: 'Comparing / Swapping' },
        { color: 'var(--success)',      label: 'Sorted' }
    ],
    selection: [
        { color: 'var(--accent-color)', label: 'Unsorted' },
        { color: 'var(--warning)',      label: 'Current Min' },
        { color: 'var(--danger)',       label: 'Comparing / Swapping' },
        { color: 'var(--success)',      label: 'Sorted' }
    ],
    merge: [
    { color: 'var(--accent-color)', label: 'Unsorted' },
    { color: 'var(--merge-left)',   label: 'Left Half' },
    { color: 'var(--merge-right)',  label: 'Right Half' },
    { color: 'var(--danger)',       label: 'Comparing / Swapping' },
    { color: 'var(--success)',      label: 'Sorted' }
    ],
    'heap-sort': [
    { color: 'var(--accent-color)', label: 'In Heap' },
    { color: 'var(--pivot)',        label: 'Current Root' },
    { color: 'var(--pointer-j)',    label: 'Compared Child' },
    { color: 'var(--warning)',      label: 'Current Largest' },
    { color: 'var(--danger)',       label: 'Swapping' },
    { color: 'var(--success)',      label: 'Sorted' }
    ],
    linear: [
    { color: 'var(--accent-color)', label: 'Default' },
    { color: 'var(--danger)',       label: 'Checking' },
    { color: 'var(--warning)',      label: 'Target' },
    {color: 'var(--success)',       label: 'Found'}
    ],
    binary: [
    { color: 'var(--accent-color)', label: 'Default' },
    { color: 'var(--text-dim)',     label: 'Discarded' },
    { color: 'var(--merge-left)',   label: 'Left' },
    { color: 'var(--pivot)',        label: 'Mid' },
    { color: 'var(--merge-right)',  label: 'Right' },
    { color: 'var(--warning)',      label: 'Target' },
    {color: 'var(--success)',       label: 'Found'}
    ]
}

function renderKey(algoId) {
    keyElement.innerHTML = (keys[algoId] || [])
    .map(({color, label}) => `
            <div class="key-item">
                <span class="key-swatch" style="background-color: ${color}"></span>${label}
            </div>`)
        .join('');
}

/**
 * Helper: Sleep function using Promises
 * @param {number} ms - milliseconds to sleep
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Renders the bar chart based on an array
 * @param {Array} arr - The data to visualize
 */
function generateBars(arr) {
    canvas.innerHTML = '';
    canvas.style.padding = '2rem 2rem 0px 2rem';
    arr.forEach(value => {
        const bar = document.createElement('div');
        bar.style.height = `${value}%`;
        bar.style.width = '35px';
        bar.style.backgroundColor = 'var(--accent-color)';
        bar.classList.add('bar');
        
        const label = document.createElement('span');
        label.innerText = value;
        
        bar.appendChild(label);
        canvas.appendChild(bar);
    });
}

function generateTree(arr) {
    canvas.innerHTML = '';

    const n = arr.length;
    const levels = Math.floor(Math.log2(n)) + 1;
    const W = 600, R = 20, LEVEL_GAP = 70, PAD = 12;
    const H = PAD * 2 + R * 2 + (levels - 1) * LEVEL_GAP + 14;

    const pos = (i) => {
        const level = Math.floor(Math.log2(i + 1));
        const slot = i - (2 ** level - 1);
        return {
            x: ((slot + 0.5) / 2 ** level) * W,
            y: PAD + R + level * LEVEL_GAP
        };
    };

    const tree = document.createElement('div');
    tree.classList.add('heap-tree');
    tree.style.cssText = `position: relative; width: ${W}px; height: ${H}px; max-width: 100%;`;

    for (let i = 1; i < n; i++) {
        const p = pos(Math.floor((i - 1) / 2));
        const c = pos(i);
        const dx = c.x - p.x;
        const dy = c.y - p.y;
        const length = Math.hypot(dx, dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        const edge = document.createElement('div');
        edge.classList.add('tree-edge');
        edge.dataset.child = i;
        edge.style.cssText = `
            position: absolute;
            left: ${p.x}px; top: ${p.y - 1}px;
            width: ${length}px; height: 2px;
            background-color: var(--text-dim);
            transform-origin: 0 50%;
            transform: rotate(${angle}deg);
        `;
        tree.appendChild(edge);
    }

    arr.forEach((value, i) => {
        const { x, y } = pos(i);

        const node = document.createElement('div');
        node.classList.add('tree-node');
        node.dataset.index = i;
        node.style.cssText = `
            position: absolute;
            left: ${x - R}px; top: ${y - R}px;
            width: ${R * 2}px; height: ${R * 2}px;
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            background-color: var(--accent-color);
            color: #fff; font-weight: bold;
            transition: background-color 0.2s;
        `;

        const val = document.createElement('span');
        val.classList.add('node-value');
        val.textContent = value;

        const idx = document.createElement('div');
        idx.textContent = i;
        idx.style.cssText = `
            position: absolute; top: ${R * 2 + 2}px; left: 0; width: 100%;
            text-align: center; font-size: 11px; font-weight: normal;
            color: var(--text-dim);
        `;

        node.append(val, idx);
        tree.appendChild(node);
    });

    const row = document.createElement('div');
    row.classList.add('heap-array');
    row.style.cssText = 'display: flex; gap: 6px; margin-top: 16px;';

    arr.forEach((value, i) => {
        const cell = document.createElement('div');
        cell.classList.add('heap-cell');
        cell.dataset.index = i;
        cell.style.cssText = `
            width: 40px; padding: 6px 0; text-align: center; border-radius: 6px;
            background-color: var(--accent-color); color: #fff; font-weight: bold;
            transition: background-color 0.2s;
        `;

        const val = document.createElement('span');
        val.classList.add('cell-value');
        val.textContent = value;

        const idx = document.createElement('div');
        idx.textContent = i;
        idx.style.cssText = 'font-size: 10px; font-weight: normal; opacity: 0.7;';

        cell.append(val, idx);
        row.appendChild(cell);
    });

    const wrapper = document.createElement('div');
    wrapper.classList.add('heap-view');
    wrapper.style.cssText = 'display: flex; flex-direction: column; align-items: center; width: 100%;';
    wrapper.append(tree, row);
    canvas.appendChild(wrapper);
}

/**
 * Manages the visual highlighting of the pseudocode lines
 * @param {number} lineIndex - The index of the code array to highlight
 */
function highlightLine(lineIndex) {
    const lines = document.querySelectorAll('.code-line');
    lines.forEach((line, idx) => {
        if (idx === lineIndex) {
            line.style.backgroundColor = "#334155";
            line.style.color = "#60a5fa";
            line.style.borderLeft = "3px solid #60a5fa";
        } else {
            line.style.backgroundColor = "transparent";
            line.style.color = "var(--text-dim)";
            line.style.borderLeft = "3px solid transparent";
        }
    });
}


window.selectAlgo = (algoId) => {
    isSorting = false;
    
    if (algoId === 'bubble') {
        currentAlgo = 'bubble';
        document.getElementById('algo-title').innerText = bubbleInfo.title;
        
        document.querySelector('.content-info').innerHTML = `
            <p>${bubbleInfo.description}</p>
            <p style="margin-top: 10px; color: var(--accent-color); font-weight: bold;">
                Complexity: ${bubbleInfo.bigO}
            </p>
        `;
        
        codeRoot.innerHTML = bubbleInfo.codeArr
            .map(line => `<div class="code-line">${line}</div>`)
            .join('');
            
        generateBars(SORTING_ARRAY);
    } else if (algoId === 'selection'){
        currentAlgo = 'selection';
        document.getElementById('algo-title').innerText = selectionInfo.title;
        document.querySelector('.content-info').innerHTML = `
            <p>${selectionInfo.description}</p>
            <p style="margin-top: 10px; color: var(--accent-color); font-weight: bold;">
                Complexity: ${selectionInfo.bigO}
            </p>
        `;
        codeRoot.innerHTML = selectionInfo.codeArr
            .map(line => `<div class="code-line">${line}</div>`)
            .join('');
        generateBars(SORTING_ARRAY);
    } else if (algoId === 'merge'){
        currentAlgo = 'merge';
        document.getElementById('algo-title').innerText = mergeInfo.title;
        document.querySelector('.content-info').innerHTML = `
        <p>${mergeInfo.description}</p>
            <p style="margin-top: 10px; color: var(--accent-color); font-weight: bold;">
                Complexity: ${mergeInfo.bigO}
            </p>
        `;
        codeRoot.innerHTML = mergeInfo.codeArr
        .map(line => `<div class = "code-line">${line}</div>`)
        .join('');
        generateBars(SORTING_ARRAY);
    } else if (algoId === 'quick'){
        currentAlgo = 'quick';
        document.getElementById('algo-title').innerText = quickInfo.title;
        document.querySelector('.content-info').innerHTML = `
        <p>${quickInfo.description}</p>
            <p style="margin-top: 10px; color: var(--accent-color); font-weight: bold;">
                Complexity: ${quickInfo.bigO}
            </p>
        `;
        codeRoot.innerHTML = quickInfo.codeArr
        .map(line => `<div class = "code-line">${line}</div>`)
        .join('');
        generateBars(SORTING_ARRAY);
    } else if (algoId === 'heap-sort'){
        currentAlgo = 'heap-sort';
        document.getElementById('algo-title').innerText = heapInfo.title;
        document.querySelector('.content-info').innerHTML = `
        <p>${heapInfo.description}</p>
            <p style="margin-top: 10px; color: var(--accent-color); font-weight: bold;">
                Complexity: ${heapInfo.bigO}
            </p>
        `;
        codeRoot.innerHTML = heapInfo.codeArr
        .map(line => `<div class = "code-line">${line}</div>`)
        .join('');
        generateTree(SORTING_ARRAY)
    } else if (algoId === 'linear'){
        currentAlgo = 'linear';
        document.getElementById('algo-title').innerText = linearInfo.title;
        document.querySelector('.content-info').innerHTML = `
        <p>${linearInfo.description}</p>
           <p style="margin-top: 10px; color: var(--accent-color); font-weight: bold;">
                Complexity: ${linearInfo.bigO}
            </p>
        `;
        codeRoot.innerHTML = linearInfo.codeArr
        .map(line => `<div class = "code-line">${line}</div>`)
        .join('');
        generateBars(SEARCHING_ARRAY);
    } else if (algoId === 'binary'){
        currentAlgo = 'binary';
        document.getElementById('algo-title').innerText = binaryInfo.title;
        document.querySelector('.content-info').innerHTML = `
        <p>${binaryInfo.description}</p>
           <p style="margin-top: 10px; color: var(--accent-color); font-weight: bold;">
                Complexity: ${binaryInfo.bigO}
            </p>
        `;
        codeRoot.innerHTML = binaryInfo.codeArr
        .map(line => `<div class = "code-line">${line}</div>`)
        .join('');
        generateBars(SEARCHING_ARRAY);
    }
    
    renderKey(algoId);
};


startBtn.onclick = async () => {
    if (isSorting || !currentAlgo) return;
    
    isSorting = true;
    
    const bars = document.querySelectorAll('.bar');
    
    if (currentAlgo === 'bubble') {
        await bubbleSort(
            bars, 
            sleep, 
            () => isSorting, 
            () => (1100 - speedSlider.value),  
            highlightLine
        );
    } else if (currentAlgo === 'selection') {
        await selectionSort(
            bars,
            sleep,
            () => isSorting,
            () => (1100 - speedSlider.value),
            highlightLine
        );
    } else if (currentAlgo === 'merge') {
        await mergeSort(
            bars, sleep, ()=> isSorting, ()=> (1100 - speedSlider.value), highlightLine, [...SORTING_ARRAY]);
    } else if (currentAlgo === 'quick') {
        await quickSort(bars, sleep, ()=> isSorting, ()=> (1100 - speedSlider.value), highlightLine, [...SORTING_ARRAY]);
    } else if (currentAlgo === 'heap-sort') {
        const nodes = document.querySelectorAll('.tree-node');
        const cells = document.querySelectorAll('.heap-cell');
        await heapSort(nodes, cells, sleep, () => isSorting, () => (1100 - speedSlider.value), highlightLine, [...SORTING_ARRAY])
    }
    else if (currentAlgo === 'linear'){
        await linearSearch(bars, sleep, ()=> isSorting, ()=> (1100 - speedSlider.value), highlightLine, [...SEARCHING_ARRAY]);
    }
    else if (currentAlgo === 'binary'){
        await binarySearch(bars, sleep, ()=> isSorting, ()=> (1100 - speedSlider.value), highlightLine, [...SEARCHING_ARRAY]);
    }
    
    isSorting = false;
};

resetBtn.onclick = () => {
    isSorting = false;
    if (SORTING_ALGS.includes(currentAlgo)){
        currentAlgo === 'heap-sort' ? generateTree(SORTING_ARRAY): generateBars(SORTING_ARRAY);
    } 
    else if (SEARCHING_ALGS.includes(currentAlgo)){
        generateBars(SEARCHING_ARRAY);
    }
    highlightLine(-1);
};