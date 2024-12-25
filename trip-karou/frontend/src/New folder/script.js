document.addEventListener('DOMContentLoaded', () => {
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const faqContent = header.nextElementSibling;
            faqContent.style.display = faqContent.style.display === 'block' ? 'none' : 'block';
        });
    });
});
