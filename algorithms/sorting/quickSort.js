export async function quickSort(bars, delay, getIsSorting, getSpeed, highlight, arr, low = 0, high = arr.length - 1, sorted = new Set()) {
    highlight(0);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(1);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    if (low < high) {
        highlight(2);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        const pi = await partition(bars, delay, getIsSorting, getSpeed, highlight, arr, low, high, sorted);
        if (pi === undefined || !getIsSorting()) return;

        highlight(3);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        await quickSort(bars, delay, getIsSorting, getSpeed, highlight, arr, low, pi - 1, sorted);
        if (!getIsSorting()) return;

        highlight(4);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        await quickSort(bars, delay, getIsSorting, getSpeed, highlight, arr, pi + 1, high, sorted);
        if (!getIsSorting()) return;
    } else if (low === high) {
        sorted.add(low);
        bars[low].style.backgroundColor = 'var(--success)';
    }

    highlight(6);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(-1);
}

async function partition(bars, delay, getIsSorting, getSpeed, highlight, arr, low, high, sorted) {
    highlight(8);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(9);
    const pivot = arr[high];
    for (let k = low; k <= high; k++) {
        bars[k].style.backgroundColor = 'var(--accent-color)';
    }
    bars[high].style.backgroundColor = 'var(--pivot)';
    await delay(getSpeed());
    if (!getIsSorting()) return;

    highlight(10);
    let i = low - 1;
    await delay(getSpeed());
    if (!getIsSorting()) return;

    for (let j = low; j < high; j++) {
        highlight(11);
        bars[j].style.backgroundColor = 'var(--pointer-j)';
        await delay(getSpeed());
        if (!getIsSorting()) return;

        highlight(12);
        await delay(getSpeed());
        if (!getIsSorting()) return;

        if (arr[j] <= pivot) {
            if (i >= low) bars[i].style.backgroundColor = 'var(--accent-color)';
            i++;
            highlight(13);
            if (i !== j) bars[i].style.backgroundColor = 'var(--pointer-i)';
            await delay(getSpeed());
            if (!getIsSorting()) return;

            highlight(14);
            bars[i].style.backgroundColor = 'var(--danger)';
            bars[j].style.backgroundColor = 'var(--danger)';
            [bars[j].style.height, bars[i].style.height] = [bars[i].style.height, bars[j].style.height];
            [bars[j].querySelector('span').innerText, bars[i].querySelector('span').innerText] = [bars[i].querySelector('span').innerText, bars[j].querySelector('span').innerText];
            [arr[j], arr[i]] = [arr[i], arr[j]];
            await delay(getSpeed());
            if (!getIsSorting()) return;
        }

        bars[j].style.backgroundColor = 'var(--accent-color)';
        if (i >= low) bars[i].style.backgroundColor = 'var(--pointer-i)';
    }

    highlight(17);
    bars[i + 1].style.backgroundColor = 'var(--danger)';
    bars[high].style.backgroundColor = 'var(--danger)';
    [bars[i + 1].style.height, bars[high].style.height] = [bars[high].style.height, bars[i + 1].style.height];
    [bars[i + 1].querySelector('span').innerText, bars[high].querySelector('span').innerText] = [bars[high].querySelector('span').innerText, bars[i + 1].querySelector('span').innerText];
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    await delay(getSpeed());
    if (!getIsSorting()) return;

    for (let k = low; k <= high; k++) {
        bars[k].style.backgroundColor = 'var(--accent-color)';
    }
    sorted.add(i + 1);
    bars[i + 1].style.backgroundColor = 'var(--success)';

    highlight(18);
    await delay(getSpeed());
    if (!getIsSorting()) return;

    return i + 1;
}

export const quickInfo = {
    title: "Quick Sort",
    description: "Quick sort is a divide and conquer sorting algorithm that sorts an array by picking an element as a pivot and partitioning the remaining elements into two sub arrays based on whether they are smaller or larger than the pivot.",
    bigO: "Worst: O(n&sup2;) | Best: O(nlogn)",
    codeArr: [
        "function quickSortInPlace(arr, low = 0, high = arr.length - 1) {",
        "  if (low < high) {",
        "      const pi = partition(arr, low, high);",
        "      quickSortInPlace(arr, low, pi - 1);",
        "      quickSortInPlace(arr, pi + 1, high);",
        "  }",
        "  return arr;",
        "}",
        "function partition(arr, low, high) {",
        "  const pivot = arr[high];",
        "  let i = low - 1;",
        "  for (let j = low; j < high; j++) {",
        "      if (arr[j] <= pivot) {",
        "          i++;",
        "          [arr[i], arr[j]] = [arr[j], arr[i]];",
        "      }",
        "  }",
        "  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];",
        "  return i + 1;",
        "}"
    ]
}

