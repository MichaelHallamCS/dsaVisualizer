import { bubbleSort, bubbleInfo } from './algorithms/sorting/bubbleSort.js';
import {selectionSort, selectionInfo} from './algorithms/sorting/selectionSort.js';
import {mergeSort, mergeInfo} from './algorithms/sorting/mergeSort.js';
import {quickSort, quickInfo} from './algorithms/sorting/quickSort.js';

const canvas = document.getElementById('visualizer-canvas');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const speedSlider = document.getElementById('speed-slider');
const codeRoot = document.getElementById('code-root');

let currentAlgo = null;
let isSorting = false;

const FIXED_ARRAY = [60, 25, 85, 45, 15, 95, 35, 70, 50, 10];

/**
 * Helper: Sleep function using Promises
 * @param {number} ms - milliseconds to sleep
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Renders the bar chart based on an array
 * @param {Array} arr - The data to visualize
 */
function generateBars(arr = FIXED_ARRAY) {
    canvas.innerHTML = '';
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
            
        generateBars();
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
        generateBars();
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
        generateBars();
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
        generateBars();
    }
    
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
            bars, sleep, ()=> isSorting, ()=> (1100 - speedSlider.value), highlightLine, [...FIXED_ARRAY]);
    } else if (currentAlgo === 'quick') {
        await quickSort(bars, sleep, ()=> isSorting, ()=> (1100 - speedSlider.value), highlightLine, [...FIXED_ARRAY]);
    }
    
    isSorting = false;
};

resetBtn.onclick = () => {
    isSorting = false;
    generateBars();
    highlightLine(-1);
};