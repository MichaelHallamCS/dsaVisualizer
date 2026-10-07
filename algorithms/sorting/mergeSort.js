export async function mergeSort(bars, delay, getIsSorting, getSpeed, highlight, arr, start = 0, end = bars.length - 1, depth = 0) {
    highlight(0);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(1);
    await delay(getSpeed());
    if (!getIsSorting()) return;
    if (start >= end) return;

    highlight(2);
    const mid = Math.floor((start + end) / 2);
    bars[mid].style.marginRight = `${Math.max(10, 48 - depth * 12)}px`;
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(3);
    await delay(getSpeed());
    if (!getIsSorting()) return;
    await mergeSort(bars, delay, getIsSorting, getSpeed, highlight, arr, start, mid, depth + 1);
    if (!getIsSorting()) return;

    highlight(4);
    await delay(getSpeed());
    if (!getIsSorting()) return;
    await mergeSort(bars, delay, getIsSorting, getSpeed, highlight, arr, mid + 1, end, depth + 1);
    if (!getIsSorting()) return;

    highlight(5);
    await delay(getSpeed());
    if (!getIsSorting()) return;
    await merge(bars, delay, getIsSorting, getSpeed, highlight, arr, start, mid, end);
    if (!getIsSorting()) return;

    if (start === 0 && end === bars.length - 1) {
        bars.forEach(b => b.style.backgroundColor = 'var(--success)');
        highlight(-1);
    }
}

async function merge(bars, delay, getIsSorting, getSpeed, highlight, arr, start, mid, end) {
    for (let x = start; x <= end; x++) bars[x].style.backgroundColor = 'var(--accent-color)';

    highlight(8);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(9);
    const left = arr.slice(start, mid + 1);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(10);
    const right = arr.slice(mid + 1, end + 1);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(11);
    let i = 0, j = 0, k = start;
    const merged = [];
    await delay(getSpeed());
    if (!getIsSorting()) return;

    while (true) {
        highlight(12);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        if (!(i < left.length && j < right.length)) break;

        highlight(13);
        const leftBar = bars[start + i];
        const rightBar = bars[mid + 1 + j];
        leftBar.style.backgroundColor = 'var(--danger)';
        rightBar.style.backgroundColor = 'var(--danger)';
        await delay(getSpeed());
        if (!getIsSorting()) return;

        if (left[i] <= right[j]) {
            highlight(14);
            merged.push(left[i]);
            await delay(getSpeed());
            if (!getIsSorting()) return;

            highlight(15);
            i++;
            await delay(getSpeed());
            if (!getIsSorting()) return;
        } else {
            highlight(16);
            await delay(getSpeed());
            if (!getIsSorting()) return;

            highlight(17);
            merged.push(right[j]);
            await delay(getSpeed());
            if (!getIsSorting()) return;

            highlight(18);
            j++;
            await delay(getSpeed());
            if (!getIsSorting()) return;
        }

        leftBar.style.backgroundColor = 'var(--accent-color)';
        rightBar.style.backgroundColor = 'var(--accent-color)';

        highlight(20);
        k++;
        await delay(getSpeed());
        if (!getIsSorting()) return;
    }

    while (true) {
        highlight(22);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        if (!(i < left.length)) break;

        highlight(23);
        merged.push(left[i]);
        await delay(getSpeed());
        if (!getIsSorting()) return;

        highlight(24);
        i++;
        await delay(getSpeed());
        if (!getIsSorting()) return;

        highlight(25);
        k++;
        await delay(getSpeed());
        if (!getIsSorting()) return;
    }

    while (true) {
        highlight(27);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        if (!(j < right.length)) break;

        highlight(28);
        merged.push(right[j]);
        await delay(getSpeed());
        if (!getIsSorting()) return;

        highlight(29);
        j++;
        await delay(getSpeed());
        if (!getIsSorting()) return;

        highlight(30);
        k++;
        await delay(getSpeed());
        if (!getIsSorting()) return;
    }

    for (let x = 0; x < merged.length; x++) {
        const bar = bars[start + x];
        bar.style.backgroundColor = 'var(--danger)';
        arr[start + x] = merged[x];
        setBar(bar, merged[x]);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        bar.style.backgroundColor = 'var(--accent-color)';
    }

    for (let x = start; x <= end; x++) bars[x].style.backgroundColor = 'var(--success)';
    await delay(getSpeed());
    if (!getIsSorting()) return;
    bars[mid].style.marginRight = '0px';
}

function setBar(bar, value) {
    bar.style.height = `${value}%`;
    bar.querySelector('span').innerText = value;
}
        

export const mergeInfo = {
    title: "Merge Sort",
    description: "Merge sort is a divide and conquer algorithm that recursively splits an array into halves until each subarray contains a single element. It then repeatedly merges these smaller subarrays back together in the correct order to produce a fully sorted array.",
    bigO: "Worst: O(nlogn) | Best: O(nlogn)",
    codeArr: [
        "function mergeSort(arr, start = 0, end = arr.length - 1) {",
        "  if (start >= end) return;",
        "  let mid = Math.floor((start + end) / 2);",
        "  mergeSort(arr, start, mid);",
        "  mergeSort(arr, mid + 1, end);",
        "  merge(arr, start, mid, end);",
        "}",
        "",
        "function merge(arr, start, mid, end) {",
        "  let left = arr.slice(start, mid + 1);",
        "  let right = arr.slice(mid + 1, end + 1);",
        "  let i = 0, j = 0, k = start;",
        "  while (i < left.length && j < right.length) {",
        "    if (left[i] <= right[j]) {",
        "      arr[k] = left[i];",
        "      i++;",
        "    } else {",
        "      arr[k] = right[j];",
        "      j++;",
        "    }",
        "    k++;",
        "  }",
        "  while (i < left.length) {",
        "    arr[k] = left[i];",
        "    i++;",
        "    k++;",
        "  }",
        "  while (j < right.length) {",
        "    arr[k] = right[j];",
        "    j++;",
        "    k++;",
        "  }",
        "}"
    ]
}