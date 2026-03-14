const correctInorder = [20, 30, 40, 50, 60, 70, 80];
const dropRow = document.getElementById('drop-row');
const coinsDisplay = document.getElementById('coins');
const tree = document.getElementById('tree');
const submitBtn = document.getElementById('submit-btn');
let coins = parseInt(localStorage.getItem('coins')) || 100;
coinsDisplay.textContent = coins;

    function createDropZones() {
      dropRow.innerHTML = "";
      correctInorder.forEach(() => {
        const drop = document.createElement('div');
        drop.className = 'drop-zone';

        drop.addEventListener('dragover', e => e.preventDefault());

        drop.addEventListener('drop', e => {
          e.preventDefault();
          const val = e.dataTransfer.getData('text/plain');
          if (drop.textContent.trim() === '') {
            drop.textContent = val;
            drop.classList.add('filled');
            const draggedNode = [...tree.querySelectorAll('.tree-node')].find(n => n.dataset.value === val);
            if (draggedNode) draggedNode.style.visibility = "hidden";
          }
        });

        dropRow.appendChild(drop);
      });
    }

    function makeNodesDraggable() {
      document.querySelectorAll('.tree-node').forEach(node => {
        node.addEventListener('dragstart', e => {
          e.dataTransfer.setData('text/plain', node.dataset.value);
        });
      });
    }

    submitBtn.addEventListener('click', () => {
      if (coins < 10) {
        alert("🚫 You need at least 10 coins to play.");
        return;
      }

      const entered = [...dropRow.children].map(d => d.textContent.trim());
      const correct = correctInorder.map(String);

      if (JSON.stringify(entered) === JSON.stringify(correct)) {
        coins -= 5;
        alert("✅ Correct! You won. 5 coins deducted as game cost.");
         localStorage.setItem("rewardCoins", "5");
       setTimeout(() => {
      window.location.href = "../html/funzone.html"; 
    }, 100);
      } else {
        coins -= 10;
        alert("❌ Incorrect! You lost. 10 coins deducted.");
       setTimeout(() => {
      window.location.href = "../html/funzone.html"; 
    }, 100); 
      }

      coinsDisplay.textContent = coins;

      if (coins < 10) {
        submitBtn.disabled = true;
        window.location.href = '../html/funzone.html';
      }
    });

document.getElementById('reset-btn').addEventListener('click', () => {
  createDropZones();
  document.querySelectorAll('.tree-node').forEach(node => {
    node.style.visibility = "visible";
  });
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem("coins", coins);
});

if (!document.body.contains(document.querySelector('h2'))) {
  const header = document.createElement('h2');
  header.style.cssText = 'text-align:center;color:#00f2fe;margin:20px 0;';
  header.textContent = 'Drag tree nodes into the drop zones to form the Inorder sequence';
  document.body.insertBefore(header, document.body.firstChild);
}

createDropZones();
makeNodesDraggable();
