export async function quickSort () {

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