// Wrap all code that interacts with the DOM in a call to jQuery... DONE
$(document).ready(function() {
  $(".saveBtn").on("click", function() {
    var text = $(this).siblings('.description').val();
    var time = $(this).parent().attr("id");

    //saving in local storage
    localStorage.setItem(time, text);
  });

  console.log("DOM has fully loaded");
});

$(function (timeTracker) {
  //gets current amount of hours
  var currentTime = dayjs().hour();
  //timeblock loop
  $(".time-block").each(function () {
    var blockTime = parseInt($(this).attr("id").split("hour")[1]);
    //Checks if time has moved
    if (blockTime < currentTime) {
      $(this).addClass('past');
      $(this).removeClass('present future')
      } else if (blockTime === currentTime) {
        $(this).removeClass('past future');
        $(this).addClass('present');
      } else {
        $(this).removeClass('past present');
        $(this).addClass('future');
      }
  });
  $(".time-block").each(function () {
    var timeBlockId = $(this).attr("id");
    var savedText = localStorage.getItem(timeBlockId);
    if (savedText !== null) {
      $(this).find(".description").val(savedText);
    }
  });
  // TODO: Add code to display the current date in the header of the page.
  var currentDate = dayjs().format('MMMM D, YYYY');
  $("#currentDay").text(currentDate);

  timeTracker();
  setInterval(timeTracker, 15000); // Updates every 15s
});