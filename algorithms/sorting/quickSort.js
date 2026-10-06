export async function quickSort (bars, delay, getIsSorting, getSpeed, highlight, arr, low = 0, high = bars.length - 1) {
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
        const pi = partition(arr, low, high);

        highlight(3);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        quickSort(arr, low, pi - 1);

        highlight(4);
        await delay(getSpeed());
        if (!getIsSorting()) return;
        quickSort(arr, pi + 1, high);
    }
}

async function partition(arr, low, high) {
    
}

export const quickInfo = {
    title: "Quick Sort",
    description: "Quick sort is a divide and conquer sorting algorithm that sorts an array by picking an element as a pivot and partitioning the remaining elements into two sub arrays based on whether they are smaller or larger than the pivot.",
    bigO: "Worst: O(n&sup2) | Best: (Onlogn)",
    codeArr: [
        "function quickSortInPlace(arr, low = 0, high = arr.length - 1) {",
        "  if (low < high) {",
        "      const pi = partition(arr, low, high);",
        "      quickSortInPlace(arr, low, pi - 1);",
        "      quickSortInPlace(arr, pi + 1, high);",
        "  }",
        "  return arr;",
        "}",
        "",
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