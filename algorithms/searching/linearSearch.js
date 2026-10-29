async function step(ctx, line) {
    ctx.highlight(line);
    await ctx.delay(ctx.getSpeed());
    return ctx.getIsSorting();
}

export async function linearSearch (bars, delay, getIsSorting, getSpeed, highlight, arr){
    let target = 70;
    bars[7].style.backgroundColor = 'var(--warning)';
    const ctx = {bars, delay, getIsSorting, getSpeed, highlight, arr};
    if (!await step(ctx, 0)) return;
    for (let i = 0; i < arr.length; i++){
        bars[i].style.backgroundColor = 'var(--danger)';
        if (!await step(ctx, 1)) return;
        if (!await step(ctx, 2)) return;
        if (arr[i] == target){
            bars[i].style.backgroundColor = 'var(--success)';
            if (!await step(ctx, 3)) return;
            highlight(-1);
            return;
        }
        bars[i].style.backgroundColor = 'var(--accent-color';
    }
    return -1;
}

export const linearInfo = {
    title: "Linear Search",
    description: "Linear Search is a straightforward algorithm that checks every element in a dataset sequentially, one by one, from start to finish until the target value is found or the list ends.",
    bigO: "Worst: O(n) | Best: O(1)",
    codeArr: [
        "function linearSearch(arr, target) {",
        "  for (let i = 0; i < arr.length; i++) {",
        "      if (arr[i] === target) {",
        "          return i;",
        "      }",
        "  }",
        "  return -1;",
        "}"
    ]
}