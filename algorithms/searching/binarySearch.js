async function step(ctx, line) {
    ctx.highlight(line);
    await ctx.delay(ctx.getSpeed());
    return ctx.getIsSorting();
}

export async function binarySearch(bars, delay, getIsSorting, getSpeed, highlight, arr){
    throw new Error("Not implemented yet");
}

export const binaryInfo = {
    title: "Binary Search",
    description: "Binary Search is an efficient algorithm that repeatedly divides a sorted dataset in half, comparing the target value to the middle element to eliminate half of the remaining possibilities with each step.",
    bigO: "Worst: O(logn) | Best: O(1)",
    codeArr: [
        "function binarySearch(arr, target) {",
        "  let left = 0;",
        "  let right = arr.length - 1;",
        "  while (left <= right) {",
        "      const mid = (left + right) >> 1;",
        "      if (arr[mid] === target) {",
        "          return mid;",
        "      }",
        "      if (arr[mid] < target) {",
        "          left = mid + 1;",
        "      } else {",
        "          right = mid - 1;",
        "      }",
        "  }",
        "  return -1;",
        "}"
    ]
}