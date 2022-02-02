document.querySelectorAll('.accordion-item__trigger').forEach((item) =>
    item.addEventListener('click', () => {

        item.parentNode.classList.toggle('accordion-item--active');
    })
)