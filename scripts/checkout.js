const updateButton = document.querySelector('.update');
updateButton.addEventListener('click',()=>{
  toggleVisibility('on1','off1');
})

const saveButton = document.querySelector('.save');
saveButton.addEventListener('click',()=>{
  toggleVisibility('on1','off1');
})

const paypalSelector = document.querySelector('.paypal-option');
paypalSelector.addEventListener('click',(event)=>{
  if (event.target.tagName === 'INPUT' ||
  event.target.tagName === 'DIV' ) {  
    toggleVisibility('on2','off2');
  }
})

/**
 * Toggles Element visibility
 * 
 * @param {string} on 
 * @param {string} off 
 */

function toggleVisibility(on,off){
    const onSelector = document.querySelector(`.${on}`);
    const offSelector = document.querySelector(`.${off}`);
    onSelector.classList.replace(on , off);
    offSelector.classList.replace(off ,on);
  }
  