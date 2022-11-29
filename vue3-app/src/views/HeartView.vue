<template>
    <div class="view">
        <label for="checkbox">
            <input type="checkbox" id="checkbox" hidden>
            <svg t="1668823606156" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
                p-id="7118">
                <path
                    d="M512 896a42.666667 42.666667 0 0 1-30.293333-12.373333l-331.52-331.946667a224.426667 224.426667 0 0 1 0-315.733333 223.573333 223.573333 0 0 1 315.733333 0L512 282.026667l46.08-46.08a223.573333 223.573333 0 0 1 315.733333 0 224.426667 224.426667 0 0 1 0 315.733333l-331.52 331.946667A42.666667 42.666667 0 0 1 512 896z"
                    p-id="7119" id="heart"></path>
            </svg>
            <span></span>
        </label>
    </div>
</template>

<style scoped>
.view {
    height: 100vh;
    --c: #ff6b81;
    position: relative;
}

svg {
    width: 40px;
    position: absolute;
    top: 100px;
    left: 100px;
    /* z-index: 10; */
}

#heart {
    fill: #eee;
    stroke: var(--c);
    stroke-width: 100;
    stroke-dasharray: 2600;
    stroke-dashoffset: 2600;
    stroke-linecap: round;
}

span {
    display: block;
    width: 6px;
    height: 6px;
    position: absolute;
    top: 120px;
    left: 120px;
    background-color: transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 -40px 0 0 var(--c),
        0 40px 0 0 var(--c),
        -40px 0 0 var(--c),
        40px 0 0 var(--c),
        -30px -30px 0 var(--c),
        30px -30px 0 var(--c),
        30px 30px 0 var(--c),
        -30px 30px 0 var(--c);
}

#checkbox:checked+svg #heart {
    animation: drawHeart 1s linear forwards;
}

#checkbox:checked~span {
    animation: blink 0.5s ease-in-out forwards;
    animation-delay: 0.85s;
}

#checkbox:checked+svg {
    animation: beat 1s linear forwards;
}

label {
    cursor: pointer;
}

@keyframes drawHeart {
    0% {
        stroke-dasharray: 2600;
    }

    80% {
        fill: #eee;
        stroke-dasharray: 0;
    }

    100% {
        fill: var(--c);
        stroke-dasharray: 0;
    }
}

@keyframes blink {
    0% {
        transform: translate(-50%, -50%) scale(0.5);
        opacity: 0.8;
    }

    50% {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
    }

    100% {
        transform: translate(-50%, -50%) scale(1.1);
        opacity: 0;
    }
}

@keyframes beat {
    0% {
        transform: scale(1);
    }

    70% {
        transform: scale(1);
    }

    80% {
        transform: scale(1.2);
    }

    100% {
        transform: scale(1);
    }
}
</style>