$(document).ready(function(){
    var quoteSource=[
    {
      quote: "Don’t wait. Time will never be just right.",
      name:"Napoleon Hill"
      },
      {
        quote:"Believe you can and you're halfway there.",
        name:"Roosevelt"
      },
      {
        quote:"It's never too late to be what you might have been.",
        name:"Self"
      },
      {
        quote:"If not us, who? If not now, when?",
        name:"JFK"
      },
      {
        quote:"80% of success is showing up.",
        name:"Woody Allen"
      },
      {
        quote:"Don't watch the clock; do what it does... Keep going.",
        name:"Sam Levenson"
      },
      {
        quote:"Everything you can imagine is real.",
        name:"Pablo Picasso"
      },
      {
        quote:"Expect problems and eat them for breakfast.",
        name:"Alfred A. Montapert"
      },
      {
        quote:"Start where you are. Use what you have. Do what you can.",
        name:"Arthur Ashe"
      },
      // {
      //   quote:"Ever tried. Ever failed. No matter. Try Again. Fail again. Fail better.",
      //   name:"Samuel Beckett"
      // },
      {
        quote:"Be yourself; everyone else is already taken.",
        name:"Oscar Wilde"
      },
      {
        quote:"Always do whatever's next.",
        name:"George Carlin"
      }
     

  ];
    

    $('#quoteButton').click(function(evt){
      //define the containers of the info we target
      var quote = $('#quoteContainer p').text();
      var quoteGenius = $('#quoteGenius').text();
      //prevent browser's default action
      evt.preventDefault();
      //getting a new random number to attach to a quote and setting a limit
      var sourceLength = quoteSource.length;
      var randomNumber= Math.floor(Math.random()*sourceLength);
      //set a new quote
      for(i=0;i<=sourceLength;i+=1){
      var newQuoteText = quoteSource[randomNumber].quote;
      var newQuoteGenius = quoteSource[randomNumber].name;
      //console.log(newQuoteText,newQuoteGenius);
      var timeAnimation = 500;
      var quoteContainer = $('#quoteContainer');
      //fade out animation with callback
      quoteContainer.fadeOut(timeAnimation, function(){
        quoteContainer.html('');
        quoteContainer.append('<p>'+newQuoteText+'</p>'+'<p id="quoteGenius">'+'-               '+newQuoteGenius+'</p>');
        
        //fadein animation.
        quoteContainer.fadeIn(timeAnimation);
      });  
      
      break;
    };//end for loop
  
  });//end quoteButton function
    
    
});//end document ready
