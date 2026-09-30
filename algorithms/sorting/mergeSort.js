

export async function mergeSort(bars, delay, getIsSorting, getSpeed, highlight){

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