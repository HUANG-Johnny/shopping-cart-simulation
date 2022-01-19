
let orderItems = document.querySelectorAll('.order-item');
let reduceBtns = document.querySelectorAll('.reduce');
let countItems = document.querySelectorAll('.count-item');
let addBtns = document.querySelectorAll('.add');
let itemSubtotals = document.querySelectorAll('.item-subtotal');
let unitPriceElements = document.querySelectorAll('.unit-price');

let orderSumAllItemElement = document.querySelector('.order-sum-allItem');
let orderSumAllSubtotalElement = document.querySelector('.order-sum-allSubtotal');
let orderSumfeeElement = document.querySelector('.order-sum-fee');
let orderSumTotalElement = document.querySelector('.order-sum-total');


window.onload = function (){
    //初始化每項價格小計
    itemSubtotals.forEach(function(itemSubtotal,index){
        calculateItmeSubtotal(index, parseInt(countItems[index].value), parseFloat(unitPriceElements[index].textContent)); 
    });
  
}


//減號按鈕
reduceBtns.forEach(function(reduceBtn,index){
    reduceBtn.addEventListener('click',function(){
        buttonHandler(index,-1);
    });
});

//加號按鈕
addBtns.forEach(function(addBtn,index){
    addBtn.addEventListener('click',function(){
        buttonHandler(index,1);
    });
});

//計數input框
countItems.forEach(function(countItem,index){
    countItem.addEventListener('change',function(e){
        // if(e.keyCode != 13) return;
        if(countItem.value <= 0){
            countItem.value = 1;
        }
        calculateItmeSubtotal(index, countItem.value,  parseFloat(unitPriceElements[index].textContent));
        
    });
});


//按 - / + 按紐  
function buttonHandler(index,num){
    if(parseInt(countItems[index].value) == 1 && num == -1){
        let yes = confirm('你是否要將此項目刪除?');
        if(yes){
            orderItems[index].remove();
        }
        else return;
    }
   
    countItems[index].value = parseInt(countItems[index].value) + num;
    calculateItmeSubtotal(index, parseInt(countItems[index].value), parseFloat(unitPriceElements[index].textContent));
    
}

//單項目數量與價格的計算
function calculateItmeSubtotal(index, countItem, itemPrice ){

    itemSubtotals[index].textContent = (countItem * itemPrice).toFixed(2);
    calculateOrderSum();
}



//計算總共的 數量、小計、運費、總額
function calculateOrderSum(){
    let sumAllItem = 0;
    let SumAllSubtotal = 0;
    let fee = 60;

    for(let i=0; i < orderItems.length; i++){
        sumAllItem += parseInt(countItems[i].value);
        SumAllSubtotal += parseFloat(itemSubtotals[i].textContent);

    }
    if(SumAllSubtotal>=150){
        fee = 0;
    }

    orderSumAllItemElement.textContent = sumAllItem;
    orderSumAllSubtotalElement.textContent = SumAllSubtotal.toFixed(2);
    orderSumfeeElement.textContent = fee;
    orderSumTotalElement.textContent = (SumAllSubtotal + fee).toFixed(2);
}

