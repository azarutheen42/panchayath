var Portlet = function() {
        (el = document.querySelector('.card a[data-toggle="reload"]')) && el.addEventListener("click", function(e) {
            e.preventDefault();
            var e = el.closest(".card"),
                t = (insertEl = '<div class="card-preloader"><div class="card-status"><div class="spinner-border text-success"><span class="visually-hidden">Loading...</span></div></div></div>', e.children[1].insertAdjacentHTML("beforeend", insertEl), e.getElementsByClassName("card-preloader")[0]);
            setTimeout(function() {
                t.remove()
            }, 500 + 5 * Math.random() * 300)
        })
    },
    growingLoader = (Portlet(), function() {
        (element = document.querySelector('.card a[data-toggle="growing-reload"]')) && element.addEventListener("click", function(e) {
            e.preventDefault();
            var e = element.closest(".card"),
                t = (insertEl = '<div class="card-preloader"><div class="card-status"><div class="spinner-grow text-danger"><span class="visually-hidden">Loading...</span></div></div></div>', e.children[1].insertAdjacentHTML("beforeend", insertEl), e.getElementsByClassName("card-preloader")[0]);
            setTimeout(function() {
                t.remove()
            }, 500 + 5 * Math.random() * 300)
        })
    }),
    customLoader = (growingLoader(), function() {
        (customLoader1 = document.querySelector('.card a[data-toggle="customer-loader"]')) && customLoader1.addEventListener("click", function(e) {
            e.preventDefault();
            var e = customLoader1.closest(".card"),
                t = (insertEl = '<div class="card-preloader"><div class="card-status"><img src="assets/images/logo-sm.png" alt="" class="img-fluid custom-loader"></div></div>', e.children[1].insertAdjacentHTML("beforeend", insertEl), e.getElementsByClassName("card-preloader")[0]);
            setTimeout(function() {
                t.remove()
            }, 500 + 5 * Math.random() * 300)
        })
    });

function delthis(e) {
    document.getElementById(e).remove()
}
customLoader();