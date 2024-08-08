function generateMatrixInput(size) {
    let matrixInput = document.getElementById('matrix-input');
    matrixInput.innerHTML = '';
    document.getElementById('matrix-size').value = size;
    matrixInput.style.gridTemplateColumns = `repeat(${size}, auto)`; 
  
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        let input = document.createElement('input');
        input.type = 'number';
        input.id = `element-${i}-${j}`;
        input.placeholder = `NaN`;
        matrixInput.appendChild(input);
      }
      matrixInput.appendChild(document.createElement('br'));
    }
  }
  
  function calculateDeterminant() {
    let size = parseInt(document.getElementById('matrix-size').value);
  
    if (isNaN(size) || size < 2 || size > 11) {
      alert('Please input a valid matrix size (between 2 and 10).');
      return;
    }
  
    let matrix = [];
    for (let i = 0; i < size; i++) {
      matrix[i] = [];
      for (let j = 0; j < size; j++) {
        let element = parseFloat(document.getElementById(`element-${i}-${j}`).value);
        if (isNaN(element)) {
          alert(`Please enter a valid number for element [${i},${j}].`);
          return;
        }
        matrix[i].push(element);
      }
    }
  
    let determinant = detnxn(matrix);
    document.getElementById('result').innerHTML = `Matrix's determinant is : ${determinant}`;
  }
  
    function minor(mat, a, b) {
        const n = mat.length - 1;
        const p = mat[0].length - 1;
        let res = Array.from({ length: n }, () => Array(p).fill(0));
        let j1 = 0;
        let i1 = 0;

        for (let i = 0; i <= n; i++) {
            if (i !== a) {
                for (let j = 0; j <= p; j++) {
                    if (j !== b) {
                        res[i1][j1] = mat[i][j];
                        j1++;
                    }
                }
                j1 = 0;
                i1++;
            }
        }
        return res;
    }

    function fillMatrixRandomly() {
      let size = parseInt(document.getElementById('matrix-size').value);
  
      if (isNaN(size) || size < 2 || size > 11) {
          alert('Please input a valid matrix size (between 2 and 10).');
          return;
      }
  
      for (let i = 0; i < size; i++) {
          for (let j = 0; j < size; j++) {
              let randomValue = Math.floor(Math.random() * 10000); 
              document.getElementById(`element-${i}-${j}`).value = randomValue;
          }
      }
  }
  
    function detnxn(mat) {
        const n = mat.length;
        if (n === 2) {
            return mat[1][1] * mat[0][0] - mat[0][1] * mat[1][0];
        } else {
            let res = 0;
            let coef = 1;
            for (let j = 0; j < n; j++) {
                res += coef * mat[0][j] * detnxn(minor(mat, 0, j));
                coef *= -1;
            }
            return res;
        }
    } 
  
  document.getElementById('matrix-size').addEventListener('change', function() {
    let size = parseInt(this.value);
    generateMatrixInput(size);
  });
  