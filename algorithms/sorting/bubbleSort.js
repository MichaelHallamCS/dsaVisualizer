/**
 * Bubble Sort Algorithm Implementation for Visualizer
 * 
 * @param {HTMLCollection} bars - The DOM elements representing the bars
 * @param {Function} delay - Sleep function (ms)
 * @param {Function} getIsSorting - Getter to check if execution should stop
 * @param {Function} getSpeed - Getter to retrieve current slider delay
 * @param {Function} getIsPaused - Getter to check if execution is suspended
 * @param {Function} highlight - Function to highlight the specific line of code
 */
export async function bubbleSort(bars, delay, getIsSorting, getSpeed, getIsPaused, highlight) {
    for (let i = 0; i < bars.length; i++) {
        highlight(1); 
        await delay(getSpeed());

        for (let j = 0; j < bars.length - i - 1; j++) {
            if (!getIsSorting()) return;

            highlight(2); 
            await delay(getSpeed()); 

            bars[j].style.backgroundColor = 'var(--danger)';
            bars[j + 1].style.backgroundColor = 'var(--danger)';

            const val1 = parseInt(bars[j].querySelector('span').innerText);
            const val2 = parseInt(bars[j + 1].querySelector('span').innerText);

            while (getIsPaused()) {
                await delay(100);
                if (!getIsSorting()) return; 
            }

            highlight(3); 
            await delay(getSpeed());

            if (val1 > val2) {
                highlight(4); 
                
                bars[j].style.height = `${val2}%`;
                bars[j + 1].style.height = `${val1}%`;
                bars[j].querySelector('span').innerText = val2;
                bars[j + 1].querySelector('span').innerText = val1;
                
                await delay(getSpeed());
            }

            bars[j].style.backgroundColor = 'var(--accent-color)';
            bars[j + 1].style.backgroundColor = 'var(--accent-color)';
        }
        
        bars[bars.length - i - 1].style.backgroundColor = 'var(--success)';
    }
    highlight(-1); 
}


export const bubbleInfo = {
    title: "Bubble Sort",
    description: "A comparison based algorithm that repeatedly swaps adjacent elements if they are in the incorrect order. The largest values gradually bubble to the end of the list.",
    bigO: "Worst: O(n&sup2;) | Best: O(n)",
    codeArr: [
        "function bubbleSort(arr) {",
        "  for (let i = 0; i < arr.length; i++) {",
        "    for (let j = 0; j < arr.length-i-1; j++) {",
        "      if (arr[j] > arr[j+1]) {",
        "        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];",
        "      }",
        "    }",
        "  }",
        "}"
    ]
};