let nodes = document.getElementsByClassName('node');
let arrows = document.getElementsByClassName('arrow');

const list = document.getElementById('list');
const addInput = document.getElementById('add-value');
const addBtn = document.getElementById('add-node');

let long = 0;
let head = nodes[0];

const onceAnimationEnd = (el, animation) => {
    return new Promise(resolve => {
        const onAnimationEndCallback = () => {
            el.removeEventListener('animationend', onAnimationEndCallback);
            resolve();
        }
        el.addEventListener('animationend', onAnimationEndCallback);
        el.style.animation = animation;
    });
}

function createArrow() {
    let arrow = document.createElement('div');
    let img = document.createElement('img');
    img.src = 'arrow.png';
    img.draggable = false;
    arrow.append(img);
    return arrow;
}

async function addNode() {
    let newNode = document.createElement('div');
    let number = document.createElement('p');
    let newArrow = createArrow();

    newNode.append(number);

    newNode.classList = 'node';
    newArrow.classList = 'arrow';

    newNode.firstChild.innerText = addInput.value;

    addBtn.disabled = true;
    list.appendChild(newNode);
    await onceAnimationEnd(newNode, 'add-node 1.5s ease');
    
    list.appendChild(newArrow);
    await onceAnimationEnd(newArrow, 'fade-in 1.5s linear,rotate-arrow 1.5s ease');
}

addBtn.addEventListener('click', () => {
    addNode().then(() => addBtn.disabled = false);
});