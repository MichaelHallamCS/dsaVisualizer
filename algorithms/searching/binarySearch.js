async function step(ctx, line) {
    ctx.highlight(line);
    await ctx.delay(ctx.getSpeed());
    return ctx.getIsSorting();
}

function setPointers(bars, pointers) {
    bars.forEach(bar => bar.querySelector('.pointer-label')?.remove());
    const labels = {};
    for (const [name, index] of Object.entries(pointers)) {
        if (index < 0 || index >= bars.length) continue;
        labels[index] = labels[index] ? `${labels[index]} ${name}` : name;
    }
    for (const [index, text] of Object.entries(labels)) {
        const label = document.createElement('div');
        label.className = 'pointer-label';
        label.innerText = text;
        bars[index].appendChild(label);
    }
}


export async function binarySearch(bars, delay, getIsSorting, getSpeed, highlight, arr){
    let target = 84;
    bars[arr.indexOf(target)].style.backgroundColor = 'var(--warning)';
    const ctx = {bars, delay, getIsSorting, getSpeed, highlight, arr};
    if (!await step(ctx, 0)) return;
    let left = 0;
    bars[left].style.backgroundColor = 'var(--merge-left)';
    if (!await step(ctx, 1)) return;
    let right = arr.length - 1;
    bars[right].style.backgroundColor = 'var(--merge-right)';
    setPointers(bars, {L: left, R: right});
    if (!await step(ctx, 2)) return;
    if (!await step(ctx, 3)) return;
    while (left <= right) {
        bars[left].style.backgroundColor = 'var(--merge-left)';
        bars[right].style.backgroundColor = 'var(--merge-right)';
        const mid = (left + right) >> 1;
        bars[mid].style.backgroundColor = 'var(--pivot)';
        setPointers(bars, {L: left, M: mid, R: right});
        if (!await step(ctx, 4)) return;
        if (!await step(ctx, 5)) return;
        if (arr[mid] === target) {
            if (!await step(ctx, 6)) return;
            highlight(-1);
            bars[left].style.backgroundColor = 'var(--accent-color)';
            bars[right].style.backgroundColor = 'var(--accent-color)';
            bars[mid].style.backgroundColor = 'var(--success)';
            setPointers(bars, {M: mid});
            return;
        }
        if (arr[mid] < target) {
            if (!await step(ctx, 8)) return;
            bars[left].style.backgroundColor = 'var(--text-dim)';
            left = mid + 1;
            for (let i = 0; i < left; i++){
                if (bars[i].style.backgroundColor !== 'var(--text-dim)'){
                    bars[i].style.backgroundColor = 'var(--text-dim)';
                }
            }
            bars[mid].style.backgroundColor = 'var(--text-dim)';
            bars[left].style.backgroundColor = 'var(--merge-left)';
            setPointers(bars, {L: left, R: right});
        }
        else{
            if (!await step(ctx, 10)) return;
            bars[right].style.backgroundColor = 'var(--text-dim)';
            right = mid - 1;
            for (let i = bars.length - 1; i > right; i--){
                if (bars[i].style.backgroundColor !== 'var(--text-dim'){
                    bars[i].style.backgroundColor = 'var(--text-dim)';
                }
            }
             if (right >= 0) bars[mid].style.backgroundColor = 'var(--text-dim)';
            if (left < arr.length) bars[right].style.backgroundColor = 'var(--merge-right)';
            setPointers(bars, {L: left, R: right});
        }
    }
    return -1;
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