function getMax(datas, property){
  let max = 0;

  datas.forEach(data => {
    if(data[property] > max) {
      max = data[property];
    }
  });
  return max;
}

function getMin(datas, property, max){
  let min = max;

  datas.forEach(data => {
    if(data[property] < min){
      min = data[property];
    }
  });
  return min
}

export {getMax, getMin}