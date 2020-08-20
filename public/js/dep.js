
function addDays(date, days) {

  if (days > 0){
    
    // var copy = new Date(date) 
    // copy.setDate(date.getDate() + days)
  
    const copy = new Date(Number(date))
    copy.setDate(date.getDate() + days)
    return window.copy = copy;
  }

  else{
    console.log('It aint workin');
    document.getElementById('maturity').value = '';
  }
};

  let duration = document.getElementById("duration");
  duration.addEventListener('change', function ( event ) {
  event.preventDefault();

  let days = '';
  days = Number(document.getElementById("duration").value);

  if (days > 0){
    const DATE = new Date();
    const NEWDATE = addDays(DATE, days);
    document.getElementById('maturity').value = (NEWDATE).toISOString().slice(0,10);
  }

  else{
      
    document.getElementById('maturity').focus();
    document.getElementById('maturity').value = 'Select Duration';
  }
});

function depositCalc(depAmount, interest){
  const depValue = depAmount * Math.pow((1 + (interest/25)), 4);
}
