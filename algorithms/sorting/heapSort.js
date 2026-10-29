const COLORS = {
    unsorted: 'var(--accent-color)',
    root: 'var(--pivot)',
    child: 'var(--pointer-j)',
    largest: 'var(--warning)',
    swap: 'var(--danger)',
    sorted: 'var(--success)'
};

function paint(ctx, i, color) {
    ctx.nodes[i].style.backgroundColor = color;
    ctx.cells[i].style.backgroundColor = color;
}

function swapValues(ctx, i, j) {
    const { nodes, cells, arr } = ctx;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    for (const [els, cls] of [[nodes, '.node-value'], [cells, '.cell-value']]) {
        const a = els[i].querySelector(cls);
        const b = els[j].querySelector(cls);
        [a.textContent, b.textContent] = [b.textContent, a.textContent];
    }
}

async function step(ctx, line) {
    ctx.highlight(line);
    await ctx.delay(ctx.getSpeed());
    return ctx.getIsSorting();
}

export async function heapSort(nodes, cells, delay, getIsSorting, getSpeed, highlight, arr) {
    const ctx = { nodes, cells, delay, getIsSorting, getSpeed, highlight, arr };
    const n = arr.length;

    if (!await step(ctx, 0)) return;
    if (!await step(ctx, 1)) return;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (!await step(ctx, 2)) return;
        if (!await step(ctx, 3)) return;
        await heapify(ctx, n, i);
        if (!getIsSorting()) return;
    }

    for (let end = n - 1; end > 0; end--) {
        if (!await step(ctx, 5)) return;

        highlight(6);
        paint(ctx, 0, COLORS.swap);
        paint(ctx, end, COLORS.swap);
        swapValues(ctx, 0, end);
        await delay(getSpeed());
        if (!getIsSorting()) return;

        paint(ctx, end, COLORS.sorted);
        paint(ctx, 0, COLORS.unsorted);

        if (!await step(ctx, 7)) return;
        await heapify(ctx, end, 0);
        if (!getIsSorting()) return;
    }

    paint(ctx, 0, COLORS.sorted);
    if (!await step(ctx, 9)) return;
    highlight(-1);
}

async function heapify(ctx, size, root) {
    const { arr } = ctx;

    if (!await step(ctx, 11)) return;

    let largest = root;
    paint(ctx, root, COLORS.root);
    if (!await step(ctx, 12)) return;

    const left = 2 * root + 1;
    const right = 2 * root + 2;
    if (!await step(ctx, 13)) return;
    if (!await step(ctx, 14)) return;

    if (left < size) paint(ctx, left, COLORS.child);
    if (!await step(ctx, 15)) return;
    if (left < size && arr[left] > arr[largest]) {
        if (!await step(ctx, 16)) return;
        paint(ctx, left, COLORS.largest);
        largest = left;
    }

    if (right < size) paint(ctx, right, COLORS.child);
    if (!await step(ctx, 18)) return;
    if (right < size && arr[right] > arr[largest]) {
        if (!await step(ctx, 19)) return;
        if (largest !== root) paint(ctx, largest, COLORS.child);
        paint(ctx, right, COLORS.largest);
        largest = right;
    }

    if (!await step(ctx, 21)) return;

    if (largest !== root) {
        if (!await step(ctx, 22)) return;
        paint(ctx, root, COLORS.swap);
        paint(ctx, largest, COLORS.swap);
        swapValues(ctx, root, largest);
        await ctx.delay(ctx.getSpeed());
        if (!ctx.getIsSorting()) return;

        paint(ctx, root, COLORS.unsorted);
        if (left < size) paint(ctx, left, COLORS.unsorted);
        if (right < size) paint(ctx, right, COLORS.unsorted);

        if (!await step(ctx, 23)) return;
        await heapify(ctx, size, largest);
    } else {
        paint(ctx, root, COLORS.unsorted);
        if (left < size) paint(ctx, left, COLORS.unsorted);
        if (right < size) paint(ctx, right, COLORS.unsorted);
    }
}


export const heapInfo = {
    title: "Heap Sort",
    description: "Heap sort is a comparison based sorting algorithm that first builds a max heap from the array, then repeatedly swaps the largest element (the root) to the end of the array and sifts the new root down to restore the heap, shrinking the heap by one each time.",
    bigO: "Worst: O(nlogn) | Best: O(nlogn)",
    codeArr: [
        "function heapSort(arr) {",
        "  const n = arr.length;",
        "  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {",
        "      heapify(arr, n, i);",
        "  }",
        "  for (let end = n - 1; end > 0; end--) {",
        "      [arr[0], arr[end]] = [arr[end], arr[0]];",
        "      heapify(arr, end, 0);",
        "  }",
        "  return arr;",
        "}",
        "function heapify(arr, size, root) {",
        "  let largest = root;",
        "  const left = 2 * root + 1;",
        "  const right = 2 * root + 2;",
        "  if (left < size && arr[left] > arr[largest]) {",
        "      largest = left;",
        "  }",
        "  if (right < size && arr[right] > arr[largest]) {",
        "      largest = right;",
        "  }",
        "  if (largest !== root) {",
        "      [arr[root], arr[largest]] = [arr[largest], arr[root]];",
        "      heapify(arr, size, largest);",
        "  }",
        "}"
    ]
}