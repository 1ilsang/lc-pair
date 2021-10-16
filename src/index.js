(() => {
  const initializedSelector = {
    alphabet: -1,
    node: {
      id: undefined,
      dom: undefined,
    },
  };
  let prevSelector = { ...initializedSelector };
  let incorrectCount = 0;
  let correctCount = 0;

  const body = document.getElementById("app");
  const scoreBoard = document.createElement("div");
  const correctScore = document.createElement("h1");
  correctScore.style.color = "skyblue";
  correctScore.textContent = correctCount;
  const incorrectScore = document.createElement("h1");
  incorrectScore.style.color = "red";
  incorrectScore.textContent = incorrectCount;

  const row = 5;
  const col = 4;
  const TABLE_LENGTH = row * col;
  const ALPHABET_MAX = Math.floor(TABLE_LENGTH / 2);

  const pairStateCounts = Array(ALPHABET_MAX).fill(2);
  const getAlphabet = () => {
    let pickedIndex = -1;
    while (true) {
      pickedIndex = Math.floor(Math.random() * Math.floor(TABLE_LENGTH / 2));
      const curState = pairStateCounts[pickedIndex];
      if (curState <= 0) continue;

      pairStateCounts[pickedIndex] -= 1;
      break;
    }
    return pickedIndex;
  };

  const data = Array(row * col)
    .fill("")
    .map(getAlphabet);

  const nodeList = [];

  data.forEach((value, index) => {
    if (index % col === 0) {
      const node = document.createElement("div");
      node.style.display = "block";
      nodeList.push(node);
    }

    const parentNode = nodeList[nodeList.length - 1];
    const curNode = document.createElement("div");
    curNode.style.display = "inline-block";
    curNode.style.width = "80px";
    curNode.style.height = "80px";
    curNode.style.border = "1px solid black";
    curNode.style.cursor = "pointer";
    curNode.style.textAlign = "center";
    // HINT
    // curNode.textContent = value;
    curNode.textContent = "A";

    curNode.onclick = () => {
      const { alphabet: prevAlphabet, node: prevNode } = prevSelector;
      const { id: prevIndex, dom: prevDom } = prevNode;

      if (index === prevIndex) {
        curNode.style.backgroundColor = "white";
        curNode.textContent = "A";
        prevSelector = { ...initializedSelector };
        return;
      }

      if (prevAlphabet === -1) {
        curNode.style.backgroundColor = "green";
        curNode.style.cursor = "wait";
        curNode.textContent = value;

        prevSelector.alphabet = value;
        prevSelector.node = {
          id: index,
          dom: curNode,
        };
        return;
      }

      if (prevAlphabet === value) {
        curNode.style.backgroundColor = "gray";
        curNode.style.pointerEvents = "none";
        curNode.style.cursor = "default";
        curNode.textContent = value;

        prevDom.style.backgroundColor = "gray";
        prevDom.style.pointerEvents = "none";
        prevDom.style.cursor = "default";

        prevSelector = { ...initializedSelector };
        correctCount += 1;
        correctScore.textContent = correctCount;
        return;
      }

      alert(`Wrong! ${value}`);
      incorrectCount += 1;
      incorrectScore.textContent = incorrectCount;
    };

    parentNode.appendChild(curNode);
  });

  nodeList.forEach((value) => body.appendChild(value));

  scoreBoard.appendChild(correctScore);
  scoreBoard.appendChild(incorrectScore);
  body.appendChild(scoreBoard);
})();
