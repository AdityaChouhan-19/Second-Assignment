// IIFE -- Immediately Invoked Function Expression

const copyright = `
<p>
  Copyright &copy; ${new Date().getFullYear()} Aditya Chouhan
</p>`;

document.getElementById("copyright").innerHTML = copyright;

(function () {
  function Start() {
    console.log("App Started...");

    let deleteButtons = document.querySelectorAll(".delete");

    for (button of deleteButtons) {
      button.addEventListener("click", (event) => {
        if (!confirm("Are you sure? This contact will permanently delete.")) {
          event.preventDefault();
          window.location.assign("/contactlist");
        }
      });
    }
  }

  window.addEventListener("load", Start);
})();
