function addToast(text='Sample toast notification') {
    let root = document.querySelector('.toast-root');

    let toast = document.createElement('span');
        toast.classList.add('toast');
        toast.innerText = text;
        toast.onclick = () => {
            if (toast.parentNode) {
                toast.classList.add('toast-hide');

                setTimeout(() => {
                    root.removeChild(toast);
                }, 500);
            }
        };

    root.appendChild(toast);

    setTimeout(function() {
        if (toast.parentNode) {
            toast.classList.add('toast-hide');

            setTimeout(function() {
                root.removeChild(toast);
            }, 500);
        }
    }, 5000);
}
