

export async function selectionSort(bars, delay, getIsSorting, getSpeed, highlight){
    for (let i = 0; i < bars.length - 1; i++){
        highlight(1);
        await delay(getSpeed());
        if (!getIsSorting()) return;

        let minIndex = i;
        highlight(2);
        bars[minIndex].style.backgroundColor = 'var(--warning)';
        await delay(getSpeed());
        if (!getIsSorting()) return;

        for (let j = i + 1; j < bars.length; j++){
            if (!getIsSorting()) return;

            highlight(3);
            bars[j].style.backgroundColor = 'var(--danger)';
            await delay(getSpeed());
            if (!getIsSorting()) return;


            highlight(4);
            await delay(getSpeed());
            if (!getIsSorting()) return;

            const currentVal = parseInt(bars[j].querySelector('span').innerText);
            const minVal = parseInt(bars[minIndex].querySelector('span').innerText);
            
            if (currentVal < minVal){
                if (!getIsSorting()) return;
                bars[minIndex].style.backgroundColor = 'var(--accent-color)';
                minIndex = j;
                highlight(5);
                bars[minIndex].style.backgroundColor = 'var(--warning)';
                await delay(getSpeed());
                if (!getIsSorting()) return;
            }

            if (j !== minIndex){
                bars[j].style.backgroundColor = 'var(--accent-color)';
            }
        }

        highlight(8);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        if (minIndex !== i){
            await delay(getSpeed());
            if (!getIsSorting()) return;
            [bars[i].style.height, bars[minIndex].style.height] = [bars[minIndex].style.height, bars[i].style.height];
            [bars[i].querySelector('span').innerText, bars[minIndex].querySelector('span').innerText] = [bars[minIndex].querySelector('span').innerText, bars[i].querySelector('span').innerText];
            highlight(9);
            bars[minIndex].style.backgroundColor = 'var(--accent-color)';
            await delay(getSpeed());
            if (!getIsSorting()) return;
        }
        bars[i].style.backgroundColor = 'var(--success)';
    }
    bars[bars.length - 1].style.backgroundColor = 'var(--success)';
    highlight(-1);
}



export const selectionInfo = {
    title: "Selection Sort",
    description: "Repeatedly searches for the minimum value in the unsorted section and moves it to its correct position at the beginning of the array.",
    bigO: "Worst: O(n&sup2;) | Best: O(n&sup2;)",
    codeArr: [
        "function selectionSort(arr) {",
        "  for (let i = 0; i < arr.length - 1; i++) {",
        "    let minIndex = i;",
        "    for (let j = i + 1; j < arr.length; j++) {",
        "      if (arr[j] < arr[minIndex]) {",
        "        minIndex = j;",
        "      }",
        "    }",
        "    if (minIndex !== i) {",
        "      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];",
        "    }",
        "  }",
        "}"
    ]
}