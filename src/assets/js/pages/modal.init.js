var varyingcontentModal = document.getElementById("varyingcontentModal");
varyingcontentModal && varyingcontentModal.addEventListener("show.bs.modal", function(t) {
    var t = t.relatedTarget.getAttribute("data-bs-whatever"),
        e = varyingcontentModal.querySelector(".modal-title"),
        n = varyingcontentModal.querySelector(".modal-body input");
    e.textContent = "New message to " + t, n.value = t
});